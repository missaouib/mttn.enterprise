import React from "react";
import {ApolloClient, from, HttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {onError} from "@apollo/client/link/error";
import {createUploadLink} from "apollo-upload-client";
import {RetryLink} from "@apollo/client/link/retry";

const customFetch = (url, opts = {}) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(opts.method || 'get', url);

        for (let k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k]);

        xhr.onload = e =>
            resolve({
                ok: true,
                text: () => Promise.resolve(e.target.responseText),
                json: () => Promise.resolve(JSON.parse(e.target.responseText))
            })

        xhr.onerror = reject;

        if (xhr.upload) {
            opts.onProgress && (xhr.upload.onprogress = opts.onProgress);
        }

        xhr.send(opts.body);
    });
}

const httpLink = new RetryLink().split(
    (operation) => operation.getContext().useUploadLink === true,
    // Replaces the default apollo link (createHttpLink) for file upload capability.
    createUploadLink({
        uri: process.env.REACT_APP_GRAPHQL_SERVER_URI,
        fetch: typeof window === 'undefined' ? global.fetch : customFetch,
    }),
    new HttpLink({uri: process.env.REACT_APP_GRAPHQL_SERVER_URI})
);

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
});

const errorLink = onError(({response, operation, graphQLErrors}) => {
    /*if (operation.operationName === "Init") {
        const {setAuth} = useAuth();
        setAuth(null);
        response.errors = null;
    }*/
});

export const graphQlClient = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
});