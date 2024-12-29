import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [address, setAddress] = useState('');
  const [mapboxToken, setMapboxToken] = useState('');

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 12,
      center: [-74.006, 40.7128], // Default to NYC
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  };

  const searchLocation = async () => {
    if (!address || !mapboxToken) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        map.current?.flyTo({
          center: [lng, lat],
          zoom: 15,
        });

        // Add marker
        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map.current!);

        toast({
          title: "Location found!",
          description: data.features[0].place_name,
        });
      } else {
        toast({
          title: "Location not found",
          description: "Please try a different address",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search location",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Enter Mapbox token"
          value={mapboxToken}
          onChange={(e) => {
            setMapboxToken(e.target.value);
            if (e.target.value && !map.current) {
              initializeMap(e.target.value);
            }
          }}
          className="flex-1"
        />
      </div>
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Enter property address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1"
        />
        <Button onClick={searchLocation}>Search</Button>
      </div>
      <div ref={mapContainer} className="h-[400px] rounded-lg shadow-lg" />
    </div>
  );
};

export default Map;