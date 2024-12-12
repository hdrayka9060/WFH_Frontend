import { useState,useEffect } from 'react';
import { Table,Tooltip, Whisper,Pagination} from 'rsuite';
import styles from './OrganiasationsListTable.module.scss';
import Icon from '../../atoms/Icon/index';
import { TablePlotProps, AcceptRejectDeleteResponse, SystemOrganisationDataTableResponseObject } from './OrganiasationsListTable.types';
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

		const editToolTip = (<Tooltip>Edit</Tooltip>);
		const viewToolTip = (<Tooltip>View</Tooltip>);
		const deleteToolTip = (<Tooltip>Delete</Tooltip>);

    const email=Cookies.get('email');
    const token=Cookies.get('token');

    const navigator=useNavigate();

    const { Column, HeaderCell, Cell } = Table;

    const [organisationUniqueName,changeOrganisationUniqueName]=useState<string>("");
    const [organisationDisplayName,changeOrganisationDisplayName]=useState<string>("");
    const [organisationAdmin,changeOrganisationAdmin]=useState<string>("");
    const [organisationMaxWfh,changeOrganisationMaxWfh]=useState<number>(0);

		const [totalRecords,changeTotalRecords]=useState<number>(0);

    const [toggleEditOrganisation,changeToggleEditOrganisation]=useState<boolean>(false);
    const setToggleEditOrganisation =()=>{
        changeToggleEditOrganisation(!toggleEditOrganisation);
    }


    const fetchTableData =async (page:number,limit:number)=>{
			props.setPage(page);
			props.setLimit(limit)
        // console.log("Fetching Table Data");
        const res:SystemOrganisationDataTableResponseObject=await requestSystemUserOrganisations(page,limit,token);
        if(res.error){
					toast.error(res.message);
					console.error(res.error);
				}
				else if(res.ok){props.changeData(res.data);changeTotalRecords(res.totalRecords);}
        else toast.error(res.message);
    }

    const handleChangeLimit =async (num:number) => {
			console.log("changing limit")
        // props.setPage(1);
        // props.setLimit(num);
        await fetchTableData(1,num);
    };

    const handleChangePage=async(num:number)=>{
			console.log("changing page")
        // props.setPage(num);
        await fetchTableData(num,props.limit);
    }

    useEffect( () => {
        fetchTableData(props.page,props.limit);
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
            // console.log(organisation)
            const res:AcceptRejectDeleteResponse =await deleteOrganisations(organisation,token);
            if(res.error){
							toast.error(res.message);
							console.error(res.error);
						}
						else if(res.ok){
                await fetchTableData(1,props.limit);
            }
            else toast.error(res.message);

    }

    const head=props.head;

    return(
        <>
        <ToastContainer/>
        {toggleEditOrganisation?
                <EditOrganisationPopup
										limit={props.limit}
										page={props.page}
                    toggle={toggleEditOrganisation}
                    email={email}
                    changeData={props.changeData}
                    organisationUniqueName={organisationUniqueName}
                    organisationDisplayName={organisationDisplayName}
                    organisationAdmin={organisationAdmin}
                    organisationMaxWfh={organisationMaxWfh}
                    setToggle={setToggleEditOrganisation}
                />
        :<></>}

        <div>
            <Table className={cx('tablePlotTable')} height={600} wordWrap={true} defaultExpandAllRows={true} defaultSortType='asc' data={props.data} >

                <Column flexGrow={1} align="center" fixed>
                    <HeaderCell>{head['id']}</HeaderCell>
                    <Cell dataKey='id' />
                </Column>

                <Column flexGrow={1.5}>
                    <HeaderCell>{head['uniqueName']}</HeaderCell>
                    <Cell dataKey="orgUniqName" />
                </Column>

                <Column flexGrow={1.5}>
                    <HeaderCell>{head['displayName']}</HeaderCell>
                    <Cell dataKey="orgDisplayName" />
                </Column>

                <Column flexGrow={1.5}>
                    <HeaderCell>{head['admin']}</HeaderCell>
                    <Cell dataKey="orgAdmin" />
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>{head['maxWfh']}</HeaderCell>
                    <Cell dataKey="maxWfh" />
                </Column>

                <Column flexGrow={2}>
                    <HeaderCell>{head['action']}</HeaderCell>
                    <Cell>
                        {rowData => {

                            async function handleEdit() {
                                await handleEditOrganisation(rowData['orgUniqName'],rowData['orgDisplayName'],rowData['orgAdmin'],rowData['maxWfh']);
                                // console.log("edit");
                            }

                            async function handleView() {
                                await handleViewOrganisation(rowData['orgUniqName']);
                                // console.log("view");
                            }

                            async function handleDelete() {
                                await handleDeleteOrganisation(rowData['orgUniqName']);
                                // console.log("delete");
                            }

                            return (
                                <>
								<Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={editToolTip}>
                                <div className={cx('iconHover')} onClick={handleEdit}>
									<Icon icon={editIcon} altText='edit' width={15} />
                                </div>
								</Whisper>
								<Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={viewToolTip}>
                                <div className={cx('iconHover')} onClick={handleView}>
                                <Icon icon={viewIcon} altText='view' width={15} />
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
										total={totalRecords} limitOptions={[1,2,5,10, 30, 50]} limit={props.limit} activePage={props.page} onChangePage={handleChangePage} onChangeLimit={handleChangeLimit}
							/>
						</div>
        </div>
        </>
    );
}

export default OrganisationListTable;
