// import './EmployeeFormStyle.css'
import "./EmployeeModalStyle.css"
import {IEmployee} from "./Employee.type";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
type Props={
    onClose:()=>void;
    data: IEmployee
}

const EmployModal=(props: Props)=>{
    const {onClose,data} = props
    return(
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h3>Employee Detail</h3>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{data.firstName}</TableCell>
                                    <TableCell>{data.lastName}</TableCell>
                                    <TableCell>{data.email}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                </div>

            </div>
        </>
    )
}
export default EmployModal;