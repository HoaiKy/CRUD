import './EmployeeFormStyle.css'
import {useState} from "react";
import {IEmployee} from "./Employee.type";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {Alert, Box, Input, Stack, TextField} from "@mui/material";
import {Resolver, useForm} from "react-hook-form";
import { useFormik } from 'formik'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
};

type Props = {
    onBackBtnClickHnd:()=>void;
    onSubmitClickHnd: (data: IEmployee)=>void
}

const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: !values.firstName ? {} : values,
        errors: !values.firstName
            ? {
                firstName: {
                    type: "required",
                    message: "This is required."
                }
            }
            : {}
    };
};
const AddEmployee=(props: Props)=>{
    const [open, setOpen] = React.useState(false);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const {onBackBtnClickHnd,onSubmitClickHnd} = props
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        // resolver:resolver1
    });
    // const onFirstNameChange = (e: any)=>{
    //     setFirstName(e.target.value)
    // }
    // const onLastNameChange = (e: any)=>{
    //     setLastName(e.target.value)
    // }
    // const onEmailChange = (e: any)=>{
    //     setEmail(e.target.value)
    // }
    const onSubmitBtnClickHnd = (e: any)=>{
        const data: IEmployee = {
            id: new Date().toJSON(),
            firstName: firstName,
            lastName: lastName,
            email:email
        }
        if(!data.firstName|| !data.lastName|| !data.email){
            return;
        }
        onSubmitClickHnd(data);
        setOpen(true);
        setFirstName(" ");
        setLastName("");
        setEmail("");
    }
    const handleClose = () => {
        setOpen(false);

    };

    return(
        <>
            <form id="form" className="form-container"  onSubmit={handleSubmit(onSubmitBtnClickHnd)} >
                <h3>Add Employee</h3>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField label="First Name" {...register('firstName',{required:true,onChange:(e)=>{setFirstName(e.target.value)}})} /><br/>
                    {errors.firstName && (
                        <div style={{marginLeft:'41.5%'}}>
                        <Alert severity="error" sx={{ mt: 2, padding: '5px' }}>
                            First name is required
                        </Alert>
                        </div>
                    )}
                    <TextField label="Last Name" {...register("lastName",{required:true,onChange:(e)=>{setLastName(e.target.value)}})} /><br/>
                    {errors.lastName && (
                        <div style={{marginLeft:'41.5%'}}>
                            <Alert severity="error" sx={{ mt: 2, padding: '5px' }}>
                                Last name is required
                            </Alert>
                        </div>
                    )}
                    <TextField type="email" id="standard-basic" {...register("email",{required:true,onChange:(e)=>{setEmail(e.target.value)}, pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }})} label="Email" variant="standard" value={email} />
                    {errors.email && (
                        <div style={{marginLeft:'41.5%'}}>
                            <Alert severity="error" sx={{ mt: 2, padding: '5px' }}>
                                {errors.email && errors.email.message}
                            </Alert>
                        </div>
                    )}
                </Box>
                <div>
                    <Button type={"button"} onClick={onBackBtnClickHnd}>Back</Button>
                    <Button type={"submit"} >Add Employee</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Thông báo"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Thêm nhân viên thành công
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {/*<Button onClick={handleClose}>Hủy</Button>*/}
                            <Button onClick={handleClose} autoFocus>
                                Đóng
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </form>
        </>
    )
}
export default AddEmployee;