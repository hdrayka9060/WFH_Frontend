import { useState,useEffect } from 'react';
import { Table,Tooltip, Whisper,Pagination} from 'rsuite';
import styles from './OrganiasationsDataTable.module.scss';
import Icon from '../../atoms/Icon/index';
import MessagePopup from '../../molecules/Message/index';
import { TablePlotProps,TypeAttributes, SystemOrganisationDataTableResponseObject, AcceptRejectDeleteResponse } from './OrganiasationsDataTable.types';

import deleteIcon from '../../resources/delete.png';
import editIcon from '../../resources/edit.png';
import Cookies from 'js-cookie';
import { removeUser, viewOrganisations } from '../../services/SystemUserApi';
import EditUserPopup from '../EditUserPopup/EditUserPopup';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';


const cx=classNames.bind(styles);

function OrganisationDataTable (props:TablePlotProps){

	const editToolTip = (<Tooltip>Edit</Tooltip>);
	const deleteToolTip = (<Tooltip>Delete</Tooltip>);

    const token=Cookies.get('token');

    let org:string|undefined;
    if(props.organisation.length!==0){
        org=props.organisation;
        Cookies.set('organisation',props.organisation);
    }
    else org=Cookies.get('organisation')

		const [totalRecords,changeTotalRecords]=useState<number>(0);

    const { Column, HeaderCell, Cell } = Table;

    const [toggleEditUser,changeToggleEditUser]=useState<boolean>(false);
    const setToggleEditUser=()=>changeToggleEditUser(!toggleEditUser);

    const [userEmail,changeUserEmail]=useState<string>("");
    const [firstName,changeFirstName]=useState<string>("");
    const [lastName,changeLastName]=useState<string>("");
    const [dateOfBirth,changeDateOfBirth]=useState<Date>(new Date());

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

    const fetchTableData =async (page:number,limit:number)=>{
        // console.log("Fetching Table Data");
				if(page!==props.page)props.setPage(page);
				if(limit!==props.limit)props.setLimit(limit)
        const res:SystemOrganisationDataTableResponseObject=await viewOrganisations(org,page,limit,token);
        if(res.status===200){props.changeData(res.data);changeTotalRecords(res.totalRecords);}
        else toast.error(res.message);
    }


    useEffect( () => {
        fetchTableData(props.page,props.limit);
    },[]);

		const handleChangeLimit =async (num:number) => {
			// changelimit2(num);
			// console.log("changing limit")
        // props.setPage(1);
        // props.setLimit(num);
        await fetchTableData(1,num);
    };

    const handleChangePage=async(num:number)=>{
			console.log("changing page")
        // props.setPage(num);
        await fetchTableData(num,props.limit);
    }

    // {props.relodeList?fetchTableData():<></>}

    const handleDeleteUser=async (organisationUserEmail:string)=>{
            const res:AcceptRejectDeleteResponse =await removeUser(org,organisationUserEmail,token);
            if(res.status===200){
                await fetchTableData(1,props.limit);
            }
            else toast.error(res.message);
    }

    const handleEditUser=async(userEmail:string,firstName:string,lastName:string,dateOfBirth:Date)=>{
        changeUserEmail(userEmail);
        changeFirstName(firstName);
        changeLastName(lastName);
        changeDateOfBirth(dateOfBirth);
        // console.log("user",userEmail,firstName,lastName,dateOfBirth,org)
        setToggleEditUser();
    }

    const head=props.head;

    return(
        <>
        <ToastContainer/>
        {toggleMessage?<MessagePopup type={messageType} head={messageHead} message={messageMessage}/>:<></>}
        {toggleEditUser?<EditUserPopup
            toggle={toggleEditUser}
            setToggle={setToggleEditUser}
            changeData={props.changeData}
            setMessage={setToggleMessage}
            organisation={org}
            userEmail={userEmail}
            firstName={firstName}
            lastName={lastName}
            dateOfBirth={dateOfBirth}
						page={props.page}
						limit={props.limit}
        />:<></>}
        <div>
            <Table className={cx('tablePlotTable')} height={600} wordWrap={true} defaultExpandAllRows={true} defaultSortType='asc' data={props.data} >

                <Column width={150} flexGrow={1} align="center" fixed>
                    <HeaderCell>{head['id']}</HeaderCell>
                    <Cell dataKey='id' />
                </Column>

                <Column width={175} flexGrow={1.5}>
                    <HeaderCell>{head['firstName']}</HeaderCell>
                    <Cell dataKey="firstName" />
                </Column>

                <Column width={175} flexGrow={1.5}>
                    <HeaderCell>{head['lastName']}</HeaderCell>
                    <Cell dataKey="lastName" />
                </Column>

                <Column width={175} flexGrow={1.5}>
                    <HeaderCell>{head['email']}</HeaderCell>
                    <Cell dataKey="userEmail" />
                </Column>

                <Column width={175} flexGrow={1.5}>
                    <HeaderCell>{head['dateOfJoining']}</HeaderCell>
                    <Cell>
                        {
                            rowData=>{
                                const date=new Date(rowData['dateOfJoining']).toDateString();
                                return(<div>{date}</div>)
                            }
                        }
                    </Cell>
                </Column>

                <Column width={175} flexGrow={1.5}>
                    <HeaderCell>{head['dateOfBirth']}</HeaderCell>
                    <Cell>
                        {
                            rowData=>{
                                const date=new Date(rowData['dateOfBirth']).toDateString();
                                return(<div>{date}</div>)
                            }
                        }
                    </Cell>
                </Column>

                <Column width={150} flexGrow={1.}>
                    <HeaderCell>{head['wfh']}</HeaderCell>
                    <Cell dataKey="wfh" />
                </Column>

                <Column width={300} flexGrow={2}>
                    <HeaderCell>{head['action']}</HeaderCell>
                    <Cell>
                    {rowData => {
                            async function handleDelete() {
                                await handleDeleteUser(rowData['userEmail']);
                                console.log("delete");
                            }

                            async function handleEdit() {
                                await handleEditUser(rowData['userEmail'],rowData['firstName'],rowData['lastName'],rowData['dateOfBirth']);
                                console.log("edit");
                            }

                            return (
                                <>
																<Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={editToolTip}>
                                <div className={cx('iconHover')} onClick={handleEdit}>
                                    <Icon icon={editIcon} altText='edit' width={15} />
                                </div>
																</Whisper>
																<Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={deleteToolTip}>
                                <div className={cx('iconHover')} onClick={handleDelete}>
                                    <Icon icon={deleteIcon} altText='delete' width={15} />
                                </div>
																</Whisper>
                                </>
                            );
                        }}
                    </Cell>
                </Column>
            </Table>
						<div >
							<Pagination prev next first last ellipsis boundaryLinks maxButtons={5} size='md' layout={['total', '-', 'limit', '|', 'pager', 'skip']}
										total={totalRecords} limitOptions={[1,2,5,10,30,50]} limit={props.limit} activePage={props.page} onChangePage={handleChangePage} onChangeLimit={handleChangeLimit}
							/>
						</div>
        </div>
        </>
    );
}

export default OrganisationDataTable;
