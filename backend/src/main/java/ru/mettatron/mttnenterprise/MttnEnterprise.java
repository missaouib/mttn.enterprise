package ru.mettatron.mttnenterprise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class MttnEnterprise {
    public static void main(String[] args) {
        SpringApplication.run(MttnEnterprise.class, args);
    }
}
