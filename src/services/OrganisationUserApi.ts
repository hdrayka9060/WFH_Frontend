import axios from 'axios';
import { AcceptRejectDeleteResponse, CalendarResponse, AdminRequestsListTableResponseObject,GetUsersResponse,GetUserWfhResponse } from '../typings/ApisTypings';


// Admin requests
export const adminRequests = async (page:number,limit:number,token:string|undefined): Promise<AdminRequestsListTableResponseObject> => {
    let response = await axios.post('http://localhost:8080/admin/requestlist',{page:page,limit:limit},{headers:{Authorization:`bearer ${token}`}})
		return response.data;
}

// Get Users List
export const getUsers = async (token:string|undefined): Promise<GetUsersResponse> => {
    let response = await axios.get('http://localhost:8080/admin/userslist',{headers:{Authorization:`bearer ${token}`}})
    return response.data;
}

// Admin filter requests
export const adminFilterRequests = async (filterType:string|null,requestStatus:string|null,user:string,date:Date|null|undefined,page:number,limit:number,token:string|undefined): Promise<AdminRequestsListTableResponseObject> => {
    let response = await axios.post('http://localhost:8080/admin/filter-requestlist', {filterType,requestStatus,user,date,page,limit },{headers:{Authorization:`bearer ${token}`}})
    return response.data;
}

// Admin reject requests
export const adminRejectRequest = async (organisationUserEmail: string | undefined, availedAt: Date | undefined, requestRejectionReason: string | undefined,token:string|undefined): Promise<AcceptRejectDeleteResponse> => {
    let response = await axios.put('http://localhost:8080/admin/rejectrequest', { organisationUserEmail,availedAt,requestRejectionReason},{headers:{Authorization:`bearer ${token}`}})
    return response.data;
}

// Admin accept requests
export const adminAcceptRequest = async (organisationUserEmail: string | undefined, availedAt: Date | undefined,token:string|undefined): Promise<AcceptRejectDeleteResponse> => {
    let response = await axios.put('http://localhost:8080/admin/acceptrequest', { organisationUserEmail,availedAt },{headers:{Authorization:`bearer ${token}`}})
    return response.data;
}

// Request Wfh
export const requestWfh = async (availedAt: Date | undefined, requestSubmissionReason: string | undefined, token:string|undefined): Promise<AcceptRejectDeleteResponse> => {
    let response = await axios.post('http://localhost:8080/user/requestwfh', {availedAt,requestSubmissionReason },{headers:{Authorization:`bearer ${token}`}})
		console.log("requestWfh")
		return response.data;
}

//Calender
export const requestCalenderData = async (token:string|undefined): Promise<CalendarResponse> => {
    let response = await axios.get('http://localhost:8080/user/calender',{headers:{Authorization:`bearer ${token}`}})
		return response.data;
}

// Get wfh
export const getUserWfh = async (token:string|undefined): Promise<GetUserWfhResponse> => {
	let response = await axios.get('http://localhost:8080/user/userwfh',{headers:{Authorization:`bearer ${token}`}})
	console.log("getUserWfh")
	return response.data;
}
