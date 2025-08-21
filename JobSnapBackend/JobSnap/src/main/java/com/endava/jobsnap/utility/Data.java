package com.endava.jobsnap.utility;


import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import org.springframework.core.io.ClassPathResource;

public class Data {
	private Data() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }
		public static String getMessageBody(String otp, String userName) throws IOException {
			String template = getMailData();
			return template.replace( "${userName}", userName).replace("${otp}", otp);
			

		}
		 
		private static String getMailData() throws IOException {
			ClassPathResource resource = new ClassPathResource("templates/OTPTemplate.html");

			return Files.readString(resource.getFile().toPath(), StandardCharsets.UTF_8);
			
		}
	}