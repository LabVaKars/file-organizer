import React from 'react'
import PropTypes from 'prop-types'

BrowserUrlRow.propTypes = {
	id: PropTypes.number,
}

export default function BrowserUrlRow(props) {

	const {form} = props

	return (
		<div>
            Follow the Link: <span className="text-danger">{form.link}</span>
		</div>
	)
}

