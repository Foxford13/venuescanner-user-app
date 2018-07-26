'use strict';

const mongoose = require(`mongoose`);
const bcrypt = require('bcrypt');

const validateEmail = function(email) {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email)
};

const validatePassword = function(password) {
	const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	return re.test(password)
};

const userSchema = new mongoose.Schema({
	firstName: { type: String, default: null, required: true},
	lastName: { type: String, default: null, required: true },
	email: { type: String,
		default: null,
		required: [true, 'Email is required'],
		unique: true,
		validate: [validateEmail, 'Please fill a valid email address']
	},
	password: {
		type: String,
		default: null,
		required: true,
		minlength: 8,
		maxlength: 30,
		validate: [validatePassword, 'Please enter a valid password. Min 8 characters, one uppercase letter and a number']
	}
});

/*
*  Validates wether email is uniqe and returns a custom message
*/
userSchema.path('email').validate(function(value, done) {
   this.model('User').count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        }
        done(!count);
    });
}, 'Email already exists');

const userModel = mongoose.model(`User`, userSchema, `user`);

module.exports = userModel;
