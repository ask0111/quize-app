import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";


export default function UserProfile(){
    const navigate = useNavigate();
    const [user, setUser] = useState();


    

    const handleEdit = ()=>{
        navigate('/edit');
    }

    const logout = async()=>{
        const res = await axios({
            method: 'GET',
            url: '/logout',
        })
        if(res.data == 'LO'){
            navigate('/')
        }
    }

    const getData = async()=>{
        const res = await axios({
            method: 'GET',
            url: '/help'
        });
        setUser(res.data.user);
    }

    useEffect(()=>{
        getData();
    }, [])

    if(!user){
        return (<div>
            Login First
        </div>)
    }else{
        return(<>

    
            <h1>{"Name: " }</h1>
            <h2>{"city: " }</h2>
            <h3>{"job: " }</h3>
            <Button onClick={handleEdit}>Edit Profile<EditIcon/></Button>
            <br></br>
            <Button color="warning" onClick={logout}>Logout</Button>
    </>)
    }
}