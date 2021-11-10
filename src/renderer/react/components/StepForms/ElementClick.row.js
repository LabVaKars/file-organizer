import React from 'react'
import PropTypes from 'prop-types'

ElementClickRow.propTypes = {
	id: PropTypes.number,
}

export default function ElementClickRow(props) {

	const {parentForm} = props

	return (
		<div>
            Click on element with css: "<span className="text-danger">{parentForm.cssSelector}</span>" 
		</div>
	)
}

