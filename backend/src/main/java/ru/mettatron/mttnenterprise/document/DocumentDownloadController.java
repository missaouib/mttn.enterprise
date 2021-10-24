package ru.mettatron.mttnenterprise.document;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

@Controller
@RequestMapping("/documents")
@PreAuthorize("isAuthenticated()")
public class DocumentDownloadController {
    private final ServletContext servletContext;
    private final DocumentConfigProperties properties;

    public DocumentDownloadController(ServletContext servletContext, DocumentConfigProperties properties) {
        this.servletContext = servletContext;
        this.properties = properties;
    }

    @GetMapping("/download")
    public ResponseEntity<InputStreamResource> download(
            @RequestParam(name = "filename") String filename) throws FileNotFoundException {
        MediaType mediaType = MediaType.parseMediaType(servletContext.getMimeType(filename));

        File file = new File(properties.getStorePath() + filename);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                .contentType(mediaType)
                .contentLength(file.length())
                .body(resource);
    }
}
