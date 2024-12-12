import { useState,useEffect } from 'react';
import { Calendar } from 'rsuite';
import styles from './CalendarPlot.module.scss'

import {CalenderPlotProps, CalendarData} from './CalendarPlot.types'
import RequestStatusPopup from '../../molecules/RequestStatusPopup/index';
import RequestSubmissionPopup from '../RequestSubmissionPopup/index';
import { requestCalenderData } from '../../services/OrganisationUserApi';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

const cx=classNames.bind(styles);

function CalendarPlot (props:CalenderPlotProps){

    const [selectedDate,changeSelectedDate]=useState<Date>(new Date());
    const [selectedDateAvailedAt,changeSelectedDateAvailedAt]=useState<Date>(new Date());
    const [selectedDateCreatedAt,changeSelectedDateCreatedAt]=useState<Date>(new Date());
    const [selectedDateRequestStatus,changeSelectedDateRequestStatus]=useState<string>("");
    const [selectedDateSubmissionReason,changeSelectedDateSubmissionReason]=useState<string>("");
    const [selectedDateRejectionReason,changeSelectedDateRejectionReason]=useState<string>("");
    const [selectedDateApprovalAt,changeSelectedDateApprovalAT]=useState<Date>(new Date());

    const [toggleRequestSubmission,changeToggleRequestSubmission]=useState<boolean>(false);
    const [toggleRequestStatus,changeToggleRequestStatus]=useState<boolean>(false);

    const [calendarData,changeCalanderData]=useState<CalendarData[]>([{availedAt:new Date(), createdAt:new Date(), approvalAt:new Date(), wfhReason:"",rejectionReason:"", requestStatus:"pending"}]);

    const setToggleRequestSubmission=()=>{changeToggleRequestSubmission(!toggleRequestSubmission);};
    const setToggleRequestStatus=()=>{changeToggleRequestStatus(!toggleRequestStatus);};


    const token=Cookies.get('token');

    const fetchCalenderData=async(year:number,month:number)=>{
        const res=await requestCalenderData(year,month,token);
				if(res.error){
					toast.error(res.message);
					console.error(res.error);
				}
        else if(res.ok){
            changeCalanderData(res.data);
						let wfh=0;
						for(let i=0;i<res.data.length;i++){
							if(res.data[i]['requestStatus']!=="Rejected")wfh+=1;
						}
            props.changeWfh(wfh);
            props.changeMaxWfh(res.maxWfh);
        }
        else toast.error(res.message);
    }

    useEffect(()=>{fetchCalenderData(new Date().getFullYear(),new Date().getMonth());},[]);


    function renderCell(date:Date) {
        for(let i=0;i<calendarData.length;i++){
            const availedDate=new Date(calendarData[i].availedAt);
            if(date.getDate()===availedDate.getDate() && date.getMonth()===availedDate.getMonth() && date.getFullYear()===availedDate.getFullYear()){
                return (<b className={cx('ul')}>{calendarData[i]['requestStatus']}</b>);
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

		const handleDisabledDates=(date:Date)=>{
			for(let i=0;i<calendarData.length;i++){
				const availedDate=new Date(calendarData[i]['availedAt']);
				if(date.getDate()===availedDate.getDate() && date.getMonth()===availedDate.getMonth() && date.getFullYear()===availedDate.getFullYear()){
					return false;
				}
			}
            const today=new Date();
            today.setHours(0,0,0,0);
			return date<today;
		}

		const handleMonthChange=async (date:Date)=>{
			await fetchCalenderData(date.getFullYear(),date.getMonth())
		}


    return(
        <>
        <ToastContainer />
        {toggleRequestStatus?
                <RequestStatusPopup toggle={toggleRequestStatus} availedAt={selectedDateAvailedAt} createdAt={selectedDateCreatedAt} approvalAt={selectedDateApprovalAt} rejectionReason={selectedDateRejectionReason} submissionReason={selectedDateSubmissionReason} requestStatus={selectedDateRequestStatus} setToggle={setToggleRequestStatus}   />
        :<></>}
        {toggleRequestSubmission?
                <RequestSubmissionPopup changeWfh={props.changeWfh} wfh={props.wfh} maxWfh={props.maxWfh} toggle={toggleRequestSubmission} changeCalanderData={changeCalanderData} availedAt={selectedDate} setToggle={setToggleRequestSubmission}  />
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
            <Calendar  onMonthChange={handleMonthChange}  bordered cellClassName={customiseDate} onSelect={handleSeledtedDate} disabledDate={handleDisabledDates} renderCell={renderCell} />
        </div>
        </>
    );
}

export default CalendarPlot;
