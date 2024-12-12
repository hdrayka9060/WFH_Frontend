import { useState } from 'react';
import styles from './RequestSubmissionPopup.module.scss';
import { RequestSubmissionPopupProps } from './RequestSubmissionPopup.types';
import { Button,Stack,Modal} from 'rsuite';
import { requestCalenderData, requestWfh } from '../../services/OrganisationUserApi';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

const cx=classNames.bind(styles);

function RequestSubmissionPopup(props:RequestSubmissionPopupProps){

    const token=Cookies.get('token');

    const [requestSubmissionReason,changeRequestSubmissionReason]=useState<string>("");

    const fetchCalenderData=async()=>{
        const res=await requestCalenderData(props.availedAt.getFullYear(),props.availedAt.getMonth(),token);
        if(res.error){
					toast.error(res.message);
					console.error(res.error);
				}
				else if(res.ok){
            props.changeCalanderData(res.data);
        }
				else {
					console.log("error",res)
				}
    }

    const handleSubmit=async ()=>{

        if(props.wfh>=props.maxWfh){
            toast.error("WFH limit reached");
            return;
        }

        if(!requestSubmissionReason.length){
            toast.error("Credentials Missing");
            return;
        }
        const availedAt=new Date(props.availedAt.getFullYear(),props.availedAt.getMonth(),props.availedAt.getDate(),0,0,0,0);

        // console.log(availedAt,requestSubmissionReason);
        const res=await requestWfh(availedAt,requestSubmissionReason,token);
        if(res.error){
					toast.error(res.message);
					console.error(res.error);
				}
				else if(res.ok){
            await fetchCalenderData();
						props.changeWfh(props.wfh+1);
            props.setToggle()
        }
        else toast.error(res.message);
    }

    return(
        <>
        <ToastContainer/>
        <Modal overflow={true} open={props.toggle} onClose={props.setToggle}>
        <Modal.Header>
          <Modal.Title>Request Submission Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack direction="column" alignItems="center" spacing={20}>
                <Stack.Item>
                    <textarea onChange={(e)=>changeRequestSubmissionReason(e.target.value)} rows={5} placeholder="Request Submission Reason" className={cx('popupInput')}/>
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

export default RequestSubmissionPopup;
