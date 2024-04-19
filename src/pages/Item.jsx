
//NOT finish!!!!
//Think about user LocalStorage or parametr in Link

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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