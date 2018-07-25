'use strict';

const mongoose = require(`mongoose`);
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	firstName: { type: String, default: null},
	lastName: { type: String, default: null },
	email: { type: String, default: null, unique: true},
	password: { type: String, default: null }
});


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
