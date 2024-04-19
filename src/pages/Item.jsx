
//NOT finish
//Think about user LocalStorage or parametr in Link

import dayjs from 'dayjs';
import React, { useEffect, useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import {
  Button,
} from 'antd';

const Item = () => {

  const [item, setItem] = useState(null);

  useEffect(() => {
    getItem()
  }, []);

  let params = useParams();

  function getItem(){

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };        
  
    fetch('http://localhost:3000/items/'+params.id, requestOptions)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
  
      if(data){    
  
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };        
  
        fetch('http://localhost:3000/items/positions', requestOptions)
        .then((res) => {
          return res.json();
        })        
        .then((data2) => {
  
          if(data2){
            setItem({
              data: data,
              position: data2.filter((elem)=>{ return elem.id==data.position_id})[0].name
            })
          }
  
        })
  
      }else{
  
      }
  
    });
    
  }
    
  console.log(item,params)

  return (
    <>
      <h1>{item && item.name?item.name:''}</h1>
    </>
  );
};
export default Item;