
import { Time } from '@angular/common';

export interface SignUp {
    appearance?: string,
    status?: string,
    location?: string,
    appearance_date?: Date,
    appearance_time?: Time,
    first_name?: string,
    last_name?: string,
    description?: string,
    parking_info?: string, 
    spirit_members?: string;
}