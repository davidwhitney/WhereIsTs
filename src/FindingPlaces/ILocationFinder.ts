import { Loc } from "./Location";

export interface ILocationFinder {
    Find(location: string): Loc;
}