import styles from './RequestStatusPopup.module.scss';
import { RequestStatusPopupProps } from './RequestStatusPopup.types';
import { Button,Stack,Modal } from 'rsuite';
import classNames from 'classnames/bind';

const cx=classNames.bind(styles);

function RequestStatusPopup(props:RequestStatusPopupProps){
    return(
        <Modal overflow={true} open={props.toggle} onClose={props.setToggle}>
        <Modal.Header>
          <Modal.Title>WFH Request Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack direction="column" alignItems="flex-start" spacing={20}>
                <Stack.Item>
                    <label className={cx('popupLable')}><span className={cx('popupLableSpan')}>Availed At:</span> {props.availedAt.toLocaleDateString()}</label>
                </Stack.Item>

                <Stack.Item>
                    <label className={cx('popupLable')}><span className={cx('popupLableSpan')}>Created At:</span> {props.createdAt.toLocaleDateString()}</label>
                </Stack.Item>

                <Stack.Item>
                    <label className={cx('popupLable')}><span className={cx('popupLableSpan')}>Request Status:</span> {props.requestStatus}</label>
                </Stack.Item>

                <Stack.Item>
                    <label className={cx('popupLable')}><span className={cx('popupLableSpan')}>Request Rejection Reason:</span> {props.rejectionReason}</label>
                </Stack.Item>

                <Stack.Item>
                    <label className={cx('popupLable')}><span className={cx('popupLableSpan')}>Request Approval At:</span> {props.approvalAt.getDate()}-{props.approvalAt.getMonth()+1}-{props.approvalAt.getFullYear()}</label>
                </Stack.Item>
            </Stack>
            </Modal.Body>
        <Modal.Footer>
            <Button className={cx('popupCancel')} onClick={props.setToggle} >Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default RequestStatusPopup;