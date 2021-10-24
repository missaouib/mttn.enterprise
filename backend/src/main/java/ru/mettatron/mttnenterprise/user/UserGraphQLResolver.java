package ru.mettatron.mttnenterprise.user;

import graphql.kickstart.tools.GraphQLResolver;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;

@Component
public class UserGraphQLResolver implements GraphQLResolver<User> {
    private final UserService service;

    public UserGraphQLResolver(UserService service) {
        this.service = service;
    }

    @PreAuthorize("isAuthenticated()")
    public String getToken(User user) {
        return service.getToken(user);
    }
}
