import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        
        // console.log('postMessages;', postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
};

export const  createPosts = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post)

    try {
        await newPost.save();

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.isValidObjectId(_id)) return res.status(404).send("No post with that ID");
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });
    
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.isValidObjectId(id)) return res.status(404).send("No post with that ID");
    
    await PostMessage.findByIdAndRemove(id);
    
    res.json({ message: 'Post Deleted Succesfully'});
};

export const likePost = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.isValidObjectId(id)) return res.status(404).send("No post with that ID");

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true });   // new es para que retorne

    res.json(updatedPost);
}