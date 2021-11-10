import React from 'react'
import PropTypes from 'prop-types'

import { comparatorOptions } from 'tg_constants/Selects'

AssertElemCoorRow.propTypes = {
	id: PropTypes.number,
}


export default function AssertElemCoorRow(props) {

	const {form, parentForm} = props


    console.log(form);


	return (
		<div>
            Assert that coordinates of element with css value "<span className="text-danger">{parentForm.cssSelector}</span>" are&nbsp;
            X:<span className="text-danger"> {form.x}</span>&nbsp;
            Y:<span className="text-danger"> {form.y}</span>&nbsp;
		</div>
	)
}

