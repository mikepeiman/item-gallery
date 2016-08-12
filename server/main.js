// Only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
// great place to generate some data
	

// check to see if data exists in the collection
// See if the collection has any records
const numberRecords = Employees.find({}).count();
// .find() returns a data structure called a "cursor" (to be explained)

if(!numberRecords) {
	// generate some data
	_.times(5000, () => { //runs the function x number of time, more elegant than for loop
		const { name, email, phone } = helpers.createCard();

		Employees.insert({
			name, email, phone,
			avatar: image.avatar()
		});
	});
	}
});