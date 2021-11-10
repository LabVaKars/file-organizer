import React from 'react'
import PropTypes from 'prop-types'

SelectElementRow.propTypes = {
	id: PropTypes.number,
}

export default function SelectElementRow(props) {

    const {form} = props

	return (
		<div>
            Selected element from page with CSS value - <span className="text-danger">{form.cssSelector}</span>
		</div>
	)
}

