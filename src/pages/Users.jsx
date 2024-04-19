import React, { useEffect, useState } from 'react'
import ModalUser from "../components/ModalUser.jsx";
import ModalRunAction from "../components/ModalRunAction.jsx";

const Users = () => {

  const [users, setUsers] = useState(null);
  const [actions, setActions] = useState(null);
  
  const [filterUser, setFilterUser] = useState({text:''});//Don't needed maybe later

  useEffect(() => {
    getUsers()
    getActions()
  }, []);
  
  function getActions(){

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
      if(data){
        setActions(data)
      }else{

      }

    });
//    }, [user]);
    
  }   

  function getUsers(){
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };        

    fetch('http://localhost:3000/users', requestOptions)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data.usersData){
        setUsers({
          firstLoaded: data.usersData,
          filtered: data.usersData
        })
      }else{

      }

    });
    
  } 

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
                return (
                  <div key={'userww_'+index} style={{borderBottom:index!=users.filtered.length-1?'1px solid #ddd':'1px solid transparent',paddingBottom:10,display:'flex',flexWrap:'wrap',marginTop:10}}>
                      <div style={{width:'30%',marginTop:10}}>{user.firstname} {user.lastname}</div>
                      <div style={{width:'30%',marginTop:10}}>{user.email}</div>
                      <div style={{width:'40%',textAlign:'right',whiteSpace:'nowrap'}}>
                          <ModalUser getUsers={getUsers} actions={actions} userContent={user} 
                          userId={user.id} />
                          <ModalRunAction userId={user.id} />
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