import { useState } from 'react';
import styles from './CreateOrganisationPopup.module.scss';
import { Input,Button,Stack, InputNumber,Modal } from 'rsuite';
import { createOrganisation, requestSystemUserOrganisations } from '../../services/SystemUserApi';
import Cookies from 'js-cookie';
import {CreateOrganisationPopupProps,SystemOrganisationDataTableResponseObject} from './CreateOrganisationPopup.types';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

const cx=classNames.bind(styles);

function CreateOrganisationPopup(props:CreateOrganisationPopupProps){

    const token=Cookies.get('token');

    const [organisationUniqueName,changeOrganisationUniqueName]=useState<string>("");
    const [organisationDisplayName,changeOrganisationDisplayName]=useState<string>("");
    const [maxWfh,changeMaxWfh]=useState<number>(0);

    const fetchTableData =async ()=>{
        console.log("Fetching Table Data");
        const res:SystemOrganisationDataTableResponseObject=await requestSystemUserOrganisations(token);
        // console.log("res",res)
        if(res.status===200)props.changeData(res.data);
        else toast.error(res.message);
    }


    const handleSubmit=async ()=>{
        if(!organisationUniqueName.length || !organisationDisplayName.length){
            toast.error("Credentials Missing");
            return;
        }
        
        const obj={
            organisationUniqueName:organisationUniqueName,
            organisationDisplayName:organisationDisplayName,
            organisationMaxWfh:maxWfh
        }
        const res=await createOrganisation(obj,token);
        if(res.status===200){
            toast.success(res.message)
            toast.success(res.message)
            await fetchTableData();
            props.setToggle();
        }
        else if(res.status===400)toast.error(res.message);
        else toast.error("Something went wrong");
    };

    return(
        <>
        <ToastContainer/>
        <Modal overflow={true} open={props.toggle} onClose={props.setToggle}>
            <Modal.Header>
            <Modal.Title>Create Organisation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Stack direction="column" alignItems="center" spacing={20}>
                <Stack.Item>
                    <label>Organisation Unique Name</label>
                    <Input onChange={(e)=>changeOrganisationUniqueName(e)}  placeholder="Organisation Unique Name" className={cx('popupInput')}/>
                </Stack.Item>

                <Stack.Item>
                    <label>Organisation Display Name</label>
                    <Input onChange={(e)=>changeOrganisationDisplayName(e)}  placeholder="Organisation Display Name" className={cx('popupInput')}/>
                </Stack.Item>

                <Stack.Item>
                    <label>Max WFH Days</label>
                    <InputNumber onChange={(e)=>changeMaxWfh(Number(e))} defaultValue={0} placeholder="Max WFH Days" className={cx('popupInputNumber')}/>
                </Stack.Item>
            </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button className={cx('popupCancel')} onClick={props.setToggle}  >Cancel</Button>
                <Button className={cx('popupSubmit')} onClick={handleSubmit} >Create</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default CreateOrganisationPopup;