import React from 'react'

export default function AboutPage() {
	return (
		<>
			<div className="jumbotron">
				<div className="card-header">
					<h3>About this application</h3>
				</div>
				<div className="card-body">
					<p>This is an application, that let you create e2e tests and to generate source code for this tests</p>
					<p>To start using this application, please log in, if you already have account or register, if you don't</p>
				</div>
				<div className="card-header">
					<h3>Short manual</h3>
				</div>
				<div className="card-body">
					<h5>Step 1:</h5>
					<p>Log in to application</p>
					<h5>Step 2:</h5>
					<p>Click on <span className="text-primary">My Projects</span> link in Navbar</p>
					<h5>Step 3:</h5>
					<p>Create new project by clicking on <span className="text-primary">Add Project</span> button</p>
					<h5>Step 4:</h5>
					<p>Enter your project name and click <span className="text-primary">Save Changes</span> button</p>
					<h5>Step 5:</h5>
					<p>Click on <i className="fas fa-edit text-primary"/> icon to edit your project and add new Tests and Groups</p>
					<h5>Step 6:</h5>
					<p>Add new tests by clicking on <span className="text-primary">Add Test</span> or &nbsp;
						<span className="text-primary">Add Group</span> buttons. Save your changes</p>
					<h5>Step 7:</h5>
					<p>Click on <span className="text-primary">Code generator</span></p> link in Navbar
					<h5>Step 8:</h5>
					<p>Select one of your craeted projects and click <span className="text-primary">Generate</span> button
						and click <span className="text-primary">Generate Code</span> button</p>
					<h5>Step 9:</h5>
					<p>Copy and use generated test code in your Nightwatch.js framework</p>
				</div>
			</div>
		</>
	)
}

