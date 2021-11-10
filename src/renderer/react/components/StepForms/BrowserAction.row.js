import React from 'react'
import PropTypes from 'prop-types'

BrowserActionRow.propTypes = {
	id: PropTypes.number,
}

const options = [
	['1', 'BACK'],
	['2', 'REFRESH'],
	['3', 'FORWARD']
]

export default function BrowserActionRow(props) {

	const {form} = props
	const label = options.filter((o) => {
		return o[0] == form.action 
	})[0][1]
	return (
		<div>
            Click : <span className="text-danger">{label}</span> button on browser navigation tab 
		</div>
	)
}

