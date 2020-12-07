const express = require('express');
const router = express.Router();
// Need to bring in auth to access private @access routes that use tokens
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route       GET api/profile/me
// @desc        Get current users profile
// @access      Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name']);

        if (! profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/profile
// @desc        Create or update user profile
// @access      Private
router.post('/', auth, async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    return res.json(req.body);
    console.log(req.body);

    // Destructure request body to access parameters loosely
    const {
        teetorType,
        bio,
        location,
        languages,
        skills,
    } = req.body;

    console.log(teetorType);


    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (teetorType) {
        profileFields.teetorType = teetorType;
    }
    if (bio) {
        profileFields.bio = bio;
    }
    if (location) {
        profileFields.location = location;
    }
    if (languages) {
        profileFields.languages = languages.split(',').map(languages => languages.trim());
    }
    if (skills) {
        profileFields.skills = skills.split(',').map(skills => skills.trim());
    }

    // try {
    //     let profile = await Profile.findOne({user: req.user.id});
    //     // If profile already exists
    //     if (profile) {
    //         profile = await Profile.findOneAndUpdate({
    //             user: req.user.id
    //         }, {
    //             $set: profileFields
    //         }, {new: true});

    //         return res.json(profile);
    //     }

    //     // Create profile
    //     profile = new Profile(profileFields);

    //     await profile.save();
    //     res.json(profile);
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error');
    // }
});

