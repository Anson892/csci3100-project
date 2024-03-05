import React from 'react'
import './AddUserForm.css'
import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import { SubmitButton } from '../SumbitButton/SubmitButton'


export const AddUserForm = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        return
    }

    return (
        <div className="add-user-form">
            <h1>Add User</h1>
            <TextInput type="text" onChange={(e)=>{setUsername(e.target.value)}}>Username</TextInput>
            <TextInput type="password" onChange={(e)=>{setPassword(e.target.value)}}>Password</TextInput>
            <div className="form-button">
                <SubmitButton onClick={handleSubmit}>Add User</SubmitButton>
            </div>
        </div>
    )
}
