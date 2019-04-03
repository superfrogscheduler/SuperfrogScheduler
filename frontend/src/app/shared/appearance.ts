import { Time } from "@angular/common";
import { Moment } from "moment";

export interface Appearance{
    id?: string,
    name?: string,
    date?: string,
    start_time?: string,
    end_time?: string,
    organization?: string,
    location?: string,
    parking_info?: string,
    org_type?: string,
    cheerleaders?: string,
    showgirls?: string,
    performance_required?: boolean,
    special_instructions?: string,
    expenses?: string,
    outside_orgs?: boolean,
    description?: string,
    status?: string, 
    mileage?: string,
    cost?: string,
    receipt_number?: string,
}