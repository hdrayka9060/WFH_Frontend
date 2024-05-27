
export interface AddUserPopupProps{
    setToggle:() => void,
    organisation:string,
    changeData:(data:SystemOrganisationDataTableData[])=>void,
    toggle:boolean,
		limit:number,
		page:number
}

export interface SystemOrganisationDataTableResponseObject{
		error:string,
		ok:boolean,
    data:SystemOrganisationDataTableData[],
    message:string,
		totalRecords:number
}
