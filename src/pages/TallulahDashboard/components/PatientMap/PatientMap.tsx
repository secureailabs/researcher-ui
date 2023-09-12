// using the Google Maps JS API for a React component
//https://developers.google.com/maps/documentation/javascript/

import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

export interface IPatientMap {
  locations: any[];
}

const PatientMap: React.FC<IPatientMap> = ({locations}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCQBK2nekthzHxf-3ccXwtb6WZ769Cygnw',
  });
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

export default PatientMap;