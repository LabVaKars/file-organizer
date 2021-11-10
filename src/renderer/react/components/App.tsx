import React from 'react'
import {Switch, Route} from 'react-router-dom'

// import Header from './Header'
// import AboutPage from 'tg_pages/AboutPage'
// import WelcomePage from 'tg_pages/WelcomePage'
// import MyProjectsPage from 'tg_pages/MyProjectsPage'
// import TableEdit from 'tg_components/TableEdit'
import NotFoundPage from 'tg_pages/NotFoundPage'
import ProjectsTable from './ProjectsTable'

const App = () => {

	return (
		<>
			<Switch>
				{/* <Route exact path="/about" component={AboutPage} /> */}
				{/* <Route exact path="/" component={WelcomePage} /> */}
				<Route exact path="/" component={ProjectsTable} />
				{/* <Route exact path="/" component={AboutPage} /> */}
				<Route component={NotFoundPage} />
			</Switch>
		</>
	)
}

export default App