FROM dmitryas/public:alpine-adoptopenjdk12-tesseract
EXPOSE 8080
ARG DATA_DIR=/var/lib/spring-app/data
ARG JAR_FILE=build/libs/*.jar
RUN addgroup -S spring && adduser -S spring -G spring
RUN mkdir -p ${DATA_DIR}
RUN chown spring:spring ${DATA_DIR}
USER spring:spring
COPY ${JAR_FILE} spring-app.jar
ENTRYPOINT ["java", "-jar", "/spring-app.jar"]