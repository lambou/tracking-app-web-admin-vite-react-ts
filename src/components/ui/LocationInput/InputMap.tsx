import { cn } from '@/lib/utils'
import { LeafletMouseEvent } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import Button from '../Button'
import { MapPin } from 'lucide-react'

export default function InputMap({
    className,
    onPositionChange,
    onClose,
}: {
    className?: string
    onPositionChange: (data: any) => void
    onClose?: () => void
}) {
    const [marker, setMarker] = useState<{ lat: number; lng: number }>()
    const [currentPosition, setCurrentPosition] = useState<
        { lat: number; lng: number } | undefined
    >()

    const handleMapClick = (e: LeafletMouseEvent) => {
        setMarker(e.latlng)
    }

    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude
            let lng = position.coords.longitude

            // update local state
            setCurrentPosition({ lat, lng })
        })
    }

    useEffect(() => {
        onPositionChange?.(marker)
    }, [marker])

    useEffect(() => {
        getCurrentPosition()
    }, [])

    return (
        <div className="fixed inset-0 bg-black/35 flex flex-col items-center justify-center">
            <div
                className={cn(
                    'max-w-3xl w-full bg-white rounded-xl flex flex-col gap-6 p-6',
                    className
                )}
            >
                <h1 className="text-xl font-bold capitalize">
                    Click to pick a location
                </h1>
                {currentPosition ? (
                    <MapContainer
                        className="min-w-full min-h-[320px]"
                        center={currentPosition}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <ClickHandler handleMapClick={handleMapClick} />
                        {marker && <Marker position={marker}></Marker>}
                    </MapContainer>
                ) : (
                    <div className="min-w-full min-h-[320px] bg-gray-100 flex items-center justify-center">
                        <span
                            className="text-gray-500 text-base inline-flex items-center justify-center gap-2"
                            onClick={() => getCurrentPosition()}
                        >
                            <MapPin size={24} />
                            <span>Activate your geolocation</span>
                        </span>
                    </div>
                )}
                <div className="flex items-center justify-center">
                    <Button variant="dark" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    )
}

const ClickHandler = ({
    handleMapClick,
}: {
    handleMapClick: (e: LeafletMouseEvent) => void
}) => {
    const {} = useMapEvents({
        click: (e) => {
            handleMapClick(e)
        },
    })

    return null
}
