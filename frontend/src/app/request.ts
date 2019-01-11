import { Time } from "@angular/common";

export interface RequestForm {
        first_name?: string,
        last_name?: string,
        email?: string,
        phone?: string,
        date?: Date,
        start_time?: Time,
        end_time?: Time,
        even_title?: string,
        organization?: string,
        location?: string,
        members?: string,
        special_instruction?: string,
        expenses?: string,
        outside_org?: string,
        description?: string,
        requires_performance?: string,
        on_campus?: boolean
}

