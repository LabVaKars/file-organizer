import React from 'react'
import PropTypes from 'prop-types'

AssertPromptRow.propTypes = {
	id: PropTypes.number,
}

export default function AssertPromptRow(props) {

	const {form} = props

	return (
		<div>
            Assert that prompt has text "<span className="text-danger">{form.text}</span>".  
		</div>
	)
}

