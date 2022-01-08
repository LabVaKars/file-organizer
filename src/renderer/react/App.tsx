import React from 'react'
import {Route, Routes, Navigate, HashRouter} from 'react-router-dom'
import Header from 'tg_components/Header'

import FoldersPage from 'tg_pages/FoldersPage'
import FiltersPage from 'tg_pages/FiltersPage'
import HomePage from 'tg_pages/HomePage'
import NotFoundPage from 'tg_pages/NotFoundPage'
import ConditionsPage from 'tg_pages/ConditionsPage'
import ActionsPage from 'tg_pages/ActionsPage'
import TimetablesPage from 'tg_pages/TimetablesPage'
import RulesPage from 'tg_pages/RulesPage'

const App = () => {

	return (
			<>

				<HashRouter basename="/">
					<Header/>
					<Routes>
						<Route path="/" element={<HomePage/>} />
						<Route path="/index.html" element={<Navigate to="/"/>} />
						<Route path="/folders" element={<FoldersPage/>} />
						<Route path="/filters" element={<FiltersPage/>} />
						<Route path="/conditions" element={<ConditionsPage />} />
						<Route path="/actions" element={<ActionsPage />} />
						<Route path="/timetables" element={<TimetablesPage />} />
						<Route path="/rules" element={<RulesPage />} />
						<Route path="*" element={<NotFoundPage/>} />
					</Routes>
				</HashRouter>
			</>
	)
}

export default App