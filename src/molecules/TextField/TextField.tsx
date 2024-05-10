import styles from './TextField.module.scss'

import { Form} from 'rsuite';

export default function (props:TextFieldProps) {
    const { name, label, accepter, ...rest } = props;
    return (
      <Form.Group controlId={`${name}-3`}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control name={name} accepter={accepter} {...rest} />
      </Form.Group>
    );
  }