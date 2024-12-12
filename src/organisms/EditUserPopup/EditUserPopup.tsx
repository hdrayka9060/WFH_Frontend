import { useState } from 'react';
import styles from './EditUserPopup.module.scss';
import { Input,Button,Stack,Modal, DatePicker } from 'rsuite';
import { editUser, viewOrganisations } from '../../services/SystemUserApi';
import Cookies from 'js-cookie';
import {SystemOrganisationDataTableResponseObject,EditUserPopupProps} from './EditUserPopup.types';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

const cx=classNames.bind(styles);

function EditUserPopup(props:EditUserPopupProps){

    const token=Cookies.get('token');

    const [userEmail,changeUserEmail]=useState<string>(props.userEmail);
    const [firstName,changeFirstName]=useState<string>(props.firstName);
    const [lastName,changeLastName]=useState<string>(props.lastName);
    const [dateOfBirth,changeDateOfBirth]=useState<Date|null>(new Date(props.dateOfBirth));

    const fetchTableData =async ()=>{
        console.log("Fetching Table Data");
        const res:SystemOrganisationDataTableResponseObject=await viewOrganisations(props.organisation,props.page,props.limit,token);
        if(res.error){
					toast.error(res.message);
					console.error(res.error);
				}
				else if(res.ok)props.changeData(res.data);
    }

    const validateEmail=():boolean=>{
        if(userEmail.length===0)return false;
        let at=0;
        let dot=0;
        for(let i=0;i<userEmail.length;i++){
            if(userEmail[i]==='@')at+=1;
            if(userEmail[i]==='.')dot+=1;
        }
        return at===1 && dot===1;
    }

    const handleSubmit=async()=>{


        if(!validateEmail() || !firstName.length || !lastName.length || !dateOfBirth || dateOfBirth>new Date() ){
            toast.error("Credentials Missing");
            return;
        }

        if(dateOfBirth.toString()==='Invalid Date')changeDateOfBirth(props.dateOfBirth);

        const obj={
            organisationUserOldEmail:props.userEmail,
            organisationUniqueName:props.organisation,
            organisationUserEmail:userEmail,
            firstName:firstName,
            lastName:lastName,
            dateOfBirth:dateOfBirth
        }
        console.log("obj",obj);

        const res=await editUser(obj,token);
				if(res.error){
					toast.error(res.message);
					console.error(res.error);
				}
        else if(res.ok){
            toast.success(res.message)
            await fetchTableData();
            props.setToggle();
        }
        else if(!res.ok)toast.error(res.message);
        else toast.error('Someting went wrong');
    };

    return(
        <>
        <ToastContainer />
        <Modal overflow={true} open={props.toggle} onClose={props.setToggle}>
        <Modal.Header>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack direction="column" alignItems="center" spacing={20}>
                <Stack.Item>
                    <label>Email</label>
                    <Input value={userEmail} onChange={(e)=>changeUserEmail(e)}  placeholder="Email" className={cx('popupInput')}/>
                </Stack.Item>

                <Stack.Item>
                    <label>First Name</label>
                    <Input  value={firstName} onChange={(e)=>changeFirstName(e)}  placeholder="First Name" className={cx('popupInput')}/>
                </Stack.Item>

                <Stack.Item>
                    <label>Last Name</label>
                    <Input value={lastName} onChange={(e)=>changeLastName(e)}  placeholder="LastName" className={cx('popupInput')}/>
                </Stack.Item>

                <Stack.Item>
                    <label>Date of Birth</label>
                    <DatePicker value={dateOfBirth} limitEndYear={new Date().getFullYear()}  onChangeCalendarDate={(e)=>changeDateOfBirth(e)} editable={true} disabledDate={(date)=>{return (!date || date>(new Date(2011,0,1)));}} onChange={(e)=>changeDateOfBirth(e)}	  placeholder="Date of Birth" className={cx('datePicker')} />

                </Stack.Item>
            </Stack>
            </Modal.Body>
        <Modal.Footer>
            <Button className={cx('popupCancel')} onClick={props.setToggle}  >Cancel</Button>
            <Button className={cx('popupSubmit')} onClick={handleSubmit} >Submit</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
}

export default EditUserPopup;
