package ru.mettatron.mttnenterprise.document;

import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import ru.mettatron.mttnenterprise.exceptions.FileUploadException;
import ru.mettatron.mttnenterprise.exceptions.ResourceNotFoundException;

import javax.servlet.http.Part;
import java.util.ArrayList;

@Service
@PreAuthorize("isAuthenticated()")
public class DocumentGraphQLMutationResolver implements GraphQLMutationResolver {

    private final DocumentConfigProperties properties;
    private final DocumentService service;

    public DocumentGraphQLMutationResolver(DocumentConfigProperties properties, DocumentService service) {
        this.properties = properties;
        this.service = service;
    }

    public Document createDocument(DocumentInput documentInput) {
        Document document = new Document(
                documentInput.getTitle(),
                documentInput.getDescription(),
                documentInput.getDate(),
                new ArrayList<>()
        );

        return service.save(document);
    }

    public Document updateDocument(Long id, DocumentInput documentInput) {
        Document document = service.findById(id).orElseThrow(() -> new ResourceNotFoundException("Document not found: id - " + id));
        document.setTitle(documentInput.getTitle());
        document.setDescription(documentInput.getDescription());
        document.setDate(documentInput.getDate());

        return service.save(document);
    }

    public boolean removeDocument(Long id) {
        service.deleteById(id);
        return true;
    }

    public DocumentFile uploadDocumentFile(Part part, Long id){
        return service.fileUpload(part, id);
    }

    public boolean removeDocumentFile(Long fileId) {
        service.deleteFileByFileId(fileId);
        return true;
    }

}
