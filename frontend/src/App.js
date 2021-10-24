import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./login/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import "@fontsource/roboto";
import {useQuery} from "@apollo/client";
import {useAuth} from "./auth";
import {GRAPHQL_QUERY_INIT} from "./graphQLQueries";

function App() {
    const {auth, setAuth} = useAuth();
    const [authLoading, setAuthLoading] = useState(true);
    const {loading, error, data} = useQuery(GRAPHQL_QUERY_INIT);

    useEffect(() => {
        if (!loading) {
            setAuth(data.user);
            setAuthLoading(loading);
        }
    }, [loading]);

    if (authLoading) return null;

    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path="/login">
                        {!auth ? <LoginPage/> : <Redirect to="/"/>}
                    </Route>
                    <Route path="/">
                        {auth ? <Dashboard/> : <Redirect to="/login"/>}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
