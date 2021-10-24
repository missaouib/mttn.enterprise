package ru.mettatron.mttnenterprise.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    final Algorithm algorithm;
    private final JWTVerifier verifier;
    private final UserRepository repository;

    public UserService(JWTVerifier verifier, UserRepository repository, Algorithm algorithm) {
        this.verifier = verifier;
        this.repository = repository;
        this.algorithm = algorithm;
    }

    @Transactional
    public User loadUserByToken(String token) {
        return getDecodedToken(token)
                .map(DecodedJWT::getSubject)
                .flatMap(repository::findByUsername)
                .orElse(null);
    }

    private Optional<DecodedJWT> getDecodedToken(String token) {
        try {
            return Optional.of(verifier.verify(token));
        } catch (JWTVerificationException ex) {
            return Optional.empty();
        }
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
    }

    @Transactional
    public User getCurrentUser() {
        return Optional
                .ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .map(Authentication::getName)
                .flatMap(repository::findByUsername)
                .orElse(null);
    }

    @Transactional
    public String getToken(User user) {
        Instant now = Instant.now();
        Instant expiry = Instant.now().plus(Duration.ofHours(2));
        return JWT
                .create()
                .withIssuer("my-graphql-api")
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(expiry))
                .withSubject(user.getUsername())
                .sign(algorithm);
    }
}
