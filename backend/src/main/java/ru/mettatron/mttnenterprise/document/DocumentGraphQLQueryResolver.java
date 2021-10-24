package ru.mettatron.mttnenterprise.document;

import graphql.kickstart.tools.GraphQLQueryResolver;
import org.hibernate.Hibernate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mettatron.mttnenterprise.exceptions.ResourceNotFoundException;

@Service
@PreAuthorize("isAuthenticated()")
public class DocumentGraphQLQueryResolver implements GraphQLQueryResolver {

    private final DocumentService service;

    public DocumentGraphQLQueryResolver(DocumentService service) {
        this.service = service;
    }

    @Transactional
    public Page<Document> documents(int offset, int limit, String sort, String search) {
        if (search != null) {
            return service.findByFilter(PageRequest.of(offset, limit, Sort.by(Sort.Direction.DESC, sort)), search);
        }
        return service.findAll(PageRequest.of(offset, limit, Sort.by(Sort.Direction.DESC, sort)));
    }

    @Transactional
    public Document document(Long id) {
        Document document = service.findById(id).orElseThrow(() -> new ResourceNotFoundException("Document with id \"" + id + "\" + not found"));
        Hibernate.initialize(document.getFiles());

        return document;
    }
}
