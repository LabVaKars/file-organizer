import React from 'react'
import { Modal, Button } from 'react-bootstrap'

interface Props {
    children: any,
    show: boolean,
    onCancel: any,
    onSubmit: any,
    name: string,
    label: string
}

export default function SimpleFormModal(props : Props) {

    let {
        children,
        show,
        onCancel,
        // onSubmit,
        // name,
        label
    } = props

	return (
		<>
            <Modal size="lg" show={show} backdrop="static" onHide={onCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>
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
