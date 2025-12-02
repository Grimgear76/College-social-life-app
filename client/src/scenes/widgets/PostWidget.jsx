import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme,
    InputBase,
    Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import socket from "../../socket";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments: initialComments,
}) => {
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState(initialComments || []);

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const posts = useSelector((state) => state.posts);

    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    /*
     *REAL-TIME: Listen for incoming comments or likes
     */
    useEffect(() => {
        // Real-time comment from other users
        socket.on("receiveComment", ({ postId: incomingId, comment }) => {
            if (incomingId === postId) {
                setComments(prev => [...prev, comment]);
            }
        });

        // Real-time like update from other users
        socket.on("receiveLike", updatedPost => {
            if (updatedPost._id === postId) {
                const updatedPosts = posts.map(p =>
                    p._id === updatedPost._id ? updatedPost : p
                );
                dispatch(setPosts(updatedPosts));
            }
        });

        return () => {
            socket.off("receiveComment");
            socket.off("receiveLike");
        };
    }, [postId, posts, dispatch]);

    /*
     * Toggle like
     */
    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: loggedInUserId }),
            });

            const updatedPost = await response.json();

            // Update Redux
            const updatedPosts = posts.map(post =>
                post._id === updatedPost._id ? updatedPost : post
            );
            dispatch(setPosts(updatedPosts));

            // Send real-time event to other users
            socket.emit("likePost", updatedPost);

        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    /*
     *Post a new comment
     */
    const handleCommentPost = async () => {
        if (!newComment.trim()) return;

        try {
            await fetch(
                `http://localhost:3001/posts/${postId}/comment`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: loggedInUserId,
                        comment: newComment.trim(),
                    }),
                }
            );

            setNewComment("");

        } catch (err) {
            console.error("Error posting comment:", err);
        }
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />

            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>

            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}

            {/* Like, Comment, Share Buttons */}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">

                    {/* Like */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={handleLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    {/* Comments toggle */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                {/* Share */}
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

            {/* Comments Section */}
            {isCommentsOpen && (
                <Box mt="0.5rem">
                    {comments.map((c, i) => (
                        <Box key={`${postId}-comment-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {c.comment}
                            </Typography>
                        </Box>
                    ))}

                    <FlexBetween mt="1rem">
                        <InputBase
                            placeholder="Write a comment..."
                            multiline
                            minRows={1}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            sx={{
                                flexGrow: 1,
                                backgroundColor: palette.neutral.light,
                                color: palette.mode === "dark" ? "#fff" : "#000",
                                borderRadius: "0.75rem",
                                padding: "0.5rem 1rem",
                            }}
                        />
                        <Button
                            sx={{
                                marginLeft: "0.5rem",
                                color: palette.background.alt,
                                backgroundColor: palette.primary.main,
                                borderRadius: "3rem",
                            }}
                            disabled={!newComment.trim()}
                            onClick={handleCommentPost}
                        >
                            Comment
                        </Button>
                    </FlexBetween>
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;
