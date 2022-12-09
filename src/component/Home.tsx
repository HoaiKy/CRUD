import './Home.css'
import {useState} from "react";
import {dummyEmployeeList, IEmployee, PageEnum} from "./Employee.type";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import LinkEmployee from "./LinkEmployee";
import Button from "@mui/material/Button";
import SearchAppBar from "./SearchAppBar";

const Home = () =>{
    const [employeeList, setEmployeeList] = useState(dummyEmployeeList as IEmployee[]);
    const [shownPage, setShownPage] = useState(PageEnum.list)
    const [dataToEdit,setDataToEdit] = useState({} as IEmployee)
    const [dataToLink,setDataToLink] = useState(PageEnum.link)
    const onAddEmployeeClickHnd = ()=>{
        setShownPage(PageEnum.add);
    }
    const showListPage = ()=>{
        setShownPage(PageEnum.list)
    }
    const linkEmployee = (data:IEmployee)=>{
        setShownPage(PageEnum.link)
        // setDataToLink(data)
    }
    const  addEmployeeHnd = (data: IEmployee)=>{
        setEmployeeList([...employeeList,data])
    }
    const deleteEmployee = (data: IEmployee)=>{
        const indexToDelete = employeeList.indexOf(data);
        const tempList = [...employeeList]

        tempList.splice(indexToDelete, 1);
        setEmployeeList(tempList)
    }
    const editEmployee = (data:IEmployee)=>{
        setShownPage(PageEnum.edit);
        setDataToEdit(data)
    }
    const updateData = (data: IEmployee)=>{
        const filteredData = employeeList.filter(x=>x.id === data.id)[0]
        const indexOfRecord = employeeList.indexOf(filteredData);
        const tempData = [...employeeList]
        tempData[indexOfRecord] = data;
        setEmployeeList(tempData)
    }

    return (<>
            <div>
                <SearchAppBar/>
            </div>
        <section className="section-content">
            {shownPage === PageEnum.list &&(
                <>
                    <Button style={{marginTop:'10px',marginBottom:'10px', marginLeft:'80%'}} variant={"contained"} onClick={onAddEmployeeClickHnd}>Add Employee</Button>
                    <EmployeeList list={employeeList} onDeleteClickHnd={deleteEmployee} onEdit={editEmployee} onLinkClickHnd={linkEmployee}/>
                </>
            )}
            {shownPage === PageEnum.add && <AddEmployee onBackBtnClickHnd={showListPage} onSubmitClickHnd={addEmployeeHnd}/>}
            {shownPage === PageEnum.link && <LinkEmployee/>}
            {shownPage === PageEnum.edit && <EditEmployee data={dataToEdit} onBackBtnClickHnd={showListPage} onUpdateClickHnd={updateData}/>}
        </section>
    </>
    )
}
export default Home;