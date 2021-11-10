import React from 'react'
import PropTypes from 'prop-types'

WindowSetSizeRow.propTypes = {
	id: PropTypes.number,
}


export default function WindowSetSizeRow(props) {

	const {form} = props

	return (
		<div>
            Set browser window size to&nbsp;  
            Height:<span className="text-danger"> {form.height}</span>&nbsp;
            Width:<span className="text-danger"> {form.width}</span>&nbsp;
		</div>
	)
}

