package ru.mettatron.mttnenterprise.config;

public class BadTokenException extends RuntimeException{
    @Override
    public String getMessage() {
        return "Token is invalid or expired";
    }
}
