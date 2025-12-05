//cleaned code
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPosts } from "state";
import PostWidget from "./PostWidget";
import socket from "../../socket";

/* --- Posts/Feed Widget --- */
    // Displays all Posts for either all users or of a specific user
const PostsWidget = ({ userId, isProfile = false, searchTerm }) => {

/* --- State & Global Data --- */
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts); // All posts from redux state
    const token = useSelector((state) => state.token); // Auth Token

        // Filters posts by searchTerm
    const filteredPosts = posts.filter (

        (post) =>
            post.description && (searchTerm ? post.description.toLowerCase().includes(searchTerm.toLowerCase()) : true)

    );

/* --- API Calls --- */
    
        // Fetch all posts from backend for general feed
    const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    dispatch(setPosts( data )); //sends the data as array
    };


        // Fetch posts of a specfic user from backend
    const getUserPosts = async () => {
    const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        });

    const data = await response.json();
    dispatch(setPosts( data )); // Sends the data as array
    };


/* --- EFFECTS & DATA FETCHING --- */

    // Socket.io Events
    useEffect(() => {
        // Only attach socket events if the user is authenticated
        if (!token) return;

        // Handle a new post recieved via socket

        const handleNewPost = (newPost) => {
            dispatch(setPosts([newPost, ...posts]));
        };


        // Handle updates to an existing post recieved via socket
        const handleUpdatePost = (updatedPost) => {
            dispatch(setPosts((prev) =>
                prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
            ));
        };

        // Socket event listeners
        socket.on("newPost", handleNewPost);
        socket.on("updatePost", handleUpdatePost);

        // Clean up socket listeners on unmount
        return () => {
            socket.off("newPost", handleNewPost);
            socket.off("updatePost", handleUpdatePost);
        };

    }, [token, dispatch, posts]);


    // Load posts on component mount or when profile/user changes
    useEffect(() => {
        if (isProfile) {
            getUserPosts(); // Load posts of a specific user
        }
        
        else {
            getPosts(); // Load general feed
        }
    }, [isProfile, userId]); // eslint-disable-line react-hooks/exhaustive-deps


/* --- Render UI --- */
  return (
      <>    
          {/* Map of filteredPosts sent to Post Widget */}
          {filteredPosts.map((p) => (
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
                  comments={p.comments} />
          ))}
      </>
  );
};

export default PostsWidget;