package ru.mettatron.mttnenterprise.common;

import com.ibm.icu.text.Transliterator;

import java.io.File;

public class FileUtils {
    private static final String TRANSLIT_ID = "Any-Latin; Latin-ASCII; Lower";

    public static String createUploadFilename(String filename, String path) {
        Transliterator transliterator = Transliterator.getInstance(TRANSLIT_ID);
        String fn = transliterator.transform(filename).replace(' ', '_');

        String[] fileInfo = fn.split("\\.(?=[^\\.]+$)");

        for (int i = 1; true; i++) {
            fn = fileInfo[0] + (i == 1 ? "" : "_" + i) + "." + fileInfo[1];

            if (!new File(path + fn).exists()) {
                break;
            }
        }

        return fn;
    }
}
