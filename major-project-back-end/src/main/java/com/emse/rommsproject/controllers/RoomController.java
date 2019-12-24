package com.emse.rommsproject.controllers;


import com.emse.rommsproject.models.Room;
import com.emse.rommsproject.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
//@CrossOrigin
@RestController
public class RoomController {

    @Autowired
    private RoomService roomService;
    @GetMapping("/api/rooms")
    public List getAllRooms()
    {
        return roomService.getAllRooms();
    }

    @GetMapping("/api/rooms/{roomId}")
    public Room getRoom(@PathVariable String roomId){

//        executePost("http://localhost:8080/api/rooms", "");
        return roomService.getRoom(roomId);
    }

    @PostMapping("/api/rooms")
    public void addRoom(@RequestBody Room room) {
        roomService.addRoom(room);
    }

    @PutMapping("/api/rooms/{roomId}")
    public void updateRoom(@PathVariable String roomId, @RequestBody Room room) {
//        try {
//            System.out.println("POST");
////            sendGET();
//            //TODO: change json file to POST and test before sending..
////            sendPOST();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        roomService.updateRoom(roomId, room);
    }

    @DeleteMapping("/api/rooms/{roomId}")
    public void deleteRoom(@PathVariable String roomId) {
        roomService.deleteRoom(roomId);
    }

    private static void sendGET() throws IOException {
        URL obj = new URL("https://jsonplaceholder.typicode.com/todos/1");
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("GET");
//        con.setRequestProperty("User-Agent", "Mozilla/5.0");
        int responseCode = con.getResponseCode();
        System.out.println("GET Response Code :: " + responseCode);
        if (responseCode == HttpURLConnection.HTTP_OK) { // success
            System.out.println("succeess");
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // print result
            System.out.println(response.toString());
        } else {
            System.out.println("GET request not worked");
        }

    }
    private static void sendPOST() throws IOException {
        String POST_PARAMS = "{" +
                "title: 'foo'," +
                "body: 'xx'," +
                "userId: 2" +
                "}";
        URL obj = new URL("https://jsonplaceholder.typicode.com/posts");
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("POST");

      con.setRequestProperty("Content-type", "application/json; charset=UTF-8");

        // For POST only - START
        con.setDoOutput(true);
        OutputStream os = con.getOutputStream();
        os.write(POST_PARAMS.getBytes());
        os.flush();
        os.close();
        // For POST only - END

        int responseCode = con.getResponseCode();
        System.out.println("POST Response Code :: " + responseCode);

        if (responseCode == HttpURLConnection.HTTP_OK || responseCode == HttpURLConnection.HTTP_CREATED) { //success
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // print result
            System.out.println(response.toString());
        } else {
            System.out.println("POST request not worked");
        }
    }
//    public static String executePost(String targetURL, String urlParameters) {
//        HttpURLConnection connection = null;
//
//        try {
//            //Create connection
//            URL url = new URL(targetURL);
//            connection = (HttpURLConnection) url.openConnection();
//            connection.setRequestMethod("GET");
////            connection.setRequestProperty("Content-Type",
////                    "application/x-www-form-urlencoded");
////
////            connection.setRequestProperty("Content-Length",
////                    Integer.toString(urlParameters.getBytes().length));
////            connection.setRequestProperty("Content-Language", "en-US");
//
//            connection.setUseCaches(false);
//            connection.setDoOutput(true);
//
//            //Send request
//            DataOutputStream wr = new DataOutputStream (
//                    connection.getOutputStream());
//            wr.writeBytes(urlParameters);
//            wr.close();
//
//            //Get Response
//            InputStream is = connection.getInputStream();
//            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
//            StringBuilder response = new StringBuilder(); // or StringBuffer if Java version 5+
//            String line;
//            while ((line = rd.readLine()) != null) {
//                response.append(line);
//                response.append('\r');
//            }
//            System.out.println("HAAK RESPONSE: ");
//            System.out.println(response);
//            rd.close();
//            return response.toString();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        } finally {
//            if (connection != null) {
//                connection.disconnect();
//            }
//        }
//    }
}
