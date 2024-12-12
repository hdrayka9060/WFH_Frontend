import { useState } from 'react';
import styles from './AddUserPopup.module.scss';
import {  AddUserPopupProps, SystemOrganisationDataTableResponseObject} from './AddUserPopup.types';
import { Input,Button,Stack, DatePicker, Modal } from 'rsuite';
import { addUser, viewOrganisations } from '../../services/SystemUserApi';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import { ToastContainer,toast } from 'react-toastify';

const cx=classNames.bind(styles);

function AddUserPopup(props:AddUserPopupProps){

    let org:string|undefined='';
    if(props.organisation.length!==0){
        org=props.organisation;
        Cookies.set('organisation',props.organisation);
    }
    else org=Cookies.get('organisation')
    const token=Cookies.get('token');

    const [email,changeEmail]=useState<string>("");
    const [firstName,changeFirstName]=useState<string>("");
    const [lastName,changeLastName]=useState<string>("");
    const [dateOfBirth,changeDateOfBirth]=useState<Date|null>();

    const fetchTableData =async ()=>{
        // console.log("Fetching Table Data");
        const res:SystemOrganisationDataTableResponseObject=await viewOrganisations(props.organisation,props.page,props.limit,token);
        if(res.error){
					toast.error(res.message);
					console.error(res.error);
				}
				else if(res.ok)props.changeData(res.data);
    }

    const validateEmail=():boolean=>{
        if(email.length===0)return false;
        let at=0;
        let dot=0;
        for(let i=0;i<email.length;i++){
            if(email[i]==='@')at+=1;
            if(email[i]==='.')dot+=1;
        }
        return at===1 && dot===1;
    }

    const handleSubmit=async ()=>{
        if(!validateEmail() || !firstName.length || !lastName.length || !dateOfBirth || dateOfBirth>new Date() || dateOfBirth.toString()==='Invalid Date' ){
            toast.error('Cerentials Missing');
            return;
        }

        const obj={
            organisationUniqueName:org,
            organisationUserEmail:email,
            firstName:firstName,
            lastName:lastName,
            dateOfBirth:dateOfBirth
        }
        const res=await addUser(obj,token);
				if(res.error){
					toast.error(res.message);
					console.error(res.error);
				}
        else if(res.ok){
            toast.success(res.message)
            await fetchTableData();
            props.setToggle();
        }
        else if(!res.ok)toast.error(res.message)
        else toast.error("Something Went Wrong");
    };

    return(
        <>
				<ToastContainer/>
        <Modal overflow={true} open={props.toggle} onClose={props.setToggle}>
        <Modal.Header>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Stack direction="column" alignItems="center" spacing={20}>
                <Stack.Item>
                    <label>Email</label>
                    <Input onChange={(e)=>changeEmail(e)} placeholder="Email" className={cx('popupInput')}/>
                </Stack.Item>

                <Stack.Item>
                    <label>First Name</label>
                    <Input onChange={(e)=>changeFirstName(e)} placeholder="First Name" className={cx('popupInput')}/>
                </Stack.Item>

                <Stack.Item>
                    <label>Last Name</label>
                    <Input onChange={(e)=>changeLastName(e)} placeholder="Last Name" className={cx('popupInput')}/>
                </Stack.Item>

                <Stack.Item>
                    <label>Date of Birth</label>
                    <DatePicker value={dateOfBirth}  onChangeCalendarDate={(e)=>changeDateOfBirth(e)} onEntered={()=>changeDateOfBirth(new Date(2010,11,1))} limitEndYear={2011} editable={true} disabledDate={(date)=>{return (!date || date>(new Date(2011,0,1)));}}  onChange={(e)=>changeDateOfBirth(e)}	  placeholder="Date of Birth" className={cx('datePicker')} />
                </Stack.Item>
            </Stack>
        </Modal.Body>
        <Modal.Footer>
        <Button className={cx('popupCancel')} onClick={props.setToggle}  >Cancel</Button>
        <Button className={cx('popupSubmit')} onClick={handleSubmit}  >Add</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
}

export default AddUserPopup;
