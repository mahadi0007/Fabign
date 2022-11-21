import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useState, useEffect, useCallback } from "react";

export const GMap = () => {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const fetchData = useCallback(async () => {
    navigator.geolocation.watchPosition((position) => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.longitude);
    });
  }, []);

  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  const location = {
    lat: latitude,
    lng: longitude,
  };

  useEffect(() => {
    fetchData();
  }, [longitude, latitude]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyD5bOYdxZ6FlIK1zjQEmwVXJrDCtbzubbw">
      <GoogleMap mapContainerStyle={containerStyle} center={location}>
        <></>
      </GoogleMap>
    </LoadScript>
  );
};
