import React from 'react'
import PropTypes from 'prop-types'

Example.propTypes = {
	id: PropTypes.number,
}

export default class Example extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>Hello, world!</div>
		)
	}
}


