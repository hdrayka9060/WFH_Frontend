import {AcceptRejectDeleteResponse,EditOrganisationParameters, CreateOrganisationParameters, AddUserParameters,SystemOrganisationListTableResponseObject,SystemOrganisationDataTableResponseObject, EditUserParameters, GetOrganisationsResponse} from '../typings/ApisTypings';
import axios from 'axios';

// System user organisations
export const requestSystemUserOrganisations= async (page:number,limit:number,token:string|undefined):Promise<SystemOrganisationListTableResponseObject>=>{
  // const apiUrl = `http://localhost:8080/system/list?page=${page}&limit=${limit}`;
	let response=await axios.post('http://localhost:8080/system/list',{page:page,limit:limit},{headers:{Authorization:`bearer ${token}`}});
    // console.log(apiUrl,page,limit)
    return response.data;
}

export const getOrganisationUsers= async (organisationUniqueName:string,token:string|undefined):Promise<GetOrganisationsResponse>=>{
	let response=await axios.post('http://localhost:8080/system/users',{organisationUniqueName},{headers:{Authorization:`bearer ${token}`}});
	// console.log('calling organisations')
	return response.data;
}

// View organisations
export const viewOrganisations= async (organisationUniqueName:string|undefined,page:number,limit:number,token:string|undefined):Promise<SystemOrganisationDataTableResponseObject>=>{
    let response=await axios.post('http://localhost:8080/system/data', {organisationUniqueName,page:page,limit:limit},{headers:{Authorization:`bearer ${token}`}});
    return response.data;
}

// Create organisations
export const createOrganisation= async (obj:CreateOrganisationParameters,token:string|undefined):Promise<AcceptRejectDeleteResponse>=>{
    let response=await axios.post('http://localhost:8080/system/create', obj,{headers:{Authorization:`bearer ${token}`}});
    console.log(response)
		return response.data;
}

// Edit organisations
export const editOrganisation= async (obj:EditOrganisationParameters,token:string|undefined):Promise<AcceptRejectDeleteResponse>=>{
    let response=await axios.put('http://localhost:8080/system/edit', obj,{headers:{Authorization:`bearer ${token}`}});
    console.log('services',obj);
    return response.data;
}

export const editUser= async (obj:EditUserParameters,token:string|undefined):Promise<AcceptRejectDeleteResponse>=>{
    let response=await axios.put('http://localhost:8080/system/edit-user', obj,{headers:{Authorization:`bearer ${token}`}});
    return response.data;
}

// Delete organisations
export const deleteOrganisations= async (organisationUniqueName:string|undefined,token:string|undefined):Promise<AcceptRejectDeleteResponse>=>{
    let response=await axios.put('http://localhost:8080/system/delete', {organisationUniqueName},{headers:{Authorization:`bearer ${token}`}});
    return response.data;
}

// Add user
export const addUser= async (obj:AddUserParameters,token:string|undefined):Promise<AcceptRejectDeleteResponse>=>{
    let response=await axios.post('http://localhost:8080/system/add-user', obj,{headers:{Authorization:`bearer ${token}`}});
    return response.data;
}

// Remove user
export const removeUser= async (organisationUniqueName:string|undefined,organisationUserEmail:string|undefined,token:string|undefined):Promise<AcceptRejectDeleteResponse>=>{
    let response=await axios.put('http://localhost:8080/system/remove-user', {organisationUniqueName,organisationUserEmail},{headers:{Authorization:`bearer ${token}`}});
    return response.data;
}
