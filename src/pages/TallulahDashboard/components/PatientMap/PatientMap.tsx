// using the Google Maps JS API for a React component
//https://developers.google.com/maps/documentation/javascript/

import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import React from "react";
import { useState } from "react";
import { Coordinates } from "../StoriesMetricCard";
import SAMPLE_DATA from "src/pages/TallulahSearch/sample_search";
import PatientCard from "src/pages/TallulahSearch/components/PatientCard";

export interface IPatientMap {
  locations: Coordinates[];
}

const containerStyle = {
  width: '100%',
  height: '300px'
};

const PatientMap: React.FC<IPatientMap> = ({ locations }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCQBK2nekthzHxf-3ccXwtb6WZ769Cygnw"
  });
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState({ id: 0, address: ""});
  const [patientToDisplay, setPatientToDisplay] = useState<any>(null);

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
    const bounds = new google.maps.LatLngBounds();
    locations?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id: any, lat:number, lng:number, address: string) => {
    map?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setPatientToDisplay(SAMPLE_DATA.find((patient) => patient._source.location === address));
    setIsOpen(true);
  };

  return isLoaded ? (
    <GoogleMap
      onClick={() => setIsOpen(false)}
      mapContainerStyle={containerStyle}
      zoom={3}
      onLoad={onLoad}
    >
      {locations.map(({ address, lat, lng }, ind) => (
            <Marker
              key={ind}
              position={{ lat, lng }}
              onClick={() => {
                handleMarkerClick(ind, lat, lng, address);
              }}
            >
              {isOpen && infoWindowData?.id === ind ? (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <PatientCard data={patientToDisplay} />
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
    </GoogleMap>
  ) : <></>
}

export default PatientMap;