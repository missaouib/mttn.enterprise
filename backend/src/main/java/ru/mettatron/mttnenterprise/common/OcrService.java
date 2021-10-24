package ru.mettatron.mttnenterprise.common;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.Tesseract1;
import net.sourceforge.tess4j.TesseractException;
import net.sourceforge.tess4j.util.LoadLibs;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class OcrService {
    private static final String RESOURCE_NAME = "tessdata";
    private final File dataFolder;

    public OcrService() {
        this.dataFolder = LoadLibs.extractTessResources(RESOURCE_NAME);
    }

    public String ocr(File file) {
       ITesseract tesseract = new Tesseract1();
       tesseract.setDatapath(this.dataFolder.getPath());
       tesseract.setLanguage("rus+eng");

        try {
            return tesseract.doOCR(file);
        } catch (TesseractException e) {
            throw new RuntimeException(e);
        }
    }
}
