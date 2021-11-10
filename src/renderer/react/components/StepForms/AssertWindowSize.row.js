import React from 'react'
import PropTypes from 'prop-types'

AssertWindowSizeRow.propTypes = {
	id: PropTypes.number,
}


export default function AssertWindowSizeRow(props) {

	const {form} = props

	return (
		<div>
            Assert that browser window size is&nbsp;  
            Height:<span className="text-danger"> {form.height}</span>&nbsp;
            Width:<span className="text-danger"> {form.width}</span>&nbsp;
		</div>
	)
}

