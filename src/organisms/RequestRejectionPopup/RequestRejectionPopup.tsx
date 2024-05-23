import { useState } from 'react';
import styles from './RequestRejectionPopup.module.scss';
import { RequestRejectionPopupProps, SystemOrganisationDataTableResponseObject} from './RequestRejectionPopup.types';
import { Button,Stack,Modal} from 'rsuite';
import { adminRejectRequest, adminRequests } from '../../services/OrganisationUserApi';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

const cx=classNames.bind(styles);

function RequestRejectionPopup(props:RequestRejectionPopupProps){

    const userEmail=props.userEmail
    const token=Cookies.get('token');
    const availedAt=props.availedAt;

    const [requestRejectionReason,changeRequestRejectionReason]=useState<string>("");

    const fetchTableData =async ()=>{
        // console.log("Fetching Table Data");
        const res:SystemOrganisationDataTableResponseObject=await adminRequests(props.page,props.limit,token);
        if(res.status===200){
            props.changeData(res.data);
        }
    }

    const handleSubmit=async ()=>{
        if(!requestRejectionReason.length){
            toast.error("Credentials Missing");
            return;
        }


        const res=await adminRejectRequest(userEmail,availedAt,requestRejectionReason,token);
        if(res.status===200){
            // console.log('rejected',res,res.message)
            await fetchTableData();
            setTimeout(()=>props.setToggle(),10)
            // props.setToggle()
        }
        else toast.error(res.message);
    }

    return(
        <>
        <ToastContainer/>
        <Modal overflow={true} open={props.toggle} onClose={props.setToggle}>

        <Modal.Header>
          <Modal.Title>Request Rejection Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack direction="column" alignItems="center" spacing={20}>
                <Stack.Item>
                    <textarea onChange={(e)=>changeRequestRejectionReason(e.target.value)} rows={5} placeholder="Request Rejection Reason" className={cx('popupInput')}/>
                </Stack.Item>
            </Stack>
            </Modal.Body>
        <Modal.Footer>
            <Button className={cx('popupCancel')} onClick={props.setToggle} >Cancel</Button>
            <Button className={cx('popupSubmit')} onClick={handleSubmit} >Submit</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
}

export default RequestRejectionPopup;
