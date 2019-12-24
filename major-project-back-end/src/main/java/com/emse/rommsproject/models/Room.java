package com.emse.rommsproject.models;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Room {

    @Id
    private String id = "";
    private int lightLevel = 0;
//    private int noiseLevel = 0;
    private String lightStatus = "";
//    private String noiseStatus = "";

    public Room() {
    }

    public Room(String id, int lightLevel, String lightStatus) {
        this.id = id;
        this.lightLevel = lightLevel;
//        this.noiseLevel = noiseLevel;
        this.lightStatus = lightStatus;
//        this.noiseStatus = noiseStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getLightLevel() {
        return lightLevel;
    }

    public void setLightLevel(int lightLevel) {
        this.lightLevel = lightLevel;
    }

//    public int getNoiseLevel() {
//        return noiseLevel;
//    }

//    public void setNoiseLevel(int noiseLevel) {
//        this.noiseLevel = noiseLevel;
//    }

    public String getLightStatus() {
        return lightStatus;
    }

    public void setLightStatus(String lightStatus) {
        this.lightStatus = lightStatus;
    }

//    public String getNoiseStatus() {
//        return noiseStatus;
//    }

//    public void setNoiseStatus(String noiseStatus) {
//        this.noiseStatus = noiseStatus;
//    }
}
