import React from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'

UnauthorizedPage.propTypes = {
	id: PropTypes.number,
}

export default function UnauthorizedPage() {
	return (
		<>
			<p>You are not authorized to access your projects</p>
			<p>Please <a className="btn btn-success"><Link to="/login">Sign in</Link></a> if you already have an account 
            or <a className="btn btn-success"><Link to="/register">Sign up</Link></a> if you don&apos;t</p>
		</>
	)
}

