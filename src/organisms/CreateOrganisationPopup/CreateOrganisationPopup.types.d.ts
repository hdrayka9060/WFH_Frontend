export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
}

export interface CreateOrganisationPopupProps{
    setToggle:() => void,
    setMessage:(type:STATUS,head:string,message:string)=> void,
    changeData:(data:SystemOrganisationDataTableData[])=>void,
    toggle:boolean,
		limit:number,
		page:number
}

export interface SystemOrganisationDataTableData{
    uniqueName:string,
    displayName:string,
    admin:string,
    maxWfh:number
}

export interface SystemOrganisationDataTableResponseObject{
    status:number,
    data:SystemOrganisationDataTableData[],
    message:string,
		totalRecords:number
}
