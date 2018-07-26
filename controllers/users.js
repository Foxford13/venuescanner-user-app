'use strict';

const User = require('../models/user');
const bcrypt = require('bcrypt');
const { dataToSecure }  = require('../utils/controllerUtils')

/*
*  Passes secure data of all users to the main page
*/

async function usersIndex (req, res) {
	let usersIndex;
	// let secureUsersIndex;
	try {
		usersIndex = await User.find().exec();
		// secureUsersIndex = await dataToSecure(usersIndex);

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

	const userData = new User(req.body);

	try {
		await userData.save();
	}
	catch (err) {
		console.log(err);
		// if(err.name === 'ValidationError') {
		// 	return res.badRequest({}, err.toString());
		// }


		return res.status(500).end(err.toString());
	}

	return res.json(userData);
}

/*
*  Pulls user data to edit and sends only secure fields
*/

async function userEdit  (req, res) {

	const userId = req.params.id;
	let userData;


	try {
		userData = await User.findOne({ _id: userId }).exec();
		// userData.password = '';
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
