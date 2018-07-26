'use strict';

// Method that strips down the db data from sensitive information

function dataToSecure (dataArray) {

	const modifiedDataArray = [];

	dataArray.forEach((element)=> {

		const newObject = {
			firstName: '',
			lastName: '',
			email: '',
			_id: ''
		}

		newObject.firstName = element.firstName;
		newObject.lastName = element.lastName;
		newObject.email = element.email;
		newObject._id = element._id;

		modifiedDataArray.push(newObject);

	});

	return modifiedDataArray;
}

module.exports = {
	dataToSecure
}
