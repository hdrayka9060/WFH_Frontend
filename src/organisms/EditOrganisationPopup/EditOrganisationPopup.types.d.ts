export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
}

export interface SystemOrganisationDataTableData{
    uniqueName:string,
    displayName:string,
    admin:string,
    maxWfh:number
}

export interface SystemOrganisationDataTableResponseObject{
		error:string,
		ok:boolean,
    data:SystemOrganisationDataTableData[],
    message:string,
		totalRecords:number
}

export interface EditOrganisationPopupProps{
    setToggle:() => void,
    organisationUniqueName:string,
    organisationDisplayName:string,
    organisationAdmin:string,
    organisationMaxWfh:number,
    changeData:(data:SystemOrganisationDataTableData[])=>void,
    email:string|undefined,
    toggle:boolean,
		limit:number,
		page:number
}
