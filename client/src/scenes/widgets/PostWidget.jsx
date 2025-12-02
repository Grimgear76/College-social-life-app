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
import { useState } from "react";
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
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const posts = useSelector((state) => state.posts);


    // Toggle like
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

            const updatedPosts = posts.map((post) =>
                post._id === updatedPost._id ? updatedPost : post
            );

            dispatch(setPosts(updatedPosts));

        // Emit socket event so other users update in real-time
        socket.emit("likePost", updatedPost);
            } catch (err) {
                console.error("Error liking post:", err);
            }
        };

    // Post a new comment
    const handleCommentPost = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await fetch(
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

            const savedComment = await response.json();
            setComments((prev) => [...prev, savedComment]);
            setNewComment("");

            // Optionally emit socket event for real-time comment updates
            socket.emit("newComment", { postId, comment: savedComment });
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
                    {/* Existing Comments */}
                    {comments.map((c, i) => (
                        <Box key={`${postId}-comment-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {c.comment || c} {/* adapt if backend returns object or string */}
                            </Typography>
                        </Box>
                    ))}

                    {/* Input for new comment */}
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
