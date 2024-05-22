export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
}

export interface RequestSubmissionPopupProps{
    setToggle:() => void,
    setMessage:(type:STATUS,head:string,message:string)=> void
    availedAt:Date,
    changeCalanderData:(data:CalendarData[])=>void,
    toggle:boolean,
    wfh:number,
    maxWfh:number
}