import { useEffect, useState } from 'react';
import styles from './EditOrganisationPopup.module.scss';
import { EditOrganisationPopupProps } from './EditOrganisationPopup.types';
import { Input,Button,Stack, InputNumber,Modal,SelectPicker } from 'rsuite';
import { editOrganisation,getOrganisationUsers,requestSystemUserOrganisations } from '../../services/SystemUserApi';
import Cookies from 'js-cookie';
import {SystemOrganisationDataTableResponseObject} from './EditOrganisationPopup.types';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

const cx=classNames.bind(styles);

function EditOrganisationPopup(props:EditOrganisationPopupProps){

    const email=Cookies.get('email');
    const token=Cookies.get('token');

		const [users,changeUsers]=useState<string[]>([''])

    const [organisationUniqueName,changeOrganisationUniqueName]=useState<string>(props.organisationUniqueName);
    const [organisationDisplayName,changeOrganisationDisplayName]=useState<string>(props.organisationDisplayName);
    const [organisationAdmin,changeOrganisationAdmin]=useState<string|undefined>(props.organisationAdmin);
    // const [organisationAdmin2,changeOrganisationAdmin2]=useState<string|undefined>(props.organisationAdmin);
    const [maxWfh,changeMaxWfh]=useState<number>(props.organisationMaxWfh);

		// const setOrganisationAdmin2=(value:string)=>{changeOrganisationAdmin2(value);console.log(organisationAdmin2)}

    const fetchTableData =async (email:string)=>{
        console.log("Fetching Table Data");
        const res:SystemOrganisationDataTableResponseObject=await requestSystemUserOrganisations(props.page,props.limit,token);
        // console.log("res",email,res)
        if(res.status===200)props.changeData(res.data);
        else toast.error(res.message)
    }

		const fetchUsers=async ()=>{
			const res=await getOrganisationUsers(props.organisationUniqueName,token);
			if(res.status===200)changeUsers(res.data);
			else toast.error(res.message)
			// console.log("res2",res)
		}

		useEffect(()=>{fetchUsers()},[])

    const handleSubmit=async()=>{
        if(!organisationUniqueName.length || !organisationDisplayName.length ){
            toast.error("Credentials Missing");
            return;
        }
				var obj;
				if(!organisationAdmin){
						obj={
							organisationUniqueName:props.organisationUniqueName,
							organisationNewUniqueName:organisationUniqueName,
							organisationNewDisplayName:organisationDisplayName,
							organisationNewAdmin:undefined,
							organisationNewMaxWfh:maxWfh
						}
				}
				else {
						obj={
							organisationUniqueName:props.organisationUniqueName,
							organisationNewUniqueName:organisationUniqueName,
							organisationNewDisplayName:organisationDisplayName,
							organisationNewAdmin:organisationAdmin,
							organisationNewMaxWfh:maxWfh
						}
				}

        // console.log(obj);
        const res=await editOrganisation(obj,token);
        if(res.status===200){
            toast.success(res.message)
            await fetchTableData(`${props.email}`);
            props.setToggle();
        }
        else if(res.status===400)toast.error(res.message);
        else toast.error("Something went wrong")
    };

    return(
        <>
        <ToastContainer/>
        <Modal overflow={true} open={props.toggle} onClose={props.setToggle}>
        <Modal.Header>
          <Modal.Title>Edit Organisation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack direction="column" alignItems="center" spacing={20}>
                <Stack.Item>
                    <label>Organisation Unique Name</label>
                    <Input value={organisationUniqueName} onChange={(e)=>changeOrganisationUniqueName(e)}  placeholder="Organisation Unique Name" className={cx('popupInput')}/>
                </Stack.Item>

                <Stack.Item>
                    <label>Organisation Display Name</label>
                    <Input value={organisationDisplayName} onChange={(e)=>changeOrganisationDisplayName(e)}  placeholder="Organisation Display Name" className={cx('popupInput')}/>
                </Stack.Item>

                {/* <Stack.Item>
                    <label>Admin</label>
                    <Input value={organisationAdmin} onChange={(e)=>changeOrganisationAdmin(e)}  placeholder="Organisation Admin" className={cx('popupInput')}/>
                </Stack.Item> */}

								<Stack.Item>
                    <label>Admin</label>
										<SelectPicker value={organisationAdmin} onChange={(e:string|null)=>changeOrganisationAdmin(`${e}`)} onClean={()=>changeOrganisationAdmin('')} data={users.map(item => ({ label: item, value: item }))} searchable={true}  placeholder="Select Admin" className={cx('popupInput')} />
                </Stack.Item>

                <Stack.Item>
                    <label>Max WFH Days</label>
                    <InputNumber min={0} value={maxWfh} onChange={(e)=>changeMaxWfh(Number(e))} defaultValue={0} placeholder="Max WFH Days" className={cx('popupInputNumber')}/>
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

export default EditOrganisationPopup;
