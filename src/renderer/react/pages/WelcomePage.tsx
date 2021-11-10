import React from 'react'
import {Link} from 'react-router-dom'

export default function WelcomePage() {
	return (
		<React.Fragment>
			<h1>Welcome, stranger! This is a file organizer application.</h1>
			<h2>Press the button below to continue</h2>
			<span className="btn btn-success form-control"><Link to="/">Welcome</Link></span>
			<span className="btn btn-success form-control"><Link to="/projects">Projects</Link></span>
			<span className="btn btn-success form-control"><Link to="/project/project1">Edit Project Groups</Link></span>
			<span className="btn btn-success form-control"><Link to="/project/project1/group/group1">Edit SubGroups</Link></span>
			<span className="btn btn-success form-control"><Link to="/project/project1/group/group1/test/test1">Edit Test</Link></span>
		</React.Fragment>
	)
}

WelcomePage.propTypes = {}
