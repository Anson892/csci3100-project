import React from 'react'
import './DeleteUserForm.css'
import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import { SubmitButton } from '../SumbitButton/SubmitButton'


export const DeleteUserForm = () => {

    const [userId, setUserId] = useState();

    const handleSubmit = () => {
        return
    }

    return (
        <div className="delete-user-form">
            <h1>Delete User</h1>
            <TextInput type="text" onChange={(e)=>{setUserId(e.target.value)}}>UserID</TextInput>
            <div className="form-button">
                <SubmitButton onClick={handleSubmit}>Delete User</SubmitButton>
            </div>
        </div>
    )
}
