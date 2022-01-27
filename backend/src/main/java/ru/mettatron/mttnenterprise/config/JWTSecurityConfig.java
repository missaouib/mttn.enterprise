package ru.mettatron.mttnenterprise.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JWTSecurityConfig {
    @Bean
    public Algorithm jwtAlgorithm() {
        return Algorithm.HMAC256("my-JWT-secret");
    }

    @Bean
    public JWTVerifier verifier(Algorithm algorithm) {
        return JWT
                .require(algorithm)
                .withIssuer("my-graphql-api")
                .build();
    }

}
