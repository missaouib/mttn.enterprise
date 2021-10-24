package ru.mettatron.mttnenterprise.common;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "application")
public class ApplicationConfigProperties {
    private String allowOrigins;

    public String getAllowOrigins() {
        return allowOrigins;
    }

    public void setAllowOrigins(String allowOrigins) {
        this.allowOrigins = allowOrigins;
    }
}
