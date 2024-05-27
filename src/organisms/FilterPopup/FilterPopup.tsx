import { useEffect, useState } from 'react';
import styles from './FilterPopup.module.scss';
import {FilterPopupProps,AdminRequestsListTableResponseObject,GetUsersResponse} from './FilterPopup.types';
import {SelectPicker, Button,Stack, DatePicker, Modal } from 'rsuite';
import { adminFilterRequests, getUsers } from '../../services/OrganisationUserApi';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

const cx=classNames.bind(styles);

function FilterPopup(props:FilterPopupProps){

    const [usersList,changeUsersList]=useState<string[]>(['']);

    const token=Cookies.get('token');

    async function getUsersList() {
        const res:GetUsersResponse=await getUsers(token);
				if(res.error){
					toast.error(res.message);
					console.error(res.error);
				}
        else if(res.ok){
            changeUsersList(res.data);
        }
        else toast.error(res.message);
    }

    useEffect(()=>{getUsersList()},[]);

    const [filterType,changeFilterType] = useState<string|null>("");
    const [requestStatus,changeRequestStatue]=useState<string|null>("");
    const [user,changeUser]=useState<string>('')
    const [selectedDate,changeSelectedDate]=useState<Date|null|undefined>();

    const handleSubmit=async ()=>{
        if(!filterType||(filterType==='Request Status' && !requestStatus)||(filterType==='Availed By' && !user)||((filterType==='Availed At' || filterType==='Created At') && !selectedDate)){
            toast.error("Credentials Missing");
            return;
        }
        let date;
        if(selectedDate)date=new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate(),0,0,0,0);
        // const res:AdminRequestsListTableResponseObject=await adminFilterRequests(filterType,requestStatus,user,date,props.page,props.limit,token);
        const res:AdminRequestsListTableResponseObject=await adminFilterRequests(filterType,requestStatus,user,date,token);
        if(res.error){
					toast.error(res.message);
					console.error(res.error);
				}
        else if(res.ok){
            props.changeData(res.data);
            props.setToggle();
            if(filterType==='Request Status' && requestStatus==='Pending')props.changeIsFilterPending(true);
            else props.changeIsFilterPending(false);
        }
        else toast.error(res.message);
    };

    const filters = ['Request Status', 'Availed By', 'Availed At', 'Created At'].map(item => ({ label: item, value: item }));
    const requests = ['Rejected', 'Pending', 'Approved'].map(item => ({ label: item, value: item }));

    return(
        <>
        <ToastContainer />
        <Modal overflow={true} open={props.toggle} onClose={props.setToggle}>
        <Modal.Header>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Stack direction="column" alignItems="center" spacing={20}>
                <Stack.Item>
                    <label>Filter</label>
                    <SelectPicker onChange={(e)=>changeFilterType(e)} onClean={()=>changeFilterType(null)} data={filters} searchable={false} placeholder="Select Filter" className={cx('input')} />
                </Stack.Item>

                {filterType==='Request Status'?
                    <Stack.Item>
                        <label>Select Request Type</label>
                        <SelectPicker onChange={(e)=>changeRequestStatue(e)} onClean={()=>changeRequestStatue(null)} data={requests} searchable={false}  placeholder="Select Request Status" className={cx('input')} />
                    </Stack.Item>
                :<></>}

                {filterType==='Availed By'?
                    <Stack.Item>
                        <label>Enter User Email</label>
                        <SelectPicker onChange={(e)=>changeUser(`${e}`)} onClean={()=>changeUser('')} data={usersList.map(item => ({ label: item, value: item }))} searchable={true}  placeholder="Select User" className={cx('input')} />
                    </Stack.Item>
                :<></>}

                {filterType==='Availed At' || filterType==='Created At' ?
                    <Stack.Item>
                        <label>Select Date</label>
                        <DatePicker value={selectedDate} onChangeCalendarDate={(e)=>{changeSelectedDate(e)}} onChange={(e)=>{changeSelectedDate(e)}} limitEndYear={new Date().getFullYear()} editable={true} className={cx('input')} />
                    </Stack.Item>
                :<></>}
            </Stack>
        </Modal.Body>
        <Modal.Footer>
        <Button className={cx('popupCancel')} onClick={props.setToggle}  >Cancel</Button>
        <Button className={cx('popupSubmit')} onClick={handleSubmit}  >Apply</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
}

export default FilterPopup;
