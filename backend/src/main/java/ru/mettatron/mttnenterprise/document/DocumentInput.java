package ru.mettatron.mttnenterprise.document;

import java.time.LocalDate;

class DocumentInput {
    private Long id;
    private String title;
    private String description;
    private LocalDate date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getDate() {
        return date;
    }
}
