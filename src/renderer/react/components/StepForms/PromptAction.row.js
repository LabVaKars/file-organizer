import React from 'react'
import PropTypes from 'prop-types'

PromptActionRow.propTypes = {
	id: PropTypes.number,
}

const options = [
	['0', 'DECLINE'],
	['1', 'ACCEPT'],
]

export default function PromptActionRow(props) {

	const {form} = props
	const label = options.filter((o) => {
		return o[0] == form.answer 
	})[0][1]
	return (
		<div>
            <span className="text-danger">{label}</span> next prompt
		</div>
	)
}

