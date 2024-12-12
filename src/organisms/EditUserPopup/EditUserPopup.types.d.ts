export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
}

export interface SystemOrganisationDataTableData{
    firstName:string,
    lastname:string,
    email:string,
    dateOfJoining:Date,
    dateOfBirth:Date,
    wfh:number
}

export interface SystemOrganisationDataTableResponseObject{
		error:string,
		ok:boolean,
    data:SystemOrganisationDataTableData[],
		message:string,
		totalRecords:number
}

export interface EditUserPopupProps{
    setToggle:() => void,
    changeData:(data:SystemOrganisationDataTableData[])=>void,
    toggle:boolean,
    organisation:string|undefined;
    userEmail:string,
    firstName:string,
    lastName:string,
    dateOfBirth:Date,
		page:number,
		limit:number
}
