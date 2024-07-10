import useMount from "@/hooks/useMount";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { forwardRef, Fragment, useEffect, useId, useState } from "react";
import InputMap from "./InputMap";

type LocationInputData = {
  lat: number;
  lng: number;
};

export type LocationInputDataProps = {
  className?: string;
  id?: string;
  name?: string;
  value?: LocationInputData;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange?: (data?: LocationInputData) => void;
};

const LocationInput = forwardRef<HTMLDivElement, LocationInputDataProps>(
  ({ className, id, name, value, onBlur, onChange }, ref) => {
    const { mounted } = useMount();
    const [mapVisible, setMapVisible] = useState<boolean>(false);

    const [location, setLocation] = useState<LocationInputData | undefined>(
      value,
    );

    const innerId = useId();

    const openInputMap = () => setMapVisible(true);

    useEffect(() => {
      if (mounted) {
        onChange?.(location);
      }
    }, [location]);

    return (
      <Fragment>
        {mapVisible && (
          <InputMap
            onPositionChange={(data) => setLocation(data)}
            onClose={() => setMapVisible(false)}
          />
        )}
        <div
          ref={ref}
          id={id ?? innerId}
          className={cn(
            "inline-flex items-stretch justify-center border rounded shadow",
            className,
          )}
        >
          <input
            className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            type="text"
            name={`${name ?? innerId}.lat`}
            onBlur={onBlur}
            value={location?.lat ?? ""}
            placeholder="Latitude"
            readOnly
            onClick={openInputMap}
          />
          <span className="min-h-full border-l"></span>
          <input
            className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            type="text"
            name={`${name ?? innerId}.lng`}
            onBlur={onBlur}
            value={location?.lng ?? ""}
            placeholder="Longitude"
            readOnly
            onClick={openInputMap}
          />
          <span
            className="min-h-7 min-w-7 rounded-md bg-green-50 inline-flex items-center justify-center cursor-pointer"
            onClick={openInputMap}
          >
            <MapPin size={16} className="text-green-500" />
          </span>
        </div>
      </Fragment>
    );
  },
);

LocationInput.displayName = "Input";

export default LocationInput;
