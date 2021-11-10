import React from 'react'
import PropTypes from 'prop-types'

PromptSetValueRow.propTypes = {
	id: PropTypes.number,
}

export default function PromptSetValueRow(props) {

	const {form} = props

	return (
		<div>
            Send text "<span className="text-danger">{form.text}</span>" to prompt.  
		</div>
	)
}

