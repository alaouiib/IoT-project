package com.emse.rommsproject.repositories;

import com.emse.rommsproject.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

@RepositoryRestController
public interface RoomRepository extends JpaRepository<Room, String> {
}
