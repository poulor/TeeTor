const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
	teeTorType: {
	    type: [String],
	    required: true
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    languages: {
	    type: [String]
    },
    skills: {
        type: [String],
        required: true
    },
    mentorProfile: {
    	subjects: [
    		{
    			subName: {
    				type: String,
    				required: true
    			}
    		}
    	],
    	connections: [
    		{
    			mentee: {
	    			type: Schema.Types.ObjectId,
	        		ref: 'user'
	        	},
	        	date: {
			        type: Date,
			        default: Date.now
			    }
        	}
    	],
    	reviews: [
	        {
	            user: {
	                type: Schema.Types.ObjectId,
	                ref: 'users'
	            },
	            text: {
	                type: String,
	                required: 'true'
	            },
	            name: {
	                type: String
	            },
	            avatar: {
	                type: String
	            },
	            date: {
	                type: Date,
	                default: Date.now
	            }
	        }
    	],
        rating: {
            type: Number
        }
    },
    menteeProfile: {
    	subjects: [
    		{
    			subName: {
    				type: String,
    				required: true
    			}
    		}
    	],
    	connections: [
    		{
    			mentor: {
	    			type: Schema.Types.ObjectId,
	        		ref: 'user'
	        	},
	        	date: {
			        type: Date,
			        default: Date.now
			    }
        	}
    	],
        menteePoints: {
            type: Number
        }
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('profile', ProfileSchema);
