export interface SystemUserLandingPageProps{
    setOrganisation:(value:string)=>void;
}

export interface SystemOrganisationDataTableData{
    uniqueName:string,
    displayName:string,
    admin:string,
    maxWfh:number
}