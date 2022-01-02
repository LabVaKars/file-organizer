import React from 'react'
import { Card } from 'react-bootstrap'

export default function HomePage() {
	return (
		<>
            <div className="jumbotron">
                <Card>
                    <Card.Header>
                        <h3>Welcome to File Organizer Home Page</h3>
                    </Card.Header>
                    <Card.Body>
                        <p>This is an application, that let you organize files on your computer</p>
                    </Card.Body>
                    <Card.Header>
                        <h3>Short manual</h3>
                    </Card.Header>
                    <Card.Body>
                        <h5>Step 1:</h5>
                        <p>WIP...</p>
                    </Card.Body>
                </Card>
            </div>
		</>
	)
}