// @route       GET api/profile
// @desc        Get all profiles
// @access      Public
router.get('/', async (req, res) => {
    try {
        // Populate adds fields from user collection with array of fields
        // we want to add, in this case the name and avatar - has 'user' in common
        const profiles = await Profile.find().populate('user', ['name']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// // Colon is used almost like a variable placeholder (parameters)
// // See https://expressjs.com/tr/guide/routing.html

// @route       GET api/profile/user/:user_id
// @desc        Get all profiles
// @access      Public
router.get('/user/:user_id', async (req, res) => {
    try {
        // Populate adds fields from user collection with array of fields
        // we want to add, in this case the name and avatar - has 'user' in common
        // // findOne vs find (used above)
        // // find by user which we have access to via the url provided
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name']);

        if (! profile) {
            return res.status(400).json({msg: 'Profile not found'});
        }

        res.json(profile);
    } catch (err) {
        if (err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'});
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route       DELETE api/profile
// @desc        Delete profile, user, & posts
// @access      Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove profile - Note if you want to remove anything else related to user
        // // Note the difference between req.user.id and req.params.user_id (used Above)
        // // Remember, have access to user.id in the request because of auth middle ware de-tokenization
        await Profile.findOneAndRemove({user: req.user.id});
        // // Also note the above uses user model to identify and below uses direct attribute '_id'
        await User.findOneAndRemove({_id: req.user.id});
        res.json({msg: 'User Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

///////////////////////////////////////////////////////////////


// @route       PUT api/profile/mentorProfile/subjects
// @desc        Add subjects to mentor profile
// @access      Private

router.put('/mentorProfile/subjects', auth, async (req, res) => {

    const {
        subjects
    } = req.body;

    const subs = subjects.split(',').map(subjects => subjects.trim());

    try {
        let profile = await Profile.findOne({user: req.user.id});
        // If profile already exists
        if (profile) {
            profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: {"mentorProfile.subjects": subs}
            }, {new: true});

            return res.json(profile);
        }

        // If profile does not exist, create profile
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route       POST api/profile/mentorProfile/reviews/:id
// @desc        Post a review on a mentor profile
// @access      Private

router.post('/mentorProfile/reviews/:id', [
    auth,
    [
    	check('rating', 'Rating is required').not().isEmpty(),
    	check('text', 'Text is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
        rating,
        text
    } = req.body;

    try {
        const user = await User.findById(req.user.id).select('-password');
        const mentorUser = await Profile.findById(req.params.id);

        const newReview = {
        	rating: rating,
            text: text,
            name: user.name,
            user: req.user.id
        };

        mentorUser.mentorProfile.reviews.unshift(newReview);

        await mentorUser.save();

        res.json(mentorUser.mentorProfile.reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route       DELETE api/profile/mentorProfile/:id/:review_id
// @desc        Delete a review
// @access      Private

router.delete('/mentorProfile/:id/:review_id', auth, async (req, res) => {
    try {
        const mentorUser = await Profile.findById(req.params.id);

        // Retrieve which review you want to delete
        const review = mentorUser.mentorProfile.reviews.find(review => review.id === req.params.review_id);

        // First check to see if the comment exists
        if (! review) {
            return res.status(404).json({msg: 'Comment does not exist'});
        }

        // Make sure the user that wants to delete is the same user that posted it
        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        // Get index of comment to be removed
        const removeIndex = mentorUser.mentorProfile.reviews.map(review => review.user.toString()).indexOf(req.user.id);

        mentorUser.mentorProfile.reviews.splice(removeIndex, 1);

        await mentorUser.save();
        res.json(mentorUser.mentorProfile.reviews);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/profile/menteeProfile/subjects
// @desc        Add subjects to mentee profile
// @access      Private

router.put('/menteeProfile/subjects', auth, async (req, res) => {

    const {
        subjects
    } = req.body;

    const subs = subjects.split(',').map(subjects => subjects.trim());

    try {
        let profile = await Profile.findOne({user: req.user.id});
        // If profile already exists
        if (profile) {
            profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: {"menteeProfile.subjects": subs}
            }, {new: true});

            return res.json(profile);
        }

        // If profile does not exist, create profile
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


// @route       PUT api/profile/connectMentor/:id
// @desc        Connect with a mentor
// @access      Private

router.put('/connectMentor/:id', auth, async (req, res) => {
    try {
        const menteeUser = await Profile.findOne({user: req.user.id});

        // Check if the mentor has already been connected with
        // Higher order array function that compares current user to user thats logged in
        // // If length is greater than 0, then mentor has already been followed
        if (menteeUser.menteeProfile.connections.filter(connection => connection.mentor.toString() === req.params.id).length > 0) {
            return res.status(400).json({msg: 'Mentor already followed'});
        }

        const newConnection = {
        	mentor: req.params.id
        }

        // Adds current user to the list of people that are connected with the mentor
        menteeUser.menteeProfile.connections.unshift(newConnection);

        await menteeUser.save();
        res.json(menteeUser.menteeProfile.connections);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route       PUT api/profile/disconnectMentor/:id
// @desc        Disconnect from a mentor
// @access      Private

router.put('/disconnectMentor/:id', auth, async (req, res) => {
    try {
    	const menteeUser = await Profile.findOne({user: req.user.id});

        // Check if the mentor has already been connected with
        // Higher order array function that compares current user to user thats logged in
        // // If length is equal to 0, then mentor has already been connected with and can then be disconnected
        if (menteeUser.menteeProfile.connections.filter(connection => connection.mentor.toString() === req.params.id).length === 0) {
            return res.status(400).json({msg: 'Mentor has not yet been followed'});
        }

        // Get index of connectionIncident to be removed
        const removeIndex = menteeUser.menteeProfile.connections.map(connection => connection.mentor.toString()).indexOf(req.user.id);

        menteeUser.menteeProfile.connections.splice(removeIndex, 1);

        await menteeUser.save();
        res.json(menteeUser.menteeProfile.connections);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route       PUT api/profile/connectMentee/:id
// @desc        Connect with a mentee
// @access      Private

router.put('/connectMentee/:id', auth, async (req, res) => {
    try {
        const mentorUser = await Profile.findOne({user: req.user.id});

        // Check if the mentee has already been connected with
        // Higher order array function that compares current user to user thats logged in
        // // If length is greater than 0, then mentee has already been followed
        if (mentorUser.mentorProfile.connections.filter(connection => connection.mentee.toString() === req.params.id).length > 0) {
            return res.status(400).json({msg: 'Mentee already followed'});
        }

        const newConnection = {
        	mentee: req.params.id
        }

        // Adds current user to the list of people that are connected with the mentor
        mentorUser.mentorProfile.connections.unshift(newConnection);

        await mentorUser.save();
        res.json(mentorUser.mentorProfile.connections);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route       PUT api/profile/disconnectMentee/:id
// @desc        Disconnect from a mentee
// @access      Private

router.put('/disconnectMentee/:id', auth, async (req, res) => {
    try {
    	const mentorUser = await Profile.findOne({user: req.user.id});

        // Check if the mentee has already been connected with
        // Higher order array function that compares current user to user thats logged in
        // // If length is equal to 0, then mentee has already been connected with and can then be disconnected
        if (mentorUser.mentorProfile.connections.filter(connection => connection.mentee.toString() === req.params.id).length === 0) {
            return res.status(400).json({msg: 'Mentee has not yet been followed'});
        }



        // Get index of connectionIncident to be removed
        const removeIndex = mentorUser.mentorProfile.connections.map(connection => connection.mentee.toString()).indexOf(req.user.id);

        mentorUser.mentorProfile.connections.splice(removeIndex, 1);

        await mentorUser.save();
        res.json(mentorUser.mentorProfile.connections);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



/////////////////////////////////////////////////////////////////


// @route       PUT api/profile/experience
// @desc        Add profile experience
// @access      Private

router.put('/experience', [
    auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From Date is required').not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        // Remember, below is same as doing ... title: title ... Why? ES6 - both var names are the same
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});
        // Unshift is like push, except it adds to the beginning of the array - new exp listed earlier logically
        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

// @route       DELETE api/profile/experience/:exp_id
// @desc        Delete experience from profile
// @access      Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try { // Find relevent profile
        const profile = await Profile.findOne({user: req.user.id});
        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route       PUT api/profile/education
// @desc        Add profile education
// @access      Private

router.put('/education', [
    auth,
    [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of study is required').not().isEmpty(),
        check('from', 'From is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        // Remember, below is same as doing ... school: school ... Why? ES6 - both var names are the same
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});
        // Unshift is like push, except it adds to the beginning of the array - new edu listed earlier logically
        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

// @route       DELETE api/profile/education/:edu_id
// @desc        Delete education from profile
// @access      Private

router.delete('/education/:edu_id', auth, async (req, res) => {
    try { // Find relevent profile
        const profile = await Profile.findOne({user: req.user.id});
        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
