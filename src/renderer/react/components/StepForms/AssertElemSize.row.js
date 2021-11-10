import React from 'react'
import PropTypes from 'prop-types'

AssertElemSizeRow.propTypes = {
	id: PropTypes.number,
}


export default function AssertElemSizeRow(props) {

	const {form, parentForm} = props


    console.log(form);


	return (
		<div>
            Assert that size of element with css value "<span className="text-danger">{parentForm.cssSelector}</span>" are&nbsp;
            Height:<span className="text-danger"> {form.height}</span>&nbsp;
            Width:<span className="text-danger"> {form.width}</span>&nbsp;
		</div>
	)
}

