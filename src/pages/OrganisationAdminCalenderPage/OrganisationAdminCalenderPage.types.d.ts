export interface OrganisationAdminCalenderPageProps{
	wfh:number,
	maxWfh:number,
	changeWfh:(value:number)=>void,
	changeMaxWfh:(value:number)=>void
}
