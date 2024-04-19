import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import ModalUser from "../components/ModalUser.jsx";

import {
  Button,
  Form,
  Input
} from 'antd';

const { TextArea } = Input;


const Users = () => {

  const [users, setUsers] = useState(null);
  const [actions, setActions] = useState(null);
  
  const [filterUser, setFilterUser] = useState({text:''});

  useEffect(() => {
    getUsers()
//    alert('a')
    getActions()
  }, []);

  const getTheme = (e) => {
    if(tempNameDescription.edit==1){
      setTempNameDescription({
        ...tempNameDescription,
        theme:e.target.innerText,
      })
//      console.log(e.target.innerText,'ssss')
    }
  }

  const onChangeND = (e,field) => {
    switch(field){
      case 'filter':
        setFilterUser({text:e.target.value})
        onFilterFreeUser(e.target.value)
      break;
      case 'header':
        setTempNameDescription({
          ...tempNameDescription,
          header:e.target.value,
        })
      break;
      case 'theme':
        setTempNameDescription({
          ...tempNameDescription,
          theme:e.target.value,
        })
      break;
      case 'text':
        setTempNameDescription({
          ...tempNameDescription,
          text:e.target.value,
        })
      break;
      case 'text_right':
        setTempNameDescription({
          ...tempNameDescription,
          text_right:e.target.value,
        })
      break;
      case 'points':
        setTempNameDescription({
          ...tempNameDescription,
          points:e.target.value,
        })
      break;

    }
  }

  const onFilterFreeUser = (text) => {
    setUsers({
      ...users,
        filtered: users.firstLoaded.filter((value,index)=>{
          return text=='' || (
              value.header.toUpperCase().indexOf(text.toUpperCase())!=-1
          )
        })
    })
  }

  const openEdit = () => {
    setTempNameDescription({
      header:users.nowUser.header,
      text:users.nowUser.text,
      theme:users.nowUser.theme,
      text_right:users.nowUser.text_right,
      points:users.nowUser.points,
      edit:1
    })
  }

  const cancelEdit = () => {
    setTempNameDescription({
      header:users.nowUser.header,
      text:users.nowUser.text,
      theme:users.nowUser.theme,
      text_right:users.nowUser.text_right,
      points:users.nowUser.points,
      edit:0
    })
  }

  const saveEdit = () => {

    saveUserData(tempNameDescription);
   
  }

  const saveUserData = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...tempNameDescription,
        user_id:user.id
      })
    };

    fetch('http://localhost:3000/quiz/users/'+users.userID+'/edit', requestOptions)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
//      console.log(data)
      if(data.user_id){
        setUsers((prev)=>{
          prev.firstLoaded = prev.firstLoaded.map((elem)=>{
            if(elem.id==data.user_id){
              elem = {
                ...tempNameDescription,
                id:data.user_id,
                creator_id:user.id
              }
            }
            return elem
          })

          prev.filtered = prev.filtered.map((elem)=>{
            if(elem.id==data.user_id){
              elem = {
                ...tempNameDescription,
                id:data.user_id,
                creator_id:user.id
              }
            }
            return elem
          })

          return { 
            ...prev,
            nowUser: data.userData
          }
        })
        setTempNameDescription({
          ...tempNameDescription,
          edit:0
        })
        getAnswers(data.user_id)
      }else{
//       console.log(data.msg)
//       setMsg(data.msg)
      }
//    console.log(data);
    });    

  }

  function delUser(user_id){
    const test = confirm('Are you shure to delete?')
    if(test){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id })
      };

      fetch('http://localhost:3000/quiz/users/'+user_id+'/delete', requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers({
          firstLoaded: data.usersData,
          filtered: data.usersData
        })
        setTempNameDescription(null)
      });
    }
  }

  function addUser(){

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id })
    };

    fetch('http://localhost:3000/quiz/users/add', requestOptions)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
//      console.log(data)
      if(data.user_id){
        setUsers({
          firstLoaded: data.usersData,
          filtered: data.usersData,
          userID: data.user_id,
          nowUser: data.userData,
          nowAnswers: []
        })
        setTempNameDescription({
          ...data.userData,
          edit:1,
        })
      }else{
//       console.log(data.msg)
//       setMsg(data.msg)
      }
//    console.log(data);
    });
  }

  
  function getActions(){
    //    console.log(students)
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };        

//    useEffect(() => {

    fetch('http://localhost:3000/actions', requestOptions)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
//      console.log(1000,data)
      if(data){
        setActions(data)
      }else{
//            console.log(data.msg)
      }

    });
//    }, [user]);
    
  }   

  function getUsers(){
    //    console.log(students)
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };        

//    useEffect(() => {


    fetch('http://localhost:3000/users', requestOptions)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
//      console.log(data)
      if(data.usersData){
        setUsers({
          firstLoaded: data.usersData,
          filtered: data.usersData
        })
      }else{
//            console.log(data.msg)
      }

    });
//    }, [user]);
    
  } 

  function getAnswers(user_id){

//    console.log('user_id',user_id)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id })
    };        

//    useEffect(() => {


    fetch('http://localhost:3000/quiz/users/'+user_id, requestOptions)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
//      console.log(44,data)
      if(data.userData){
        setUsers({
          ...users,
          userID: data.user_id,
          nowUser: data.userData,
          nowAnswers: data.selectedAnswers
        })  
        setTempNameDescription({
          ...data.userData,
          edit:0,
        })
      }else{
//            console.log(data.msg)
      }

    });
  }

  if(users && users.nowUser){
    console.log(2,users.nowUser)
  }

  //console.log(111,actions)

//[!] Add buttons to delete Room

  return (
    <>
      <div style={{display:'flex'}}>
        <div style={{width:'100%'}}>
            <h1>Users</h1>
        </div>
        <div style={{width:'auto'}}>
            <ModalUser actions={actions} getUsers={getUsers} add="1" />
        </div>
      </div>
      <div style={{border:'1px solid #aaa',borderRadius:5,padding:'10px 15px 5px'}}>
            <div style={{borderBottom:'1px solid #ddd',paddingBottom:10,paddingTop:10,display:'flex',flexWrap:'wrap'}}>
                <div style={{width:'30%',fontWeight:'bold'}}>NAME</div> 
                <div style={{width:'30%',fontWeight:'bold'}}>E-MAIL</div>
                <div style={{width:'40%',fontWeight:'bold'}}></div> 
            </div>
            {users && users.filtered?users.filtered.map((user,index)=>{
//                console.log(user)
                return (
                  <div key={'userww_'+index} style={{borderBottom:index!=users.filtered.length-1?'1px solid #ddd':'1px solid transparent',paddingBottom:10,display:'flex',flexWrap:'wrap',marginTop:10}}>
                      <div style={{width:'30%',marginTop:10}}>{user.firstname} {user.lastname}</div>
                      <div style={{width:'30%',marginTop:10}}>{user.email}</div>
                      <div style={{width:'40%',textAlign:'right',whiteSpace:'nowrap'}}>
                          <ModalUser getUsers={getUsers} actions={actions} userContent={user} userId={user.id} />
                          <Button style={{backgroundColor:'#289F30',color:'white',marginLeft:'5%',textAlign:'left'}} onClick={()=>{getAnswers(user.id)}}>Run action</Button>
                      </div> 
                  </div>
                )
              }
            )
            :''}
      </div>
    </>
  )
}

export default Users