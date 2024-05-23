import { Heading, IconButton } from 'rsuite';
import styles from './PageHeader.module.scss';

import Icon from '../../atoms/Icon/index';

import filterIcon from '../../resources/filter.png'
import plusIcon from '../../resources/plusIcon.png';
import { useState } from 'react';

import { PageHeaderProps,TypeAttributes } from './PageHeader.types';

import MessagePopup from '../Message/MessagePopup';
import CreateOrganisationPopup from '../../organisms/CreateOrganisationPopup/index';
import AddUserPopup from '../../organisms/AddUserPopup/index';

import classNames from 'classnames/bind';
import FilterPopup from '../../organisms/FilterPopup/index';
import Cookies from 'js-cookie';

const cx=classNames.bind(styles);

function PageHeader (props:PageHeaderProps){


    const [toggleCreateOrganisation,changeToggleCreateOrganisation]=useState<boolean>(false);
    const [toggleAddUser,changeToggleAddUser]=useState<boolean>(false);
    const [toggleFilter,changeToggleFilter]=useState<boolean>(false);
    const [toggleMessage,changeToggleMessage]=useState<boolean>(false);


    const [messageType,changeMessageType]=useState<TypeAttributes.Status>('info');
    const [messageHead,changeMessageHead]=useState<string>("");
    const [messageMessage,changeMessageMessage]=useState<string>("");

    const setToggleCreateOrganisation=()=>{changeToggleCreateOrganisation(!toggleCreateOrganisation);};
    const setToggleAddUser=()=>{changeToggleAddUser(!toggleAddUser);};
    const setToggleFilter=()=>changeToggleFilter(!toggleFilter);
    const setToggleMessage=(type:TypeAttributes.Status, head:string, message:string)=>{
        changeToggleMessage(true);
        changeMessageType(type);
        changeMessageHead(head);
        changeMessageMessage(message);
        setTimeout(()=>changeToggleMessage(false),1000);
    }

    const handleToggle=()=>{
        if(props.toggleWhat==='addUser') setToggleAddUser();
        else if(props.toggleWhat==='createOrganisation') setToggleCreateOrganisation();
    }

    return(
        <>
        {toggleMessage?<MessagePopup type={messageType} head={messageHead} message={messageMessage}/>:<></>}
        {toggleCreateOrganisation?
                <CreateOrganisationPopup limit={props.limit} page={props.page} toggle={toggleCreateOrganisation} changeData={props.changeData}  setToggle={setToggleCreateOrganisation} setMessage={setToggleMessage}  />
        :<></>}
        {toggleAddUser?
                <AddUserPopup limit={props.limit} page={props.page} toggle={toggleAddUser}  changeData={props.changeData} organisation={props.organisation} setToggle={setToggleAddUser} setMessage={setToggleMessage}  />
        :<></>}
        {toggleFilter?
                <FilterPopup page={props.page} limit={props.limit} setPage={props.setPage} setLimit={props.setLimit} toggle={toggleFilter}  changeData={props.changeData} changeIsFilterPending={props.changeIsFilterPending} setToggle={setToggleFilter} setMessage={setToggleMessage}  />
        :<></>}
        <div className={cx('pageHeaderDiv')}>
            <div onClick={setToggleFilter} >{Cookies.get('userType')==='admin'?<IconButton icon={<Icon icon={filterIcon} altText='filter' width={25} />} className={cx('pageHeaderIconButton')} />:<></>}</div>
            <Heading level={3} className={cx('pageHeaderHeading')} >{props.pageHeading}</Heading>
            {props.addbutton?<IconButton onClick={handleToggle} className={cx('pageHeaderIconButton')} appearance='primary' color='blue'> <Icon icon={plusIcon} altText='Sort Icon' width={15} /> <span className={cx('pageHeaderIconText')}>{props.addButtonText}</span></IconButton>:<div></div>}
        </div>
        </>
    );
}

export default PageHeader;
