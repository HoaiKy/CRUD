import './EmployeeListStyle.css'
import {IEmployee} from "./Employee.type";
import EmployModal from "./EmployModal";
import React, {useEffect, useState} from "react";
import {Icon, Pagination, Stack} from "@mui/material";
import {AccountBoxOutlined, AutoFixHigh, RemoveCircleOutline} from "@mui/icons-material";
import Button from "@mui/material/Button";
// import { DataGrid, GridColDef } from '@mui/x-data-grid';

type Props = {
    list: IEmployee[];
    onDeleteClickHnd: (data: IEmployee)=>void;
    onEdit: (data: IEmployee)=>void;
    onLinkClickHnd:(data: IEmployee)=>void;
}
// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }
//
// type Order = 'asc' | 'desc';
//
// function getComparator<Key extends keyof any>(
//     order: Order,
//     orderBy: Key,
// ): (
//     a: { [key in Key]: number | string },
//     b: { [key in Key]: number | string },
// ) => number {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }
// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//     const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }
 const EmployeeList = (props: Props)=>{
        const {list, onDeleteClickHnd,onEdit,onLinkClickHnd} = props;
        const [showModal,setShowModal] = useState(false)
        const [dataToShow, setDataToShow] = useState(null as IEmployee | null)
        const viewEmployee=(data: IEmployee)=>{
            setDataToShow(data)
            setShowModal(true)
        }
        const onCloseModal=()=> setShowModal(false);
        return (
            <>
            <div>
                <table>
                    <tr>
                        <th>FirstName</th>
                        <th >LastName</th>
                        <th >Email</th>
                        <th>Action</th>
                    </tr>
                    {list.map((employee)=>{
                        return(
                            <tr key={employee.id}>
                                {/*<td><input type={"checkbox"}/></td>*/}
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <div>
                                        <Button type={"button"}  onClick={() => viewEmployee(employee)}><AccountBoxOutlined/></Button>
                                        <Button type={"button"}  onClick={()=> onEdit(employee)}><AutoFixHigh/></Button>
                                        <Button type={"button"}  onClick={()=>onDeleteClickHnd(employee)}><RemoveCircleOutline/></Button>
                                        <Button type={"button"}  onClick={()=>onLinkClickHnd(employee)}>Link</Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </table>
                {/*<Stack style={{marginTop:'1rem',marginLeft:'73%'}} spacing={2}>*/}
                {/*    <Pagination count={10} color="primary" />*/}
                {/*</Stack>*/}
                {showModal && dataToShow !== null && <EmployModal onClose={onCloseModal} data={dataToShow}/>}
            </div>
            </>
        )
}
export default EmployeeList;