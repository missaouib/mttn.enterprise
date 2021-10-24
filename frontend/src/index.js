import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloProvider} from '@apollo/client';
import {graphQlClient} from "./graphQlClient";
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from "./theme";
import {AuthProvider} from "./auth";
import {CssBaseline} from "@material-ui/core";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ApolloProvider client={graphQlClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <App/>
                </ThemeProvider>
            </ApolloProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
