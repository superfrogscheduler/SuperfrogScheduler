export class Request {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phoneNumber: string,
        public date: string,
        public startTime: string,
        public endTime: string,
        public eventTitle: string,
        public organization: string,
        public location: string,
        public members: string,
        public specialInstruction: string,
        public expenses: string,
        public outsideOrg: string,
        public description: string,
        public requiresPerformance: string,
        public onCampus: boolean
    ) { }
}
