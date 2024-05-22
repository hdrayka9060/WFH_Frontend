export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
}

export interface RequestStatusPopupProps{
    setToggle:() => void,
    setMessage:(type:STATUS,head:string,message:string)=> void,
    availedAt: Date,
    createdAt: Date,
    approvalAt: Date,
    requestStatus:string,
    rejectionReason:string,
    toggle:boolean
}