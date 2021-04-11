const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route       POST api/posts
// @desc        Create a post
// @access      Private
router.post('/', [
    auth,
    [check('title', 'Title is required').not().isEmpty()],
    [check('text', 'Text is required').not().isEmpty()]
], async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({title: req.body.title, text: req.body.text, name: user.name, user: req.user.id});

        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       GET api/posts
// @desc        Get all post
// @access      Private

router.get('/', auth, async (req, res) => {
    try { // Finding all and then sorting by newest first
        const posts = await Post.find().sort({date: -1});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       GET api/posts/:id
// @desc        Get post by id
// @access      Private

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (! post) {
            return res.status(404).json({msg: 'Post not found'});
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);

        // If what is passed in is not a valid object id, then the catch will run
        // We want to send the same error message, so we check if the error type is 'ObjectId'
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route       DELETE api/posts/:id
// @desc        Delete a post
// @access      Private

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (! post) {
            return res.status(404).json({msg: 'Post not found'});
        }

        // Check to see if post user is same as user requesting deletion
        // // toString method since 'post.user' is an object and would otherwise never match
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        await post.remove();

        res.json({msg: 'Post removed'});
    } catch (err) {
        console.error(err.message);
        // If what is passed in is not a valid object id, then the catch will run
        // We want to send the same error message, so we check if the error type is 'ObjectId'
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/posts/like/:id
// @desc        Like a post
// @access      Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Check if the post has already been liked
        // Higher order array function that compares current user to user thats logged in
        // // If length is greater than 0, then it has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.json(post.likes);
        }
        // if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        //     return res.status(400).json({msg: 'Post already liked'});
        // }
        // Adds current user to the list of people that have liked the post
        post.likes.unshift({user: req.user.id});

        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/posts/unlike/:id
// @desc        Unlike a post
// @access      Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Check if the post has already been liked
        // Higher order array function that compares current user to user thats logged in
        // // If length is equal to 0, then it has already been liked and can then be unliked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg: 'Post has not yet been liked'});
        }

        // Get index of like to be removed
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/posts/comment/:id
// @desc        Comment on a post
// @access      Private
router.post('/comment/:id', [
    auth,
    [check('text', 'Text is required').not().isEmpty()]
], async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route       DELETE api/posts/comment/:id/:comment_id
// @desc        Delete a comment
// @access      Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Retrieve which comment you want to delete
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        // First check to see if the comment exists
        if (! comment) {
            return res.status(404).json({msg: 'Comment does not exist'});
        }

        // Make sure the user that wants to delete is the same user that posted it
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        // Get index of comment to be removed
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
