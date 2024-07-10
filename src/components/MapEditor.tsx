import useMount from "@/hooks/useMount";
import { LeafletMouseEvent } from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

const center = {
  lat: 51.505,
  lng: -0.09,
};

export function DraggableMarker({
  onPositionChange,
}: {
  onPositionChange?: (data: any) => void;
}) {
  const { mounted } = useMount();

  const [position, setPosition] = useState(center);
  const markerRef = useRef<any>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );

  useEffect(() => {
    if (mounted) {
      onPositionChange?.(position);
    }
  }, [position]);

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      {/* <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup> */}
    </Marker>
  );
}

export default function MapEditor({
  className,
  onPositionChange,
}: {
  className?: string;
  onPositionChange: (data: any) => void;
}) {
  const [markers, setMarkers] = useState<any>([]);

  const handleMapClick = (e: any) => {
    const newMarker = {
      id: markers.length + 1,
      latlng: e.latlng,
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    <MapContainer
      className={className}
      center={center}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker onPositionChange={onPositionChange} />
      <ClickHandler handleMapClick={handleMapClick} />
      {markers.map((marker: any) => (
        <Marker key={marker.id} position={marker.latlng}>
          <Popup>
            Marker {marker.id}
            <span className="min-w-28  min-h-28 rounded-md bg-red-500"></span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

const ClickHandler = ({
  handleMapClick,
}: {
  handleMapClick: (e: LeafletMouseEvent) => void;
}) => {
  const {} = useMapEvents({
    click: (e) => {
      handleMapClick(e);
    },
  });

  return null;
};
