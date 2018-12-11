import { Time } from "@angular/common";

export interface Event{
    name?: string,
    date?: Date,
    start_time?: Time,
    end_time?: Time
}