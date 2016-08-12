import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;
const EmployeeList = (props) => {
	// props.employees => an array of employee objects
	// functional components, one-shot, no persistent data. 
	// for persistent data, need a class-based component

	return (
		<div>
			<div className="employee-list">
				{props.employees.map(employee => 
					<EmployeeDetail key={employee._id} employee={employee} />
				)}
			</div>
			<button onClick={() => Meteor.subscribe('employees', 40) }
			className="btn btn-primary">Load more...</button>
		</div>
		);
};

export default createContainer(() => {
	// set up subscription
	Meteor.subscribe('employees', PER_PAGE);
	// return an object. What we return will be sent to EmployeeList as props

	return { employees: Employees.find({}).fetch() };
	// .find() just creates a cursor, .fetch() gets the data

}, EmployeeList);