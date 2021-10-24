package ru.mettatron.mttnenterprise.document;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ru.mettatron.mttnenterprise.common.OcrService;

import java.io.File;

@Service
public class DocumentAsyncService {
    private final DocumentService documentService;
    private final OcrService ocrService;
    private final DocumentConfigProperties properties;

    public DocumentAsyncService(
            DocumentService documentService,
            OcrService ocrService,
            DocumentConfigProperties properties
    ) {
        this.documentService = documentService;
        this.ocrService = ocrService;
        this.properties = properties;
    }

    @Async
    public void fileOcr(DocumentFile documentFile) {
        String result = ocrService.ocr(new File(properties.getStorePath() + documentFile.getName()));

        Document document = documentService.findById(documentFile.getDocument().getId()).get();

        document.getFiles().stream().filter(df ->
                df.getId().equals(documentFile.getId())
        ).findFirst().get().setOcr(result);

        documentService.save(document);
    }
}
