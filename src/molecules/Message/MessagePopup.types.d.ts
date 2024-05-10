export declare namespace TypeAttributes {
    type Status = 'success' | 'warning' | 'error' | 'info';
}

interface MessagePopupProps{
    type: Status,
    head:string,
    message:string
}