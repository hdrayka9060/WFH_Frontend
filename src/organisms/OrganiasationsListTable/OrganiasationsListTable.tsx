import { useState,useEffect } from 'react';
import { Table ,Pagination} from 'rsuite';
import styles from './OrganiasationsListTable.module.scss';
import Icon from '../../atoms/Icon/index';
import MessagePopup from '../../molecules/Message/index';
import { TablePlotProps,TypeAttributes, SystemOrganisationDataTableResponseObject, AcceptRejectDeleteResponse,SystemOrganisationDataTableData } from './OrganiasationsListTable.types';
import deleteIcon from '../../resources/delete.png';
import editIcon from '../../resources/edit.png'
import viewIcon from '../../resources/show.png'
import Cookies from 'js-cookie';
import { deleteOrganisations, requestSystemUserOrganisations } from '../../services/SystemUserApi';
import EditOrganisationPopup from '../EditOrganisationPopup/index';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

const cx=classNames.bind(styles);

function OrganisationListTable (props:TablePlotProps){


    const email=Cookies.get('email');
    const token=Cookies.get('token');

    const navigator=useNavigate();

    const { Column, HeaderCell, Cell } = Table;

    const [sr,changeSr]=useState<number>(1);
    const setSr=(value:number)=>changeSr(value);

    const [organisationUniqueName,changeOrganisationUniqueName]=useState<string>("");
    const [organisationDisplayName,changeOrganisationDisplayName]=useState<string>("");
    const [organisationAdmin,changeOrganisationAdmin]=useState<string>("");
    const [organisationMaxWfh,changeOrganisationMaxWfh]=useState<number>(0);

    const [toggleEditOrganisation,changeToggleEditOrganisation]=useState<boolean>(false);
    const setToggleEditOrganisation =()=>{
        changeToggleEditOrganisation(!toggleEditOrganisation);        
    }


    const [toggleMessage,changeToggleMessage]=useState<boolean>(false);
    const [messageType,changeMessageType]=useState<TypeAttributes.Status>('info');
    const [messageHead,changeMessageHead]=useState<string>("");
    const [messageMessage,changeMessageMessage]=useState<string>("");

    const setToggleMessage=(type:TypeAttributes.Status, head:string, message:string)=>{
        changeToggleMessage(true);
        changeMessageType(type);
        changeMessageHead(head);
        changeMessageMessage(message);
        setTimeout(()=>changeToggleMessage(false),1000);
    }

    const fetchTableData =async ()=>{
        console.log("Fetching Table Data");
        const res:SystemOrganisationDataTableResponseObject=await requestSystemUserOrganisations(token);
        console.log("res",email,res)
        if(res.status===200)props.changeData(res.data);
        else toast.error(res.message);
    }

    useEffect( () => {
        fetchTableData();
    },[]);

    // {props.relodeList?fetchTableData():<></>}

    const handleEditOrganisation=async (uniqueName:string,displayName:string,admin:string,maxWfh:number)=>{
        changeOrganisationUniqueName(uniqueName);
        changeOrganisationDisplayName(displayName);
        changeOrganisationAdmin(admin);
        changeOrganisationMaxWfh(maxWfh);
        // console.log(uniqueName)
        setToggleEditOrganisation();
    }

    const handleViewOrganisation=async (organisation:string)=>{
        props.setOrganisation(organisation);
        navigator('/system-user/organisation');
    }

    const handleDeleteOrganisation=async (organisation:string)=>{
            console.log(organisation)
            const res:AcceptRejectDeleteResponse =await deleteOrganisations(organisation,token);
            if(res.status===200){
                toast.success(res.message)
                await fetchTableData();
            }
            else toast.error(res.message);
            
    }

    const head=props.head;
    
    return(
        <>
        <ToastContainer/>
        {toggleMessage?<MessagePopup type={messageType} head={messageHead} message={messageMessage}/>:<></>}
        {toggleEditOrganisation?
                <EditOrganisationPopup 
                    toggle={toggleEditOrganisation}
                    email={email}
                    changeData={props.changeData}
                    organisationUniqueName={organisationUniqueName}
                    organisationDisplayName={organisationDisplayName} 
                    organisationAdmin={organisationAdmin} 
                    organisationMaxWfh={organisationMaxWfh} 
                    setToggle={setToggleEditOrganisation} 
                    setMessage={setToggleMessage}
                />
        :<></>}

        <div>
            <Table className={cx('tablePlotTable')} height={600} wordWrap={true} defaultExpandAllRows={true} defaultSortType='asc' data={props.data} >

                <Column width={150} flexGrow={1} align="center" fixed>
                    <HeaderCell>{head['id']}</HeaderCell>
                    <Cell dataKey='id' />
                </Column>

                <Column width={250} flexGrow={1.5}>
                    <HeaderCell>{head['uniqueName']}</HeaderCell>
                    <Cell dataKey="orgUniqName" />
                </Column>

                <Column width={250} flexGrow={1.5}>
                    <HeaderCell>{head['displayName']}</HeaderCell>
                    <Cell dataKey="orgDisplayName" />
                </Column>

                <Column width={250} flexGrow={1.5}>
                    <HeaderCell>{head['admin']}</HeaderCell>
                    <Cell dataKey="orgAdmin" />
                </Column>

                <Column width={150} flexGrow={1}>
                    <HeaderCell>{head['maxWfh']}</HeaderCell>
                    <Cell dataKey="maxWfh" />
                </Column>

                <Column width={300} flexGrow={2}>
                    <HeaderCell>{head['action']}</HeaderCell>
                    <Cell>
                        {rowData => {

                            async function handleEdit() {
                                await handleEditOrganisation(rowData['orgUniqName'],rowData['orgDisplayName'],rowData['orgAdmin'],rowData['maxWfh']);
                                console.log("edit");
                            }

                            async function handleView() {
                                await handleViewOrganisation(rowData['orgUniqName']);
                                console.log("view");
                            }

                            async function handleDelete() {
                                await handleDeleteOrganisation(rowData['orgUniqName']);
                                console.log("delete");
                            }
                            
                            return (
                                <>
                                <div className={cx('iconHover')} onClick={handleEdit}>
                                    <Icon icon={editIcon} altText='edit' width={15} />
                                </div>

                                <div className={cx('iconHover')} onClick={handleView}>
                                <Icon icon={viewIcon} altText='view' width={15} />
                                </div>

                                <div className={cx('iconHover')} onClick={handleDelete}>
                                <Icon icon={deleteIcon} altText='delete' width={15} />
                                </div>
                                </>
                            );
                        }}
                    </Cell>
                </Column>
            </Table>
        </div>
        </>
    );
}

export default OrganisationListTable;