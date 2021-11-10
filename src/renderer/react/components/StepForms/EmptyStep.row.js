import React from 'react'
import PropTypes from 'prop-types'

EmptyStepRow.propTypes = {
	id: PropTypes.number,
}

export default function EmptyStepRow(props) {

	return (
		<div>
            Empty step. Nothing happens over here
		</div>
	)
}

