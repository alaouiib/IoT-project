package com.emse.rommsproject.services;


import com.emse.rommsproject.models.Room;
import com.emse.rommsproject.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List getAllRooms() {
        List rooms = new ArrayList<>();
        roomRepository.findAll().forEach(rooms::add);
        return rooms;
    }

    public Room getRoom(String id) {
        return roomRepository.findById(id).orElseGet(Room::new);
    }

    public void addRoom(Room room) {
        roomRepository.save(room);
    }

    public void updateRoom(String id, Room room) {
        roomRepository.save(room);
    }

    public void deleteRoom(String id) {
        roomRepository.deleteById(id);
    }
}
