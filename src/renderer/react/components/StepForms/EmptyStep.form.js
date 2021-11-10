import React from 'react'
import PropTypes from 'prop-types'

EmptyStepForm.propTypes = {
}

export default function EmptyStepForm(props) {

	let {selectedStep} = props

	let ss = selectedStep[0]

	return (
		<div className="row">
			<div className="col-6">
				Empty step. Form not specified. Select another step type to see the form
			</div>
			{ss.errors.step &&
				<div className="col-6">
					<div className="alert alert-danger small p-1">{ss.errors.step}</div>
				</div>
			}
		</div>
	)
}

