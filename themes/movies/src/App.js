import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import useNotifier from './hooks/useNotifer'
//import cac page can
import pageRoutes from '../src/routes/index'
// console.log(pageRoutes)
// call APP
function App() {
    useNotifier();
    return (
        <Router>
            <Switch>
                {pageRoutes.map((route, i) => (
                    <Route
                        key = {i}
                        path={route.path}
                        exact
                        name = {route.title}
                        render={props => (
                            // pass the sub-routes down to keep nesting
                            <route.component {...props} />
                        )}
                    />
                ))}
            </Switch>
        </Router>
    )
}

export default App
