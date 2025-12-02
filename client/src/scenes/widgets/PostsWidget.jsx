import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import socket from "../../socket";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);


    useEffect(() => {
        if (!token) return;

        const handleNewPost = (newPost) => {
            dispatch(setPosts([newPost, ...posts]));
        };

        const handleUpdatePost = (updatedPost) => {
            const updatedPosts = posts.map((p) =>
                p._id === updatedPost._id ? updatedPost : p
            );
            dispatch(setPosts(updatedPosts));
        };

        socket.on("newPost", handleNewPost);
        socket.on("updatePost", handleUpdatePost);

        return () => {
            socket.off("newPost", handleNewPost);
            socket.off("updatePost", handleUpdatePost);
        };
    }, [token, dispatch, posts]);
    

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
      dispatch(setPosts( data )); //sends the data as array while setPosts({posts: data}) sends an object that contains an array
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
      dispatch(setPosts( data )); //sends the data as array while setPosts({posts: data}) sends an object that contains an array
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
      <>
          {posts.map((p) => (
              <PostWidget
                  key={p._id}
                  postId={p._id}
                  postUserId={p.userId}
                  name={`${p.firstName} ${p.lastName}`}
                  description={p.description}
                  location={p.location}
                  picturePath={p.picturePath}
                  userPicturePath={p.userPicturePath}
                  likes={p.likes}
                  comments={p.comments}
              />
          ))}
      </>
  );
};

export default PostsWidget;