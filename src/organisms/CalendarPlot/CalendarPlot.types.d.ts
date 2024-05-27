export interface CalenderPlotProps{
	changeWfh:(value:number)=>void,
	changeMaxWfh:(value:number)=>void,
	wfh:number,
	maxWfh:number
}

export interface CalendarData{
    availedAt: Date,
    createdAt: Date,
    approvalAt: Date,
    requestStatus:string,
		wfhReason:string,
    rejectionReason:string
}
