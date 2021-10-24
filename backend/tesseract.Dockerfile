FROM adoptopenjdk/openjdk12:alpine
USER root
RUN apk add icu-libs=69.1-r0 --repository http://dl-cdn.alpinelinux.org/alpine/edge/main && \
    apk add tesseract-ocr=4.1.1-r6 --repository http://dl-cdn.alpinelinux.org/alpine/edge/community && \
    apk add ghostscript=9.54.0-r1 --repository http://dl-cdn.alpinelinux.org/alpine/edge/main