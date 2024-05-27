export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
}

export interface RequestRejectionPopupProps{
    setToggle:() => void,
    availedAt:Date,
    userEmail:string,
    changeData:(data:SystemOrganisationDataTableData[])=>void,
    toggle:boolean,
		page:number,
		limit:number,
		wfh:number,
}

export interface SystemOrganisationDataTableResponseObject{
		error:string,
		ok:boolean,
    data:SystemOrganisationDataTableData[],
    message:string,
		totalRecords:number
}
