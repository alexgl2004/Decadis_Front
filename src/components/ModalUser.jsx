import React, { useEffect, useState } from 'react';
import { Checkbox, Form, Input, Button, Modal, Space } from 'antd';

const { TextArea } = Input;

const ModalUser = (params) => {

//  console.log(params)

  const [isModalOpen, setIsModalOpen] = useState([false, false]);
  const [tempUser, setTempUser] = useState(null);

  function makeNullUser(){
    setTempUser({
      firstname: "",
      lastname: "",
      email: "",
      action_ids: [],
      id: "",
    })    
  }

function addUser(){
  toggleModal(0, true)
  makeNullUser()
}

function openEditUser(){
  toggleModal(0, true)
  setTempUser({
    firstname: params.userContent.firstname?params.userContent.firstname:"",
    lastname: params.userContent.lastname?params.userContent.lastname:"",
    email: params.userContent.email?params.userContent.email:"",
    action_ids: params.userContent.action_ids?params.userContent.action_ids.split(','):[],
    id: params.userId?params.userId:"",
  })
}


  function saveUser(add=0){

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tempUser)
    };

    fetch('http://localhost:3000/users/'+(add?'add':tempUser.id+'/edit'), requestOptions)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
//      console.log(data)
      params.getUsers()
  
    })
  }

  function delUser(userId){
    const test = confirm('Are you shure to delete?')
    if(test){
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      fetch('http://localhost:3000/users/' + userId + '/delete', requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
  //      console.log(data)
        params.getUsers()
    
      })
    }
  }

  const onChangeChecked = (list) => {
    setTempUser({
      ...tempUser,
      action_ids:list
    })    
  }

  const onChangeND = (e,field) => {
    switch(field){
      case 'firstname':
        setTempUser({
          ...tempUser,
          firstname:e.target.value,
        })
      break;
      case 'lastname':
        setTempUser({
          ...tempUser,
          lastname:e.target.value,
        })
      break;
      case 'email':
        setTempUser({
          ...tempUser,
          email:e.target.value,
        })
      break;
    }
  }

  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  let checkBox_options

  if(params && params.actions){
    
    checkBox_options = params.actions.map((elem)=>{

      return {
        'label':elem.name,
        'value':String(elem.id)
      }

    })

  }

//  console.log(1000,tempUser,checkBox_options)

  return (
    <>
      <Space>
        {params.add && parseInt(params.add)==1?
          <>
            <Button style={{backgroundColor:'#129795',color:'white',marginTop:7}} onClick={addUser}>Create</Button>
          </>
          :
          <>
            <Button style={{backgroundColor:'#177FC9',color:'white',textAlign:'center'}} onClick={openEditUser}>Edit</Button>
            <Button style={{backgroundColor:'#D63436',color:'white',marginLeft:'5%',textAlign:'center'}} onClick={()=>{delUser(params.userId)}}>Detele</Button>
          </>
        }
      </Space>
      <Modal
        title={(params.add && parseInt(params.add)==1?'Add':'Edit')+' user'}
        open={isModalOpen[0]}
        onOk={() => {
          saveUser(params.add && parseInt(params.add)==1?1:0)
          toggleModal(0, false)
        }}
        onCancel={() =>{
          makeNullUser()
          toggleModal(0, false)
        }}
      >

      {tempUser?
        <>
          <Form.Item label="First name">
            <Input 
              name="firstname" 
              onChange={(e)=>{onChangeND(e,'firstname')}}
              value={tempUser && tempUser.firstname?tempUser.firstname:''}
            />
          </Form.Item>
          <Form.Item label="Last name">
            <Input 
              name="lastname" 
              onChange={(e)=>{onChangeND(e,'lastname')}}
              value={tempUser && tempUser.lastname?tempUser.lastname:''}
            />
          </Form.Item>
          <Form.Item label="E-mail">
            <Input 
              name="email" 
              onChange={(e)=>{onChangeND(e,'email')}}
              value={tempUser && tempUser.email?tempUser.email:''}
            />
          </Form.Item>

          {params && params.actions?
            <Checkbox.Group options={checkBox_options} value={tempUser.action_ids} defaultValue={tempUser.action_ids} onChange={onChangeChecked} />        
          :''}
        </>:
        ''}
      </Modal>
    </>
  );
};
export default ModalUser;