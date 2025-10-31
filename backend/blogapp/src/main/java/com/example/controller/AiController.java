//package com.example.controller;
//
//import java.util.Map;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import lombok.RequiredArgsConstructor;
//
//import com.example.service.AiService;
//
//@RestController
//@RequestMapping("/api/ai")
//@RequiredArgsConstructor
//public class AiController {
//
//    private final AiService aiService;
//
//    @PostMapping("/generate")
//    public ResponseEntity<Map<String, String>> generate(@RequestBody Map<String, String> body) {
//        String prompt = body.get("prompt");
//        if (prompt == null || prompt.isBlank()) {
//            return ResponseEntity.badRequest().body(Map.of("error", "prompt is required"));
//        }
//        String result = aiService.generateResponse(prompt);
//        return ResponseEntity.ok(Map.of("result", result));
//    }
//}
