package ru.mettatron.mttnenterprise.common;

public class LoadedFile {
    protected String name;
    protected String mimetype;
    protected Long size;

    public LoadedFile(String name, String mimetype, Long size) {
        this.name = name;
        this.mimetype = mimetype;
        this.size = size;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMimetype() {
        return mimetype;
    }

    public void setMimetype(String mimetype) {
        this.mimetype = mimetype;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }
}
