package com.amazonaws;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.Body;
import com.amazonaws.services.simpleemail.model.Content;
import com.amazonaws.services.simpleemail.model.Destination;
import com.amazonaws.services.simpleemail.model.SendEmailRequest;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.DeleteMessageRequest;
import com.amazonaws.services.sqs.model.Message;
import com.amazonaws.services.sqs.model.ReceiveMessageRequest;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class EmailService {

    public EmailService() {
        System.out.println("Running EmailService, recieving from SQS");
        sendEmails(fetchMessagesFromQueue());
    }

    private ProfileCredentialsProvider getCredentials() {
    	ProfileCredentialsProvider credentialsProvider = new ProfileCredentialsProvider();
    	try {
    		credentialsProvider.getCredentials();
    	} catch (Exception e) {
    		throw new AmazonClientException("Cannot load the credentials", e);
    	}
    	return credentialsProvider;
    }
    
    private List<EmailModel> fetchMessagesFromQueue() {
    	List<EmailModel> emails = new LinkedList<>();
    	String emailQueueUrl = "https://sqs.eu-north-1.amazonaws.com/951445330328/emailQueue2";
    	ObjectMapper objectMapper = new ObjectMapper();
    	AmazonSQS sqs = AmazonSQSClientBuilder.standard()
    			.withCredentials(getCredentials())
    			.withRegion(Regions.EU_CENTRAL_1)
    			.build();
    	try {
            ReceiveMessageRequest receiveMessageRequest = new ReceiveMessageRequest(emailQueueUrl);
            for (Message message: sqs.receiveMessage(receiveMessageRequest).getMessages()) {
                EmailModel email = objectMapper.readValue(message.getBody(), EmailModel.class);
                System.out.println("Adding email " + email + " to processing");
                emails.add(email);
                sqs.deleteMessage(new DeleteMessageRequest(emailQueueUrl, message.getReceiptHandle()));
            }
        } catch (AmazonServiceException ase) {
            System.err.println("Error caught when trying to fetch elements from SQS: " + ase.getMessage());
        } catch (AmazonClientException ace) {
            System.err.println("Error caught when trying to connect to SQS: "  + ace.getMessage());
        } catch (JsonParseException e) {
            System.err.println("Could not parse JSON: "  + e.getMessage());
        } catch (JsonMappingException e) {
            System.err.println("Could not map JSON to an EmailModel: "  + e.getMessage());
        } catch (IOException e) {
            System.err.println("Could not read input: "  + e.getMessage());
        }
        return emails;
    }
    private void sendEmails(List<EmailModel> emails) {
        AmazonSimpleEmailService ses = AmazonSimpleEmailServiceClientBuilder.standard()
                .withCredentials(getCredentials())
                .withRegion(Regions.EU_CENTRAL_1)
                .build();
        for(EmailModel email: emails) {
            SendEmailRequest request = new SendEmailRequest()
                    .withDestination(
                            new Destination().withToAddresses(email.getTo()))
                    .withMessage(
                            new com.amazonaws.services.simpleemail.model.Message()
                                    .withBody(new Body().withText(new Content().withCharset("UTF-8").withData(email.getBody())))
                                    .withSubject(new Content().withCharset("UTF-8").withData(email.getSubject())))
                    .withSource("kristinakerlund@gmail.com");
            ses.sendEmail(request);
            System.out.println("Email sent: " + email);
        }
    }
}