import { Time } from "@angular/common";

export interface Appearance{
    name?: string,
    date?: Date,
    start_time?: Time,
    end_time?: Time,
    organization?: string,
    location?: string,
    parking_info?: string,
    org_type?: string,
    team_type?: string,
    performance_required?: boolean,
    special_instruction?: string,
    expenses?: string,
    outside_orgs?: boolean,
    description?: string,
    status?: string
}