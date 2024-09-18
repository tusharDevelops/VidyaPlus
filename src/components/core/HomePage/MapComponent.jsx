import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Set the Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2dGVzdGE5MjExIiwiYSI6ImNsejJ0ZzgwODNleGcya3FsNDBqcTkxZnAifQ.Qiu-zL4G1SsUYxBrWngiGw';

    // Initialize the map only if it has not been initialized
    if (mapRef.current) return; // Skip initialization if already set

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10', // Dark mode style
      center: [80.8701056753622, 24.587988778108127], // starting position [lng, lat]
      zoom: 12 // starting zoom
    });

    // Clean up the map on component unmount
    return () => mapRef.current?.remove();
  }, []); // Empty dependency array means this effect runs only once

  return (
    <div
      style={{ height: '100vh', width: '100%' }} // Ensure the map container takes full viewport height
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default MapComponent;
