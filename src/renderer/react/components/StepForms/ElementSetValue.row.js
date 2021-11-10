import React from 'react'
import PropTypes from 'prop-types'

ElementSetValueRow.propTypes = {
	id: PropTypes.number,
}

export default function ElementSetValueRow(props) {

	const {form, parentForm} = props

	return (
		<div>
            Send text "<span className="text-danger">{form.value}</span>" to element with css value "<span className="text-danger">{parentForm.cssSelector}</span>".  
		</div>
	)
}

