package ru.mettatron.mttnenterprise.user;

import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Service;

@Service
public class UserGraphQLQueryResolver implements GraphQLQueryResolver {
    private final UserService userService;

    public UserGraphQLQueryResolver(UserService userService) {
        this.userService = userService;
    }

    //@PreAuthorize("isAnonymous()")
    public User user() {
        return userService.getCurrentUser();
    }
}
