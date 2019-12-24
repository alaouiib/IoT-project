package com.emse.rommsproject.controllers;

import com.emse.rommsproject.models.Room;
import com.emse.rommsproject.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@RestController
public class ConsumeWebService {
    @Autowired
    RestTemplate restTemplate;

    @RequestMapping(value = "/api/rooms")
    public String getLights() {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        System.out.println(restTemplate.exchange("http://localhost:8080/api/rooms", HttpMethod.GET, entity, String.class).getBody());
        return restTemplate.exchange("http://localhost:8080/api/rooms", HttpMethod.GET, entity, String.class).getBody();
    }
}