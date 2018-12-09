import { Time } from "@angular/common";

export interface RequestForm {
        firstName?: string,
        lastName?: string,
        email?: string,
        phoneNumber?: string,
        date?: Date,
        startTime?: Time,
        endTime?: Time,
        eventTitle?: string,
        organization?: string,
        location?: string,
        members?: string,
        specialInstruction?: string,
        expenses?: string,
        outsideOrg?: string,
        description?: string,
        requiresPerformance?: string,
        onCampus?: boolean
}

