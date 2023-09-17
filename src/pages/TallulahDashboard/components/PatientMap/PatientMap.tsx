// using the Google Maps JS API for a React component
//https://developers.google.com/maps/documentation/javascript/

import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";
import { useCallback, useMemo, useState } from "react";
import { Coordinates } from "../../TallulahDashboard";

export interface IPatientMap {
  locations: Coordinates[];
}

const containerStyle = {
  width: '700px',
  height: '500px'
};

const center = {
  lat: 22,
  lng: 3
};

const PatientMap: React.FC<IPatientMap> = ({ locations }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCQBK2nekthzHxf-3ccXwtb6WZ769Cygnw"
  });

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locations.map(({ key, lat, lng }) => (
        <Marker key={key} position={{ lat, lng }} />
      ))}
      <></>
    </GoogleMap>
  ) : <></>
}

/*

const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

return (
  <div className="Map">
    {!isLoaded ? (
      <h1>Loading...</h1>
    ) : (
      <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        zoom={10}
      >
        <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
      </GoogleMap>
      
    )}
  </div>
);
};
*/

export default PatientMap;