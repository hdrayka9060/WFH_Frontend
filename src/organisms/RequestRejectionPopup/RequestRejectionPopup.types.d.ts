export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
}

export interface RequestRejectionPopupProps{
    setToggle:() => void,
    setMessage:(type:STATUS,head:string,message:string)=> void,
    availedAt:Date,
    userEmail:string,
    changeData:(data:SystemOrganisationDataTableData[])=>void,
    toggle:boolean,
		page:number,
		limit:number
}

export interface SystemOrganisationDataTableResponseObject{
    status:number,
    data:SystemOrganisationDataTableData[],
    message:string,
		totalRecords:number
}
