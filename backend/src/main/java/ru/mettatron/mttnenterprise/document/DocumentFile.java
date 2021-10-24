package ru.mettatron.mttnenterprise.document;

import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;

import javax.persistence.*;

@Entity
@Table(name = "document_files")
public class DocumentFile {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "document_files_id_seq")
    @SequenceGenerator(name = "document_files_id_seq", sequenceName = "document_files_id_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "document_id")
    private Document document;

    private String name;

    @FullTextField
    private String ocr;

    public DocumentFile() {
    }

    public DocumentFile(Document document, String name, String ocr) {
        this.document = document;
        this.name = name;
        this.ocr = ocr;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOcr() {
        return ocr;
    }

    public void setOcr(String ocr) {
        this.ocr = ocr;
    }
}
