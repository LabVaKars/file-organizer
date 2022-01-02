import React from 'react'

import {Link} from 'react-router-dom'

const leftLinks = [
	{path: '/', label: 'Home'},
	{path: '/folders', label: 'Used folders'},
	{path: '/filters', label: 'Filters'},
	{path: '/conditions', label: 'Conditions'},
	{path: '/actions', label: 'Actions'},
	{path: '/rules', label: 'Rules'}
]



const Header = () => {

	return (
		<nav className="navbar navbar-default navbar-expand-sm sticky-top bg-dark navbar-dark justify-content-between">
			<ul className="navbar-nav">
				{leftLinks.map((link) => {
					return (
						<li className="nav-item">
							<Link to={link.path}><span className="nav-link">{link.label}</span></Link>
						</li>
					)
				})}
			</ul>
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link to={'/login'}><span className="nav-link">Sign In</span></Link>
				</li>
				<li className="navbar-text">or</li>
				<li>
					<Link to={'/register'}><span className="nav-link">Sign Up</span></Link>
				</li>
			</ul>
		</nav>
	)
}

export default Header