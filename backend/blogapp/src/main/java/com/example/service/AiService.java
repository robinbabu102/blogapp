//package com.example.service;
//
//import java.util.HashMap;
//import java.util.Map;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//@Service
//public class AiService {
//
//    private static final String MODEL_URL = "https://api-inference.huggingface.co/models/gpt2";
//
//    @Value("${api key}")
//    private String apiKey;
//
//    public String generateResponse(String prompt) {
//        try {
//            RestTemplate restTemplate = new RestTemplate();
//
//            Map<String, String> body = new HashMap<>();
//            body.put("inputs", prompt);
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            headers.set("Authorization", "Bearer " + apiKey);
//
//            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
//            ResponseEntity<String> response = restTemplate.postForEntity(MODEL_URL, request, String.class);
//
//            if (response.getStatusCode().is2xxSuccessful()) {
//                return response.getBody();
//            } else {
//                return "Error: " + response.getStatusCode() + " " + response.getBody();
//            }
//
//        } catch (Exception e) {
//            return "Error: " + e.getMessage();
//        }
//    }
//}
