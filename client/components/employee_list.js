import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;
class EmployeeList extends Component {
	componentWillMount() {
		this.page = 1;
	}



	handleButtonClick() {
		Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
		this.page += 1;
	}
	render() {
	// props.employees => an array of employee objects
	// functional components, one-shot, no persistent data. 
	// for persistent data, need a class-based component.
	// 		Two rules of all class-based components:
	// 			1. Must define a render method
	// 			2. That method must return some JSX

	return (
		<div>
			<div className="employee-list">
				{this.props.employees.map(employee => 
				// using this.props because it is a class-based component. In a functional component props is argument
					<EmployeeDetail key={employee._id} employee={employee} />
				)}
			</div>
			<button onClick={this.handleButtonClick.bind(this)}
			// "Because this is a callback, we need to bind the context of it, k" what?
			className="btn btn-primary">Load more...</button>
		</div>
		);
	}
};


export default createContainer(() => {
	// set up subscription
	Meteor.subscribe('employees', PER_PAGE);
	// return an object. What we return will be sent to EmployeeList as props

	return { employees: Employees.find({}).fetch() };
	// .find() just creates a cursor, .fetch() gets the data

}, EmployeeList);