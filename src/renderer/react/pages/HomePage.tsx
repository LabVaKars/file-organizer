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
                        <p>Select folders</p>
                        <h5>Step 2:</h5>
                        <p>Define filters</p>
                        <h5>Step 3:</h5>
                        <p>Define conditions</p>
                        <h5>Step 4:</h5>
                        <p>Define actions</p>
                        <h5>Step 5:</h5>
                        <p>Define timetables</p>
                        <h5>Step 6:</h5>
                        <p>Define rules</p>
                        <h5>Step 7:</h5>
                        <p>File organizer will use defined rules for file organization</p>
                    </Card.Body>
                </Card>
            </div>
		</>
	)
}

