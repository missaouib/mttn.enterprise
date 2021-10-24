package ru.mettatron.mttnenterprise.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

public class JWTPreAuthenticationToken extends PreAuthenticatedAuthenticationToken {
    public JWTPreAuthenticationToken(UserDetails aPrincipal, WebAuthenticationDetails details) {
        super(aPrincipal, null, aPrincipal.getAuthorities());
        super.setDetails(details);
    }

    @Override
    public Object getCredentials() {
        return null;
    }
}
