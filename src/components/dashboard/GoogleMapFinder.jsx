import React, { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const googleMapsApiKey = "AIzaSyCHh3AeoMZirOnz9TTYCJ4q5e4P8D4vdr8"; // Ensure this is valid

const GoogleMapFinder = ({ lattitude, longitude }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const defaultCenter = { lat: 40.7128, lng: -74.006 }; // Default location (New York)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapRef.current) {
            mapRef.current.setCenter({ lat: latitude, lng: longitude });
          }
        },
        () => {
          console.warn(
            "Geolocation permission denied. Using default location."
          );
        }
      );
    }
  }, []);

  useEffect(() => {
    if (isLoaded && !mapRef.current) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: defaultCenter,
        zoom: 13,
        mapTypeId: "roadmap",
      });
      mapRef.current = map;
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const newCenter = {
        lat: lattitude || defaultCenter.lat,
        lng: longitude || defaultCenter.lng,
      };
      mapRef.current.setCenter(newCenter);

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new window.google.maps.Marker({
        position: newCenter,
        map: mapRef.current,
        title: "Current Location",
      });
    }
  }, [isLoaded, lattitude, longitude]);

  return isLoaded ? (
    <div id="map" style={{ width: "100%", height: "300px" }}></div>
  ) : (
    <div>Loading map...</div>
  );
};

export default GoogleMapFinder;
