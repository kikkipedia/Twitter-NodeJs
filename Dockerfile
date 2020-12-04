FROM openjdk:11
COPY ./email-service/target/classes/com/amazonaws/* usr/src/email-service/
WORKDIR usr/src/email-service
CMD ["java", "-cp", "EmailService"]