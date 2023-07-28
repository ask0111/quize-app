import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

export default function UserProfile(){
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const handleEdit = ()=>{
        navigate('/edit');
    }

    const logout = async() =>{
        const resp = await axios({
            url:'/logout',
            method : 'GET'
        });
        if(resp.data === 'LO'){
            navigate('/');
        }
        
        
    }
    const getData = async() =>{
        console.log('sending request');
        const resp = await axios({
            method : 'GET',
            url : '/help'
        });
        console.log(resp.data);
        console.log(resp.data.user);
        setUser(resp.data.user);
    }
     useEffect(()=>{
        getData();
     }, [])
    
    if(!user){
        return <div>
            Login First
        </div>
    }
    else{
        return <div>
            <h1>name : {user.name}</h1>
            <h2>city : {user.city}</h2>
            <h3>job : {user.job} </h3>
            <Button onClick={handleEdit}>Edit Profile<EditIcon/></Button>
            <br></br>
            <Button color="warning" onClick={logout}>Logout</Button>
        </div>
    }
}