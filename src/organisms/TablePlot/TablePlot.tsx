// import { useState,useEffect } from 'react';
// import { useNavigate } from "react-router-dom";import { Table } from 'rsuite';
// import styles from './TablePlot.module.scss';
// import Icon from '../../atoms/Icon/Icon';
// import MessagePopup from '../../molecules/Message/MessagePopup';
// import EditOrganisationPopup from '../EditOrganisationPopup/EditOrganisationPopup';
// import RequestRejectionPopup from '../RequestRejectionPopup/RequestRejectionPopup';
// import { TablePlotProps,TableData,TypeAttributes,SystemOrganisationListTableResponseObject, SystemOrganisationDataTableResponseObject, AdminRequestsListTableResponseObject, AcceptRejectDeleteResponse } from './TablePlot.type';

// import editIcon from '../../resources/edit.png';
// import viewIcon from '../../resources/show.png';
// import deleteIcon from '../../resources/delete.png';
// import acceptIcon from '../../resources/accept.png';
// import rejectIcon from '../../resources/reject.png';
// import Cookies from 'js-cookie';
// import { deleteOrganisations, removeUser, requestSystemUserOrganisations, viewOrganisations } from '../../services/SystemUserApi';
// import { adminAcceptRequest, adminRequests } from '../../services/OrganisationUserApi';


// function TablePlot (props:TablePlotProps){

//     const organisation=Cookies.get('organisation');
//     const email=Cookies.get('email');
//     const page=props.page;

//     const { Column, HeaderCell, Cell } = Table;

//     const [data,changeData]=useState<TableData[]>([]);
//     // const [rowData,changeRowData]=useState<TableData>();

//     const [toggleEditOrganisation,changeToggleEditOrganisation]=useState<boolean>(false);
//     const [toggleRequestRejection,changeToggleRequestRejection]=useState<boolean>(false);
//     const [toggleMessage,changeToggleMessage]=useState<boolean>(false);

//     const [messageType,changeMessageType]=useState<TypeAttributes.Status>('info');
//     const [messageHead,changeMessageHead]=useState<string>("");
//     const [messageMessage,changeMessageMessage]=useState<string>("");

//     const setToggleEditOrganisation =()=>changeToggleEditOrganisation(!toggleEditOrganisation);
//     const setToggleRequestRejection =()=>changeToggleRequestRejection(!toggleRequestRejection);
//     const setToggleMessage=(type:TypeAttributes.Status, head:string, message:string)=>{
//         changeToggleMessage(true);
//         changeMessageType(type);
//         changeMessageHead(head);
//         changeMessageMessage(message);
//         setTimeout(()=>changeToggleMessage(false),1000);
//     }

//     const fetchTableData =async (email:string|undefined,organisation:string|undefined,page:string|undefined)=>{
//         // console.log("Fetching Table Data");
//         if(page==='system-org-list'){
//             const res:SystemOrganisationListTableResponseObject=await requestSystemUserOrganisations(email);
//             if(res.status===200){
//                 let editedRes=[];
//                 for(let i=0;i<res.data.length;i++){
//                     editedRes.push({
//                         'col1':i+1,
//                         'col2':res.data[i]['col1'],
//                         'col3':res.data[i]['col2'],
//                         'col4':res.data[i]['col3'],
//                         'col5':res.data[i]['col4'],
//                         'col6':<div className={styles.iconHover} onClick={handleEditOrganisation} > <Icon  icon={editIcon} altText='Edit Icon' width={15} /> </div>,
//                         'col7':<div className={styles.iconHover} onClick={handleViewOrganisation} > <Icon  icon={viewIcon} altText='View Icon' width={15} /> </div>,
//                         'col8':<div className={styles.iconHover} onClick={handleDeleteOrganisation} > <Icon  icon={deleteIcon} altText='Reject Icon' width={15} /> </div>
//                     });
//                 }
//                 changeData(editedRes);
//             }
//             else setToggleMessage('error','Error','Something went wrong');
//         }
//         else if(page==='system-org-data'){
//             const res:SystemOrganisationDataTableResponseObject=await viewOrganisations(organisation);
//             if(res.status===200){
//                 let editedRes=[];
//                 for(let i=0;i<res.data.length;i++){
//                     editedRes.push({
//                         'col1':i+1,
//                         'col2':res.data[i]['col1'],
//                         'col3':res.data[i]['col2'],
//                         'col4':res.data[i]['col3'],
//                         'col5':res.data[i]['col4'].toLocaleDateString(),
//                         'col6':res.data[i]['col5'].toLocaleDateString(),
//                         'col7':res.data[i]['col6'],
//                         'col8':<div className={styles.iconHover} onClick={handleDeleteUser} > <Icon  icon={deleteIcon} altText='Reject Icon' width={15} /> </div>
//                     });
//                 }
//                 changeData(editedRes);
//             }
//             else setToggleMessage('error','Error','Something went wrong');
//         }
//         else if(page==='admin-req-list'){
//             const res:AdminRequestsListTableResponseObject=await adminRequests(organisation);
//             if(res.status===200){
//                 let editedRes=[];
//                 for(let i=0;i<res.data.length;i++){
//                     editedRes.push({
//                         'col1':i+1,
//                         'col2':res.data[i]['col1'],
//                         'col3':res.data[i]['col2'],
//                         'col4':res.data[i]['col3'],
//                         'col5':res.data[i]['col4'],
//                         'col6':res.data[i]['col5'],
//                         'col7':<div className={styles.iconHover} onClick={handleAcceptOrganisation} > <Icon  icon={acceptIcon} altText='Accept Icon' width={15} /> </div>,
//                         'col8':<div className={styles.iconHover} onClick={handleRequestRejection}  > <Icon  icon={rejectIcon} altText='Reject Icon' width={15} /> </div>
//                     });
//                 }
//                 changeData(editedRes);
//             }else setToggleMessage('error','Error','Something went wrong');
//         }
//     }

