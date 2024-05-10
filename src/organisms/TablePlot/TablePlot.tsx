import { Table,Button } from 'rsuite';
import styles from './TablePlot.module.scss';
import Icon from '../../atoms/Icon/Icon';

function TablePlot (props:TablePlotProps){
    const { Column, HeaderCell, Cell } = Table;

    const data=[
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
        {'col1':1,'col2':"Blitzscale Technology",'col3':"ShopDeck",'col4':"Harsh",'col5':10,'col6':"edit",'col7':"view",'col8':"delete"},
    ]

    const head=["Id", "Unique Name", "Display Name", "Admin", "Max WFH", "Edit", "View", "Delete"];
    
    return(
        <div className={styles.tablePlotDiv}>
            <Table
                className={styles.tablePlotTable}
                height={400}
                data={data}
                onRowClick={rowData => {
                    console.log(rowData);
                }}
                >
                <Column width={150} align="center" fixed>
                    <HeaderCell>{head[0]}</HeaderCell>
                    <Cell dataKey="col1" />
                </Column>

                <Column width={250}>
                    <HeaderCell>{head[1]}</HeaderCell>
                    <Cell dataKey="col2" />
                </Column>

                <Column width={250}>
                    <HeaderCell>{head[2]}</HeaderCell>
                    <Cell dataKey="col3" />
                </Column>

                <Column width={250}>
                    <HeaderCell>{head[3]}</HeaderCell>
                    <Cell dataKey="col4" />
                </Column>

                <Column width={150}>
                    <HeaderCell>{head[4]}</HeaderCell>
                    <Cell dataKey="col5" />
                </Column>

                <Column width={150}>
                    <HeaderCell>{head[5]}</HeaderCell>
                    <Cell dataKey="col6" />
                </Column>

                <Column width={150}>
                    <HeaderCell>{head[6]}</HeaderCell>
                    <Cell dataKey="col7" />
                </Column>

                <Column width={150}>
                    <HeaderCell>{head[7]}</HeaderCell>
                    <Cell dataKey="col8" />
                </Column>
            </Table>
        </div>
    );
}

export default TablePlot;