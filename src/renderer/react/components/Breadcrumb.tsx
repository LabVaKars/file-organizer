import React from 'react'

import {Link} from 'react-router-dom'

// interface linkType {
// 	name: string
// 	id: number,
// 	type: string
// }

interface Props {
	links: any,
	changeBreadcrumb: any
}

const Breadcrumb = (props : Props) => {

	const {links, changeBreadcrumb} = props

	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				{links.slice(0, links.length-1).map((l:any) => {
					return(
						<li className="breadcrumb-item">
							<Link to={"#"} onClick={(e) => {
								e.preventDefault()
								changeBreadcrumb(l.id, l.type)
							}}>
								{l.name}
							</Link>
						</li>
					)
				})}
				{links.slice(links.length-1, links.length).map((l:any) => {
					return(
						<li className="breadcrumb-item item-active">
							{l.name}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}

export default Breadcrumb