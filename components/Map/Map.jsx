import React, { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, Circle, useMapEvents, Polyline } from 'react-leaflet'
import './Map.module.scss'
import Script from 'next/script';
import "leaflet/dist/leaflet.css";
import L, { Icon, map } from 'leaflet'
import { useRef } from 'react';
import { getCircleRanges, getRange } from '../../redux/reducers/RangoReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';



const Map = ({latitude,longitude, nameBusiness, radius, UserUbication}) => {

    console.log(UserUbication, 'Mapa tu longitus');
    console.log(latitude);
    console.log(longitude);
    const dispatch = useDispatch()
    const circleRef = useRef(false)
    const MarkRef = useRef(false)

    const eventHandlers = useMemo(
      (e) => ({
        click() {
          console.log(e);
        },
      }),
      [],
    )
    
    useEffect(()=>{ 
      if(circleRef.current._latlng && MarkRef.current._latlng){
       dispatch(getRange((circleRef.current._latlng).distanceTo(MarkRef.current._latlng) < (circleRef.current._mRadius)))
       dispatch(getCircleRanges({circle_radius:circleRef.current._mRadius , circle_latlng: circleRef.current._latlng }))
      }
    },[UserUbication])
    
    useEffect(()=>{ 
      if(circleRef.current){
       dispatch(getCircleRanges({circle_radius:circleRef.current._mRadius , circle_latlng: circleRef.current._latlng }))
      }
    },[circleRef]) 
    console.log(circleRef);
  return (
    <div className='map_leaf_container'>
    <MapContainer center={[latitude, longitude]} zoom={17} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Circle 
    center={[latitude, longitude]} 
    radius={radius}  
    pathOptions={{ color: '#FF0D4A' }}
    eventHandlers={eventHandlers}
    ref={circleRef}
    />
    {
      // [-12.1583405, -76.9885873]
      UserUbication.latitude && UserUbication.longitude &&
      <Marker  ref={MarkRef} position={[ UserUbication.latitude , UserUbication.longitude]} icon={new Icon({iconUrl:'https://raw.githubusercontent.com/FaztWeb/react-leaflet-example/871b975703dec0ccd30ac56c96016af69cf7f0c0/src/assets/venue_location_icon.svg', iconSize: [50, 41], iconAnchor: [12, 41] , popupAnchor:[0,-39],})}>
    <Popup>
        Your ubication
    </Popup>
    </Marker>
    }

    <Marker 
    position={[latitude, longitude]} 
    icon={new Icon({iconUrl:'https://raw.githubusercontent.com/FaztWeb/react-leaflet-example/871b975703dec0ccd30ac56c96016af69cf7f0c0/src/assets/venue_location_icon.svg', iconSize: [50, 41], iconAnchor: [12, 41] , popupAnchor:[0,-39],})}>
    <Popup>
        {nameBusiness}
    </Popup>
    </Marker>
    {
      UserUbication.latitude && UserUbication.longitude &&
      <Polyline pathOptions={{ color: '#ff0d4a' }} positions={[ [latitude, longitude] , [UserUbication.latitude, UserUbication.longitude]]} />
    }
  </MapContainer>
    <style jsx>
        {
            `
            .map_leaf_container{
                height:300px;
                margin: 20px 0px;
            }
            `
        }
    </style>
    
    <Script src="js/main.js"/>
    <Script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"/>
    </div>
    
  )
}

export default Map