'use strict';

const User = require('../models/user');
const bcrypt = require('bcrypt');

async function usersIndex (req, res) {
	let usersIndex;

	try {
		usersIndex = await User.find().exec();
	}
	catch(err) {
		return res.status(500).end(err);
	}

	return res.send(usersIndex);
}

/*
* Create new user and return the status depending on an email.
*/

async function userCreate (req, res) {
	console.log(';req.body');
	console.log(req.body);
	const userData = new User(req.body);

	try {

		await userData.save();
	}
	catch (err) {

		if (err.code == 11000) {
			return res.status(409).send({
				"message": 'This email has been taken'
			})
		}

		return res.status(500).end(err.message);
	}

	return res.json(userData);
}

async function userEdit  (req, res) {

	const userId = req.params.id;
	let userData;

	try {
		userData = await User.findOne({ _id: userId }).exec();
	}
	catch (err) {
		return res.status(500).end(err.message);
	}
	return res.json(userData);
}

/*
*  Modifies the user data
*/

async function userUpdate (req, res) {
	const userId = req.params.id;
	let userData;

	try {
		userData = await User.find({ _id: userId }).update(req.body).exec();
	}
	catch (err) {
		return res.status(500).end(err.message);
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
		return res.status(500).end(err.message);
	}

	return res.json(userData);

}



module.exports = {
	usersIndex,
	userCreate,
	userEdit,
	userUpdate,
	userDelete

}
