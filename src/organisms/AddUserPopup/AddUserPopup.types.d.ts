export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
}

export interface AddUserPopupProps{
    setToggle:() => void,
    setMessage:(type:STATUS,head:string,message:string)=> void,
    organisation:string,
    changeData:(data:SystemOrganisationDataTableData[])=>void,
    toggle:boolean,
		limit:number,
		page:number
}

export interface SystemOrganisationDataTableResponseObject{
		status:number,
    data:SystemOrganisationDataTableData[],
    message:string,
		totalRecords:number
}
