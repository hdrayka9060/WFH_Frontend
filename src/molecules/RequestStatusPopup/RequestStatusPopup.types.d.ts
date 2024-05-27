export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
}

export interface RequestStatusPopupProps{
    setToggle:() => void,
    availedAt: Date,
    createdAt: Date,
    approvalAt: Date,
    requestStatus:string,
		submissionReason:string,
    rejectionReason:string,
    toggle:boolean
}
