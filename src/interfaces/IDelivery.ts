import IPackage from "./IPackage";

export default interface IDelivery {
    _id: string;
    package: IPackage;
    pickup_time?: Date;
    start_time?: Date;
    end_time?: Date;
    location: {
        lat: string;
        lng: string;
    },
    status: "open" | "picked-up" | "in-transit" |
    "delivered" | "failed"
}