//     useEffect( () => {
//         fetchTableData(email,organisation,page);
//     },[]);

//     const navigator = useNavigate();

//     const timeout=500;

//     const [availedAt,changeAvailedAt]=useState<Date>(new Date());
//     const [userEmail,changeUserEmail]=useState<string>("");
//     const [organisationUniqueName,changeOrganisationUniqueName]=useState<string>("");
//     const setOrganisationUniqueName=(value:string)=>{changeOrganisationUniqueName(value);console.log("value",value);}
    
//     const handleRowClick=(rowData:TableData)=>{
//         if(props.page==='system-org-list')setOrganisationUniqueName(rowData.col2.toString());
//         if(props.page==='admin-req-list'){
//             changeAvailedAt(new Date(Date.parse(rowData.col6.toString())));
//             changeUserEmail(rowData.col4.toString())
//         }
//         if(props.page==='system-org-data'){
//             changeUserEmail(rowData.col4.toString())
//         }
//     }

//     const handleViewOrganisation=()=>{
//         setTimeout(()=>{
//             // props.setOrganisation(organisationUniqueName);
//             navigator('/system-user/organisation');
//         },timeout);
//     }

//     const handleAcceptOrganisation=()=>{
//         setTimeout(async()=>{
//             const org=organisation;
//             const res:AcceptRejectDeleteResponse =await adminAcceptRequest(userEmail,org,availedAt);
//             if(res.status===200){setToggleMessage('success','Success',res.message);}
//             else setToggleMessage('error','Error',res.message);
//             setInterval(()=>navigator('/organisation-user/requests'),500);
//         },timeout);
//     }

//     const handleDeleteOrganisation=()=>{
//         setTimeout(async()=>{
//             const email=Cookies.get('email');
//             console.log("org",organisationUniqueName)
//             const res:AcceptRejectDeleteResponse =await deleteOrganisations(organisationUniqueName,email);
//             if(res.status===200){
//                 setToggleMessage('success','Success',res.message);
//             }
//             else setToggleMessage('error','Error',res.message);
            
//         },timeout);
//     }

//     const handleDeleteUser=()=>{
//         setTimeout(async()=>{
//             const org=Cookies.get('organisation');
//             const res:AcceptRejectDeleteResponse =await removeUser(org,userEmail);
//             if(res.status===200){
//                 setToggleMessage('success','Success',res.message);
//             }
//             else setToggleMessage('error','Error',res.message);
            
//         },timeout);
//     }

//     const handleEditOrganisation=()=>{
//         setTimeout(async()=>{setToggleEditOrganisation()},timeout);
//     }

//     const handleRequestRejection=()=>{
//         setTimeout(async()=>{setToggleRequestRejection()},timeout);
//     }

//     const head=props.head;
    
//     return(
//         <>
//         {toggleMessage?<MessagePopup type={messageType} head={messageHead} message={messageMessage}/>:<></>}
//         {toggleEditOrganisation?
//             <div className={styles.popupToggleDiv}>
//                 <EditOrganisationPopup organisationUniqueName={organisationUniqueName} setToggle={setToggleEditOrganisation} setMessage={setToggleMessage}  />
//             </div>
//         :<></>}
        
//         <div className={styles.tablePlotDiv}>

//             <Table className={styles.tablePlotTable} height={600} sortColumn='col2' data={data} onRowClick={handleRowClick} >

//                 <Column width={150} align="center" fixed>
//                     <HeaderCell>{head['col1']}</HeaderCell>
//                     <Cell dataKey="col1" />
//                 </Column>

//                 <Column width={250}>
//                     <HeaderCell>{head['col2']}</HeaderCell>
//                     <Cell dataKey="col2" />
//                 </Column>

//                 <Column width={250}>
//                     <HeaderCell>{head['col3']}</HeaderCell>
//                     <Cell dataKey="col3" />
//                 </Column>

//                 <Column width={250}>
//                     <HeaderCell>{head['col4']}</HeaderCell>
//                     <Cell dataKey="col4" />
//                 </Column>

//                 <Column width={150}>
//                     <HeaderCell>{head['col5']}</HeaderCell>
//                     <Cell dataKey="col5" />
//                 </Column>

//                 <Column width={150}>
//                     <HeaderCell>{head['col6']}</HeaderCell>
//                     <Cell dataKey="col6" />
//                 </Column>

//                 <Column width={150}>
//                     <HeaderCell>{head['col7']}</HeaderCell>
//                     <Cell dataKey="col7" />
//                 </Column>

//                 <Column width={150}>
//                     <HeaderCell>{head['col8']}</HeaderCell>
//                     <Cell dataKey="col8" />
//                 </Column>
//             </Table>
//         </div>
//         </>
//     );
// }

// export default TablePlot;

export {}