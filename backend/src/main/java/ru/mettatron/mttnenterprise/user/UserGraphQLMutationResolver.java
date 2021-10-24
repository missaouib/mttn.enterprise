package ru.mettatron.mttnenterprise.user;

import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@PreAuthorize("isAuthenticated()")
public class UserGraphQLMutationResolver implements GraphQLMutationResolver {
    private final UserService userService;
    private final AuthenticationProvider authenticationProvider;

    public UserGraphQLMutationResolver(UserService userService, AuthenticationProvider authenticationProvider) {
        this.userService = userService;
        this.authenticationProvider = authenticationProvider;
    }

    @PreAuthorize("isAnonymous()")
    public User login(String username, String password) {
        UsernamePasswordAuthenticationToken credentials = new UsernamePasswordAuthenticationToken(username, password);
        try {
            SecurityContextHolder.getContext().setAuthentication(authenticationProvider.authenticate(credentials));
            return userService.getCurrentUser();
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException(username);
        }
    }
}
