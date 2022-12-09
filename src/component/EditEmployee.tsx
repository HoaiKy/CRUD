import React, {useState} from "react";
import {IEmployee} from "./Employee.type";
import Button from "@mui/material/Button";
import './EmployeeFormStyle.css'
import {Alert, Box, Input, InputLabel, TextField} from "@mui/material";
import {Resolver, useForm} from "react-hook-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
type Props ={
    onBackBtnClickHnd:()=>void;
    data: IEmployee
    onUpdateClickHnd:(data: IEmployee)=>void;
}
type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
};

const EditEmployee=(props: Props)=>{
    const {data,onBackBtnClickHnd,onUpdateClickHnd} = props;
    const [firstName, setFirstName] = useState(data.firstName)
    const [lastName, setLastName] = useState(data.lastName)
    const [email, setEmail] = useState(data.email)
    const [open, setOpen] = React.useState(false);
    const onFirstNameChange = (e: any)=>{
        setFirstName(e.target.value)
    }
    const onLastNameChange = (e: any)=>{
        setLastName(e.target.value)
    }
    const onEmailChange = (e: any)=>{
        setEmail(e.target.value)
    }
    const handleClose = () => {
        setOpen(false);

    };
    const onSubmitBtnClickHnd = (e: any)=>{
        e.preventDefault();
        const updateData: IEmployee = {
            id: data.id,
            firstName: firstName,
            lastName: lastName,
            email:email
        }
        onUpdateClickHnd(updateData);
        setOpen(true);
        setFirstName(" ");
        setLastName("");
        setEmail("");
    }
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        // resolver:resolver1

    });
    return(
        <div>
            <form className="form-container" onSubmit={handleSubmit(onSubmitBtnClickHnd)}>
                <h3>Edit Employee</h3>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Input defaultValue={"First Name"} value={firstName} readOnly={true}  onChange={onFirstNameChange}/><br/>
                    {/*<TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={onFirstNameChange} read/><br/>*/}
                    <TextField id="filled-basic" label="Last Name" variant="filled" value={lastName} {...register("lastName",{required:true,onChange:(e)=>{setLastName(e.target.value)}})} /><br/>
                    {errors.lastName && (
                        <div style={{marginLeft:'41.5%'}}>
                            <Alert severity="error" sx={{ mt: 2, padding: '5px' }}>
                                Last name is required
                            </Alert>
                        </div>
                    )}
                    <TextField id="standard-basic" label="Email" variant="filled" value={email} {...register("email",{required:true,onChange:(e)=>{setEmail(e.target.value)}})}  />
                    {errors.email && (
                        <div style={{marginLeft:'41.5%'}}>
                            <Alert severity="error" sx={{ mt: 2, padding: '5px' }}>
                                Email is required
                            </Alert>
                        </div>
                    )}
                </Box>
                <div>
                    <Button variant={"contained"} onClick={onBackBtnClickHnd}>Back</Button>
                    <Button variant={"outlined"} type={"submit"} color={'success'}>Edit Employee</Button>
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
                                Sửa nhân viên thành công
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

        </div>
    )
}
export default EditEmployee