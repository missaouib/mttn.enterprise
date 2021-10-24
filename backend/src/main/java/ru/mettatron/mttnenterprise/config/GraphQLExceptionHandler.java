package ru.mettatron.mttnenterprise.config;

import graphql.ExceptionWhileDataFetching;
import graphql.execution.DataFetcherExceptionHandler;
import graphql.execution.DataFetcherExceptionHandlerParameters;
import graphql.execution.DataFetcherExceptionHandlerResult;
import graphql.execution.ResultPath;
import graphql.language.SourceLocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;

public class GraphQLExceptionHandler implements DataFetcherExceptionHandler {
    private final Logger log = LoggerFactory.getLogger(GraphQLExceptionHandler.class);

    @Override
    public DataFetcherExceptionHandlerResult onException(DataFetcherExceptionHandlerParameters handlerParameters) {
        Throwable exception = handlerParameters.getException();
        SourceLocation sourceLocation = handlerParameters.getSourceLocation();
        ResultPath path = handlerParameters.getPath();

        if (exception instanceof AccessDeniedException) {
            log.warn("unauthorized to access " +
                    path);
        }

        ExceptionWhileDataFetching error = new ExceptionWhileDataFetching(path, exception, sourceLocation);
        //log.warn(error.getMessage(), exception);
        return DataFetcherExceptionHandlerResult.newResult().error(error).build();
    }
}
