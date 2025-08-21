package com.endava.jobsnap.utility;

import java.security.SecureRandom;

public class Utilities {

    // Private constructor to prevent instantiation
    private Utilities() {
        // This constructor is intentionally left empty
    }

    public static String generateOTP() {
        StringBuilder otp = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < 6; i++) otp.append(random.nextInt(10));
        return otp.toString();
    }
}
