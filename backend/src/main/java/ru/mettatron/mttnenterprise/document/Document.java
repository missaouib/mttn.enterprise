package ru.mettatron.mttnenterprise.document;

import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.IndexedEmbedded;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "documents")
@Indexed
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "documents_id_seq")
    @SequenceGenerator(name = "documents_id_seq", sequenceName = "documents_id_seq", allocationSize = 1)
    private Long id;

    @FullTextField
    private String title;

    @FullTextField
    private String description;

    private LocalDate date;

    @OneToMany(mappedBy = "document", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @IndexedEmbedded
    private List<DocumentFile> files;

    public Document() {
    }

    public Document(String title, String description, LocalDate date, List<DocumentFile> files) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.files = files;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String name) {
        this.title = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<DocumentFile> getFiles() {
        return files;
    }

    public void setFiles(List<DocumentFile> files) {
        this.files = files;
    }
}
