// styling
// import '../../../node_modules/bootstrap/dist/js/bootstrap.js'
// import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
// react
import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import axios from 'axios'

import App from 'tg_components/App'
import UnauthorizedPage from 'tg_pages/UnauthorizedPage'

// axios.interceptors.response.use((res) => {
// 	return res
// },(err) => {
// 	if(401 == err.response.status){
// 		return <UnauthorizedPage />
// 	} else return Promise.reject(err)
// })

// const store = createStore(rootReducer, compose(
// 	applyMiddleware(thunk),
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// ))

// const unsubscribe = store.subscribe(() => console.log(store.getState()))

const IndexApp = () => {
	return (
		<>
		{/* <h2>Hellow world</h2> */}
		{/* <Provider store = {store}> */}
			{/* <AuthContextProvider> */}
				{/* <DndProvider backend={Backend}> */}
					<Router>
						<Route component={App} />
					</Router>
					{/* <App/> */}
				{/* </DndProvider> */}
			{/* </AuthContextProvider> */}
		{/* </Provider> */}
		</>
	);
}

export default IndexApp