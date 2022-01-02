import React from 'react'
import {Route, Routes, Navigate, HashRouter} from 'react-router-dom'
import Header from 'tg_components/Header'

import EditFilterPage from 'tg_pages/EditFilterPage'
import EditFolderPage from 'tg_pages/EditFolderPage'
import FoldersPage from 'tg_pages/FoldersPage'
import FiltersPage from 'tg_pages/FiltersPage'
import HomePage from 'tg_pages/HomePage'
import NotFoundPage from 'tg_pages/NotFoundPage'
import ConditionsPage from 'tg_pages/ConditionsPage'
import EditConditionPage from 'tg_pages/EditConditionPage'

const App = () => {

	return (
			<>

				<HashRouter basename="/">
					<Header/>
					<Routes>
						<Route path="/" element={<HomePage/>} />
						<Route path="/index.html" element={<Navigate to="/"/>} />
						<Route path="/folders" element={<FoldersPage/>} />
						<Route path="/folder" element={<EditFolderPage isNew={true}/>} />
						<Route path="/folder/:folder_id" element={<EditFolderPage isNew={false}/>} />
						<Route path="/filters" element={<FiltersPage/>} />
						<Route path="/filter" element={<EditFilterPage isNew={true}/>} />
						{/* <Route path="/filter/:filter_id" element={<EditFilterPage isNew={false}/>} /> */}
						<Route path="/conditions" element={<ConditionsPage />} />
						<Route path="/condition" element={<EditConditionPage isNew={true}/>} />
						{/* <Route path="/condition/:condition_id" element={<EditConditionPage isNew={false}/>} /> */}
						<Route path="*" element={<NotFoundPage/>} />
					</Routes>
				</HashRouter>
			</>
	)
}

export default App