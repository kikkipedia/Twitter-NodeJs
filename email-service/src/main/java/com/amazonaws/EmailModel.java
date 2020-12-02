package com.amazonaws;

public class EmailModel {
    public String to;
    public String subject;
    public String body;

    public EmailModel() {

    }

    public String getTo() {
        return to;
    }

    public String getSubject() {
        return subject;
    }

    public String getBody() {
        return body;
    }

    public String toString() {
        return "Email sent to: " + to + " - With subject: " + subject + " - With body: " + body;
    }
}
