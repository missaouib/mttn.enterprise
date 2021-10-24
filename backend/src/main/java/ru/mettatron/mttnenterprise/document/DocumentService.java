package ru.mettatron.mttnenterprise.document;

import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.mettatron.mttnenterprise.common.FileUtils;
import ru.mettatron.mttnenterprise.exceptions.FileUploadException;
import ru.mettatron.mttnenterprise.exceptions.ResourceNotFoundException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {
    private final DocumentRepository repository;
    private final DocumentAsyncService asyncService;
    private final DocumentConfigProperties properties;

    @PersistenceContext
    private EntityManager entityManager;

    public DocumentService(DocumentRepository repository, @Lazy DocumentAsyncService asyncService, DocumentConfigProperties properties) {
        this.repository = repository;
        this.asyncService = asyncService;
        this.properties = properties;
    }

    public Page<Document> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<Document> findByFilter(Pageable pageable, String search) {
        SearchSession searchSession = Search.session(entityManager);

        SearchResult<Document> result = searchSession.search(Document.class)
                .where(f -> f.match()
                        .fields("title", "description", "files.ocr")
                        .matching(search).fuzzy())
                .fetchAll();

        return new PageImpl<Document>(result.hits(), pageable, 10);
    }

    public Optional<Document> findById(Long id) {
        return repository.findById(id);
    }

    public Document save(Document document) {
        return repository.save(document);
    }

    public void deleteById(Long id) {
        Document document = findById(id).orElseThrow(() -> new ResourceNotFoundException("Document not found: id - " + id));

        for (DocumentFile documentFile : document.getFiles()) {
            File file = new File(properties.getStorePath() + documentFile.getName());
            file.delete();
        }

        repository.deleteById(id);
    }

    public void deleteFileByFileId(Long fileId) {
        Document document = repository.findByFilesId(fileId).orElseThrow(() -> new ResourceNotFoundException("Document not found: fileId - " + fileId));
        DocumentFile documentFile = document.getFiles().stream()
                .filter((d) -> d.getId().equals(fileId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("DocumentFile not found: fileId - " + fileId));

        new File(properties.getStorePath() + documentFile.getName()).delete();

        document.getFiles().remove(documentFile);

        save(document);
    }

    public DocumentFile fileUpload(Part part, Long id) {
        String filename = FileUtils.createUploadFilename(part.getSubmittedFileName(), properties.getStorePath());
        String pathname = properties.getStorePath() + filename;

        try {
            File fileStorePath = new File(properties.getStorePath());
            if (!fileStorePath.exists()) {
                fileStorePath.mkdirs();
            }

            part.write(pathname);
        } catch (IOException e) {
            System.out.println(e);
            throw new FileUploadException("File upload error", e);
        }

        Document document = findById(id).orElseThrow(() -> new ResourceNotFoundException("Document not found: id - " + id));
        DocumentFile documentFile = new DocumentFile(document, filename, "");
        document.getFiles().add(documentFile);

        Document savedDocument = save(document);
        List<DocumentFile> savedFiles = savedDocument.getFiles();
        DocumentFile lastDocumentFile = savedFiles.get(savedDocument.getFiles().size() - 1);

        asyncService.fileOcr(lastDocumentFile);

        return lastDocumentFile;
    }

}
