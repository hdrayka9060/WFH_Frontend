import { Heading, IconButton } from 'rsuite';
import styles from './PageHeader.module.scss';

import Icon from '../../atoms/Icon/Icon';

import sortIcon from '../../resoruces/sort.png'
import plusIcon from '../../resoruces/plusIcon.png';


function PageHeader (props:PageHeaderProps){
    return(
        <div className={styles.pageHeaderDiv}>
            <IconButton icon={<Icon icon={sortIcon} altText='Sort Icon' width={25} />} className={styles.pageHeaderIconButton} />
            <Heading level={3} className={styles.pageHeaderHeading} >{props.pageHeading}</Heading>
            <IconButton className={styles.pageHeaderIconButton} appearance='primary' color='blue'> <Icon icon={plusIcon} altText='Sort Icon' width={15} /> <span className={styles.pageHeaderIconText}>{props.addButtonText}</span></IconButton>
        </div>
    );
}

export default PageHeader;