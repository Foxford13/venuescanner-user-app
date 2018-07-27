'use strict';

const User = require('../models/user');
const bcrypt = require('bcrypt');
const { dataToSecure }  = require('../utils/controllerUtils')

/*
*  Passes secure data of all users to the main page
*/

async function usersIndex (req, res) {
	let usersIndex;

	try {
		usersIndex = await User.find().exec();
	}
	catch(err) {
		return res.status(500).json(err);
	}

	return res.send(usersIndex);
}

/*
* Create new user and return the status depending on an email.
*/

async function userCreate (req, res) {

	const userData = new User(req.body);

	try {
		await userData.save();
	}
	catch (err) {

		// if (err.code == 11000) {
		// 	return res.status(409).send({
		// 		"message": "This email already has been taken"
		// 	})
		// }
		return res.status(500).json(err);
	}

	return res.json(userData);
}

/*
*  Pulls user data to edit
*/

async function userEdit  (req, res) {

	const userId = req.params.id;
	let userData;

	try {
		userData = await User.findOne({ _id: userId }).exec();
	}
	catch (err) {
		return res.status(500).json(err);
	}
	return res.json(userData);
}

/*
*  Updates user data
*/

async function userUpdate (req, res) {
	const userId = req.params.id;
	let userData;

	try {
		userData = await User.findOneAndUpdate({ _id: userId }, req.body, { runValidators: true }).exec();
	}
	catch (err) {
		return res.status(500).json(err);
	}

	return res.json(userData);
}

/*
* Deletes a user by their id in params
*/

async function userDelete (req, res) {

	const userId = req.params.id;
	let userData;

	try {
		userData = await User.findOne({ _id: req.params.id }).exec();
		userData.remove();
	}
	catch (err) {
		return res.status(500).json(err);
	}

	return res.json(userData);

}

module.exports = {
	usersIndex,
	userCreate,
	userEdit,
	userUpdate,
	userDelete,
}
