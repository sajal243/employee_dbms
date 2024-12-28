import "./App.css";
import { EMPLOYEE_DATA } from "./constants/employee";
import { useEffect, useState } from "react";

function App() {
    const [employeeList, setEmployeeList] = useState(EMPLOYEE_DATA);
    // let employeeList = EMPLOYEE_DATA;
    const [currEmp, setCurrEmp] = useState({});
    const [newEmp, setNewEmp] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contact: "",
        address: "",
        dob: "",
    });
    const [showModal, setShowModal] = useState(false);
    const showEmployee = (id) => {
        if(currEmp?.id === id)  return;
        const emp = employeeList?.find((item) => item?.id == id);
        setCurrEmp(emp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!newEmp.first_name || !newEmp.last_name || !newEmp.address || !newEmp.contact || !newEmp.dob || !newEmp.email){
            alert("Please fill all the fields!");
            return;
        }
        const newId = employeeList[employeeList.length - 1]?.id + 1 || "0";
        const temp = {
            ...newEmp,
            id: newId.toString(),
            salary: "",
            full_name: newEmp?.first_name + " " + newEmp?.last_name,
        };

        const emp_list = JSON.parse(localStorage.getItem("emp_list"));
        emp_list.push(temp);

        localStorage.setItem("emp_list", JSON.stringify(emp_list));

        setEmployeeList(emp_list);
        setShowModal(false);
    };

    const handleDelete = (id) => {
        const temp = JSON.parse(localStorage.getItem("emp_list"));
        let emp_list = temp?.filter((item) => (item?.id !== id));
        localStorage.setItem("emp_list", JSON.stringify(emp_list));
        setEmployeeList(emp_list);
    }

    useEffect(() => {
        if(!localStorage.getItem("emp_list")){
            localStorage.setItem("emp_list", JSON.stringify(EMPLOYEE_DATA));
        }
        setCurrEmp(employeeList[0])
    }, [])

    return (
        <div className="root">
            <header>
                <h2>Employee Database Management System</h2>
            </header>

            <div className="add_new">
                <button className="add_btn" onClick={() => setShowModal(true)}>
                    Add Employee
                </button>
            </div>

            <div className="dashboard">
                {!!employeeList && (
                    <div className="employee_list">
                        <h4>Employee List</h4>
                        {employeeList?.map((data, idx) => (
                            <div
                                key={data?.id}
                                className={`employee_div ${currEmp?.id === data?.id ? "selected": ""}`} 
                                onClick={() => showEmployee(data?.id)}
                            >
                                <div>{data?.full_name}</div>
                                <button className="delete_btn" onClick={() => handleDelete(data?.id)}>X</button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="employee_details">
                    <h4>Employee Info</h4>
                    <div className="info">
                        {Object.keys(currEmp)
                            .filter(
                                (item) =>
                                    ![
                                        "id",
                                        "first_name",
                                        "last_name",
                                        "salary",
                                    ].includes(item)
                            )
                            .map((item) => {
                                return <div>{currEmp[item]}</div>;
                            })}
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="add_employee">
                    <button className="close_btn" onClick={() => setShowModal(false)}>X</button>
                    <h3>Add New Employee</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <input
                                type="text"
                                placeholder="Enter First Name"
                                onChange={(e) =>
                                    setNewEmp({
                                        ...newEmp,
                                        first_name: e.target.value,
                                    })
                                }
                                required
                            />
                            <input
                                type="text"
                                placeholder="Enter Last Name"
                                onChange={(e) =>
                                    setNewEmp({
                                        ...newEmp,
                                        last_name: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="row">
                            <input
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) =>
                                    setNewEmp({
                                        ...newEmp,
                                        email: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="row">
                            <input
                                type="number"
                                placeholder="Enter mobile no."
                                onChange={(e) =>
                                    setNewEmp({
                                        ...newEmp,
                                        contact: e.target.value,
                                    })
                                }
                                required
                            />
                            <input
                                type="date"
                                onChange={(e) =>
                                    setNewEmp({
                                        ...newEmp,
                                        dob: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="row">
                            <input
                                type="text"
                                placeholder="Enter address"
                                onChange={(e) =>
                                    setNewEmp({
                                        ...newEmp,
                                        address: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <button type="submit">Add</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default App;
