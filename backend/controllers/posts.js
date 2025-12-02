import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
    try{
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        const savedPost = await newPost.save();

        req.io.emit("newPost", savedPost);

        const allPosts = await Post.find();
        res.status(201).json(allPosts);
    } catch(err){
        res.status(409).json({message: err.message})
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch(err){
        res.status(404).json({message: err.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch(err){
        res.status(404).json({message: err.message})
    }
}

/* UPDATE */
export const likePost = async(req, res) => {
    try {
        const { id } = req.params; 
        const { userId } = req.body;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        await post.save();

        res.status(200).json(post);

        req.io.emit("receiveLike", post);

    } catch(err){
        res.status(404).json({message: err.message})
    }
}

export const commentPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, comment } = req.body;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const newComment = {
            userId,
            name: user.name,
            comment,
            createdAt: new Date(),
        };

        post.comments.push(newComment);
        await post.save();

        res.status(200).json(newComment);

        req.io.emit("receiveComment", { postId, comment: newComment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};