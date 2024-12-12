export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
    type ToggleWhat='addUser' | 'createOrganisation' |'nothing';
}

export interface PageHeaderProps{
    pageHeading:string | undefined,
    addButtonText:string,
    toggleWhat:ToggleWhat,
    addbutton:boolean,
    organisation:string,
    changeData:(data:SystemOrganisationDataTableData[])=>void,
    changeIsFilterPending:(value:boolean)=>void,
		limit:number,
		page:number,
		setLimit:(num:number)=>void,
		setPage:(num:number)=>void
}
