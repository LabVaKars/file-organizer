import React from 'react'
import { Modal, Button } from 'react-bootstrap'

interface Props {
    htmlId: any,
    children: any,
    show: boolean,
    onCancel: any,
    label: string
}

export default function SimpleFormModal(props : Props) {

    let {
        htmlId,
        children,
        show,
        onCancel,
        label
    } = props

	return (
		<>
            <Modal size="xl" style={{maxWidth: "80% !important"}} show={show} backdrop="static" onHide={onCancel} centered id={htmlId}>
                <Modal.Header closeButton>
                    <Modal.Title>{label}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{overflow: "auto"}}>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button id={"cancelBtn"} variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    {/* <Button variant="primary" form={name} onClick={onSubmit}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
		</>
	)
}
