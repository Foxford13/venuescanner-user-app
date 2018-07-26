'use strict';
const router = require(`express`).Router();

const {
	usersIndex,
	userCreate,
	userEdit,
	userUpdate,
	userDelete
} = require('../controllers/users');

router.route(`/users`)
	.get(usersIndex);

router.route(`/users/new`)
	.post(userCreate);

router.route(`/users/:id`)
	.get(userEdit)
	.put(userUpdate)
	.delete(userDelete);

module.exports = router;
