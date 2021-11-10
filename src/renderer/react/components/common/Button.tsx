import React from 'react'

/**
 * Stateless
 * return simple button template
 * @param {string} name Label used in button
 * @param {func} handleClick Action run on button click
 */

interface Props {
	name?: string,
	icon?: string,
	handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
	disabled?: boolean
}

const Button = (props : Props) => {

	const {name, icon, handleClick, disabled} = props
	const buttonName = (icon == undefined)
		? (name)
		: (
			<>
				{icon} | {name}
			</>)

	return (<>
		<button type="button" className="btn btn-sm btn-success"
			onClick={handleClick} disabled={disabled}
		>
			{buttonName}
		</button>
	</>)
}

export default Button


