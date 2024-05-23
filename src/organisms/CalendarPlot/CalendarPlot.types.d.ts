export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
}

export interface CalenderPlotProps{

}

export interface CalendarData{
    availedAt: Date,
    createdAt: Date,
    approvalAt: Date,
    requestStatus:string,
		wfhReason:string,
    rejectionReason:string
}
