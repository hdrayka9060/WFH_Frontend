import { useState,useEffect } from 'react';
import { Calendar } from 'rsuite';
import styles from './CalendarPlot.module.scss'
import MessagePopup from '../../molecules/Message/index';

import {TypeAttributes,CalenderPlotProps, CalendarData} from './CalendarPlot.types'
import RequestStatusPopup from '../../molecules/RequestStatusPopup/index';
import RequestSubmissionPopup from '../RequestSubmissionPopup/index';
import { requestCalenderData } from '../../services/OrganisationUserApi';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

const cx=classNames.bind(styles);

function CalendarPlot (props:CalenderPlotProps){

    const [wfh,changeWfh]=useState<number>(0);
    const [maxWfh,changeMaxWfh]=useState<number>(0);

    const [selectedDate,changeSelectedDate]=useState<Date>(new Date());
    const [selectedDateAvailedAt,changeSelectedDateAvailedAt]=useState<Date>(new Date());
    const [selectedDateCreatedAt,changeSelectedDateCreatedAt]=useState<Date>(new Date());
    const [selectedDateRequestStatus,changeSelectedDateRequestStatus]=useState<string>("");
    const [selectedDateSubmissionReason,changeSelectedDateSubmissionReason]=useState<string>("");
    const [selectedDateRejectionReason,changeSelectedDateRejectionReason]=useState<string>("");
    const [selectedDateApprovalAt,changeSelectedDateApprovalAT]=useState<Date>(new Date());

    const [toggleMessage,changeToggleMessage]=useState<boolean>(false);
    const [toggleRequestSubmission,changeToggleRequestSubmission]=useState<boolean>(false);
    const [toggleRequestStatus,changeToggleRequestStatus]=useState<boolean>(false);

    const [messageType,changeMessageType]=useState<TypeAttributes.Status>('info');
    const [messageHead,changeMessageHead]=useState<string>("");
    const [messageMessage,changeMessageMessage]=useState<string>("");

    const [calendarData,changeCalanderData]=useState<CalendarData[]>([{availedAt:new Date(), createdAt:new Date(), approvalAt:new Date(), wfhReason:"",rejectionReason:"", requestStatus:"pending"}]);

    const setToggleRequestSubmission=()=>{changeToggleRequestSubmission(!toggleRequestSubmission);};
    const setToggleRequestStatus=()=>{changeToggleRequestStatus(!toggleRequestStatus);};
    const setToggleMessage=(type:TypeAttributes.Status, head:string, message:string)=>{
        changeToggleMessage(true);
        changeMessageType(type);
        changeMessageHead(head);
        changeMessageMessage(message);
        setTimeout(()=>changeToggleMessage(false),1000);
    }


    const token=Cookies.get('token');

    const fetchCalenderData=async()=>{
				// console.log('token',token)
        const res=await requestCalenderData(token);
				// console.log('res',res);
        if(res.status===200){
            changeCalanderData(res.data);
            changeWfh(res.wfh);
            changeMaxWfh(res.maxWfh);
        }
        else toast.error(res.message);
    }

    useEffect(()=>{fetchCalenderData();},[]);


    function renderCell(date:Date) {
        for(let i=0;i<calendarData.length;i++){
            const availedDate=new Date(calendarData[i].availedAt);
            if(date.getDate()===availedDate.getDate() && date.getMonth()===availedDate.getMonth() && date.getFullYear()===availedDate.getFullYear()){
                return (
                  <ul className={cx('ul')}>
                        <li className={cx('li')}>
                         <b>{calendarData[i]['requestStatus']}</b>
                      </li>
                  </ul>
                );
            }
        }
    }


    const customiseDate=(date:Date):string|undefined=>{
        for(let i=0;i<calendarData.length;i++){
            const availedDate=new Date(calendarData[i].availedAt);
            if(date.getDate()===availedDate.getDate() && date.getMonth()===availedDate.getMonth() && date.getFullYear()===availedDate.getFullYear()){
                if (calendarData[i].requestStatus==='Pending') return 'bg-yellow';
                else if (calendarData[i].requestStatus==='Rejected') return 'bg-red';
                else if (calendarData[i].requestStatus==='Approved') return 'bg-green';
                return 'bg-gray';
            }
        }
    }


    const handleSeledtedDate=(date:Date)=>{
        changeSelectedDate(date);
        for(let i=0;i<calendarData.length;i++){
            const availedDate=new Date(calendarData[i]['availedAt']);
            if(date.getDate()===availedDate.getDate() && date.getMonth()===availedDate.getMonth() && date.getFullYear()===availedDate.getFullYear()){
                changeSelectedDateApprovalAT(new Date(calendarData[i]['approvalAt']));
                changeSelectedDateAvailedAt(new Date(calendarData[i]['availedAt']));
                changeSelectedDateCreatedAt(new Date(calendarData[i]['createdAt']));
                changeSelectedDateRequestStatus(calendarData[i]['requestStatus']);
                changeSelectedDateSubmissionReason(calendarData[i]['wfhReason']);
                changeSelectedDateRejectionReason(calendarData[i]['rejectionReason']);
                setToggleRequestStatus();
                return ;
            }
        }
        let today=new Date();
        if((date.getDate()>=today.getDate() || date.getMonth()>today.getMonth()) && date.getMonth()>=today.getMonth() && date.getFullYear()>=today.getFullYear()){
            setToggleRequestSubmission();
            return ;
        }
        return;
    };


    return(
        <>
        <ToastContainer />
        {toggleMessage?<MessagePopup type={messageType} head={messageHead} message={messageMessage}/>:<></>}
        {toggleRequestStatus?
                <RequestStatusPopup toggle={toggleRequestStatus} availedAt={selectedDateAvailedAt} createdAt={selectedDateCreatedAt} approvalAt={selectedDateApprovalAt} rejectionReason={selectedDateRejectionReason} submissionReason={selectedDateSubmissionReason} requestStatus={selectedDateRequestStatus} setToggle={setToggleRequestStatus} setMessage={setToggleMessage}  />
        :<></>}
        {toggleRequestSubmission?
                <RequestSubmissionPopup wfh={wfh} maxWfh={maxWfh} toggle={toggleRequestSubmission} changeCalanderData={changeCalanderData} availedAt={selectedDate} setToggle={setToggleRequestSubmission} setMessage={setToggleMessage}  />
        :<></>}
        <div>
            <style>
                {`
                    .bg-gray {
                        background-color: rgba(250, 250, 250, 0.7);
                    }
                    .bg-red{
                        background-color: rgba(255, 155, 155,0.7);
                    }
                    .bg-yellow{
                        background-color: rgba(255, 255, 155,0.7);
                    }
                    .bg-green{
                        background-color: rgba(155, 255, 155,0.7);
                    }
                `}
            </style>
            <Calendar  bordered cellClassName={customiseDate} onSelect={handleSeledtedDate} renderCell={renderCell} />
            {/* <Calendar bordered  onSelect={hanndleSeledtedDate} renderCell={renderCell} /> */}
        </div>
        </>
    );
}

export default CalendarPlot;
