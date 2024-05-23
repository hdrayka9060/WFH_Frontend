import { useState,useEffect } from 'react';
import { Table,Button,Pagination } from 'rsuite';
import styles from './RequestsListTable.module.scss';
import MessagePopup from '../../molecules/Message/index';
import { TablePlotProps,TypeAttributes, SystemOrganisationDataTableResponseObject, AcceptRejectDeleteResponse } from './RequestsListTable.types';
import Cookies from 'js-cookie';
import { adminAcceptRequest, adminRequests } from '../../services/OrganisationUserApi';
import RequestRejectionPopup from '../RequestRejectionPopup/RequestRejectionPopup';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

const cx=classNames.bind(styles);

function RequestsListTable (props:TablePlotProps){

    const token=Cookies.get('token');

    const { Column, HeaderCell, Cell } = Table;

		const [totalRecords,changeTotalRecords]=useState<number>(0);

    const [toggleRequestRejection,changeToggleRequestRejection]=useState<boolean>(false);
    const setToggleRequestRejection =()=>changeToggleRequestRejection(!toggleRequestRejection);

    const [userEmail,changeUserEmail]=useState<string>("");
    const [availedAt,changeAvailedAt]=useState<Date>(new Date());


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
				props.setPage(page);
				props.setLimit(limit);
        const res:SystemOrganisationDataTableResponseObject=await adminRequests(page,limit,token);
				// console.log('res',res)
        if(res.status===200){props.changeData(res.data);changeTotalRecords(res.totalRecords)}
        else toast.error(res.message);

    }

    useEffect( () => {
        fetchTableData(props.page,props.limit);
    },[]);

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

    const handleRejectRequest=async (email:string,availedAt:Date)=>{
        changeUserEmail(email);
        changeAvailedAt(availedAt);
        setToggleRequestRejection();
    }

    const handleAcceptRequest:(userEmail:string,availedAt:Date)=>Promise<void>=async (userEmail:string,availedAt:Date)=>{
            const res:AcceptRejectDeleteResponse =await adminAcceptRequest(userEmail, availedAt,token);
            if(res.status===200){
                await fetchTableData(1,props.limit)
            }
            else toast.error(res.message);
    }

    const head=props.head;

    return(
        <>
        <ToastContainer/>
        {toggleMessage?<MessagePopup type={messageType} head={messageHead} message={messageMessage}/>:<></>}
        {toggleRequestRejection?
                <RequestRejectionPopup page={props.page} limit={props.limit} toggle={toggleRequestRejection}  changeData={(data)=>{props.changeData(data);}} userEmail={userEmail} availedAt={availedAt} setToggle={setToggleRequestRejection} setMessage={setToggleMessage}  />
        :<></>}

        <div>
            <Table className={cx('tablePlotTable')} height={600} wordWrap={true} defaultExpandAllRows={true} defaultSortType='asc' data={props.data} >

                <Column  width={150} flexGrow={1} align="center" fixed>
                    <HeaderCell>{head['id']}</HeaderCell>
                    <Cell dataKey='id' />
                </Column>

                <Column width={150} flexGrow={1}>
                    <HeaderCell>{head['name']}</HeaderCell>
                    <Cell dataKey="name" />
                </Column>

                <Column width={150} flexGrow={1}>
                    <HeaderCell>{head['email']}</HeaderCell>
                    <Cell dataKey="userEmail" />
                </Column>

                <Column width={150} flexGrow={1}>
                    <HeaderCell>{head['requestStatus']}</HeaderCell>
                    <Cell dataKey="requestStatus" />
                </Column>

								<Column width={150} flexGrow={1}>
                    <HeaderCell>{head['wfhReason']}</HeaderCell>
                    <Cell dataKey="wfhReason" />
                </Column>

                <Column width={150} flexGrow={1}>
                    <HeaderCell>{head['wfh']}</HeaderCell>
                    <Cell dataKey="wfh" />
                </Column>


                <Column width={150} flexGrow={1}>
                    <HeaderCell>{head['availedAt']}</HeaderCell>
                    <Cell>
                        {
                            rowData=>{
                                const date=new Date(rowData['availedAt']).toDateString();
                                return(<div>{date}</div>)
                            }
                        }
                    </Cell>
                </Column>

                <Column width={150} flexGrow={1}>
                    <HeaderCell>{head['createdAt']}</HeaderCell>
                    <Cell>
                        {
                            rowData=>{
                                const date=new Date(rowData['createdAt']).toDateString();
                                return(<div>{date}</div>)
                            }
                        }
                    </Cell>

                </Column>


                <Column width={300} flexGrow={2}>
                    <HeaderCell>{head['accept/reject']}</HeaderCell>
                    <Cell>
                        {rowData => {
                            async function handleAccept() {
                                await handleAcceptRequest(rowData['userEmail'],rowData['availedAt']);
                                // console.log("accept");
                            }
                            async function handleReject() {
                                await handleRejectRequest(rowData['userEmail'],rowData['availedAt']);
                                // console.log("reject");
                            }
                            if(rowData['requestStatus']==='Pending')return (
                                // <div className={cx('iconHover')} onClick={handleAction}>
                                <>
                                    <Button className={cx('actionButton')} onClick={handleAccept} color="green" disabled={false} appearance="primary">Accept</Button>
                                    <Button className={cx('actionButton')} onClick={handleReject} color="red" disabled={false} appearance="primary">Reject</Button>
                                </>
                                // </div>
                            );
                            else return (
                                // <div className={cx('iconHover')}>
                                <>
                                    <Button className={cx('actionButton')} color="green" disabled={true} appearance="primary">Accept</Button>
                                    <Button className={cx('actionButton')} color="red" disabled={true} appearance="primary">Reject</Button>
                                </>
                                // </div>
                            );
                        }}
                    </Cell>
                </Column>
            </Table>
						{/* <div >
							<Pagination prev next first last ellipsis boundaryLinks maxButtons={5} size='md' layout={['total', '-', 'limit', '|', 'pager', 'skip']}
										total={totalRecords} limitOptions={[1,2,5,10, 30, 50]} limit={props.limit} activePage={props.page} onChangePage={handleChangePage} onChangeLimit={handleChangeLimit}
							/>
						</div> */}
        </div>
        </>
    );
}

export default RequestsListTable;
