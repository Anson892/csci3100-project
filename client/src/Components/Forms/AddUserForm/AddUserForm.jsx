import React from 'react'
import './AddUserForm.css'
import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import { SubmitButton } from '../SubmitButton/SubmitButton'
import { DropDownMenu } from '../DropDownMenu/DropDownMenu'


export const AddUserForm = ({ reloadFunc }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("user");
    const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
    const [isUsernameExist, setIsUsernameExist] = useState(true);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [data, setData] = useState([])

    const handleSubmit = () => {
        username == "" ?
            setIsUsernameEmpty(true)
        :
            setIsUsernameEmpty(false)
        password == "" ?
            setIsPasswordEmpty(true)
        :
            setIsPasswordEmpty(false)
        
        if (!isUsernameEmpty && !isPasswordEmpty) {
            fetch("http://localhost:8080/api/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "userTpye": userType
                })
            }
            )
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.message != undefined) {
                    setIsUsernameExist(false);
                    setIsUsernameEmpty(false);
                    setIsPasswordEmpty(false);
                    reloadFunc();
                    alert(data.message);
                }
                else if (data.error != undefined) {
                    if (data.error == "username already in use!") {
                        setIsUsernameExist(true);
                    }
                    else {
                        alert("Unknow error occurrs!")
                        setIsUsernameExist(false);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    return (
        <div className="add-user-form">
            <h1>Add User</h1>
            <TextInput type="text" onChange={(e)=>{setUsername(e.target.value)}}>Username</TextInput>
            {isUsernameEmpty ? <p className="alert-text">* Username is empty.</p> : null}
            {isUsernameExist ? <p className="alert-text">* Username alreadt exist.</p> : null}
            <TextInput type="password" onChange={(e)=>{setPassword(e.target.value)}}>Password</TextInput>
            {isPasswordEmpty ? <p className="alert-text">* Password is empty.</p> : null}
            <p>User Type</p>
            <DropDownMenu
                items={["customer", "admin"]}
                initial={0}
                setFucn={setUserType}
                menuHeight={"40px"}
            />
            <div className="form-button">
                <SubmitButton onClick={handleSubmit}>Add User</SubmitButton>
            </div>
        </div>
    )
}
