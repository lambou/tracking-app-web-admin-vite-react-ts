import { cn } from "@/lib/utils";
import { LeafletMouseEvent } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import Button from "../Button";

const center = {
  lat: 51.505,
  lng: -0.09,
};

export default function InputMap({
  className,
  onPositionChange,
  onClose,
}: {
  className?: string;
  onPositionChange: (data: any) => void;
  onClose?: () => void;
}) {
  const [marker, setMarker] = useState<{ lat: number; lng: number }>();

  const handleMapClick = (e: LeafletMouseEvent) => {
    setMarker(e.latlng);
  };

  useEffect(() => {
    onPositionChange?.(marker);
  }, [marker]);

  return (
    <div className="fixed inset-0 bg-black/35 flex flex-col items-center justify-center">
      <div
        className={cn(
          "max-w-3xl w-full bg-white rounded-xl flex flex-col gap-6 p-6",
          className,
        )}
      >
        <h1 className="text-xl font-bold capitalize">
          Click to pick a location
        </h1>
        <MapContainer
          className="min-w-full min-h-[320px]"
          center={center}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler handleMapClick={handleMapClick} />
          {marker && (
            <Marker position={marker}>
              {/* <Popup>
            Marker {marker.id}
            <span className="min-w-28  min-h-28 rounded-md bg-red-500"></span>
          </Popup> */}
            </Marker>
          )}
        </MapContainer>
        <div className="flex items-center justify-center">
          <Button variant="dark" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
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
