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
		required: [true, 'Why no bacon?'],
		unique: true,
		validate: [validateEmail, 'Please fill a valid email address']
	},
	password: {
		type: String,
		default: null,
		required: true,
		minlength: 8,
		maxlength: 30,
		validate: [validatePassword, 'Please enter a valid password. Min 8, one uppercase letter and a number']
	}
});

userSchema.path('email').validate(function(value, done) {
   this.model('User').count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        }
        // If `count` is greater than zero, "invalidate"
        done(!count);
    });
}, 'Email already exists');

// userSchema.pre('save', function(next) {
//     var user = this;
//
//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();
//
//     // generate a salt
//     bcrypt.genSalt(10, function(err, salt) {
//         if (err) return next(err);
//
//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
//
//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });
//
// userSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };


const userModel = mongoose.model(`User`, userSchema, `user`);

module.exports = userModel;
