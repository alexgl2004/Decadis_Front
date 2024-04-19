import React, { useEffect } from 'react';
import { Select } from 'antd';

const DeleteItem = (params) => {


  useEffect(() => {
    params.getPositionsItems()
  }, []);  

  const onChangeItemChecked = (elem) => {

    console.log(params.runAction)

    params.setRunAction({
      ...params.runAction,
      item: elem,
      runFunction: 'delete'
    })
  }

  function returnArraysFor(elems){

    if(elems.length==0){
      return [[],[]]
    }

    const selectedBox = elems.map((elem)=>{
        return String(elem.id)
    })
    
    const arr_options = elems.map((elem)=>{
      return {
        'label':elem.name,
        'value':String(elem.id)
      }
    })
  
    return [selectedBox, arr_options]

  }

  const [ selectBox_items, arr_options_items ] = returnArraysFor(params.runAction?params.runAction.items:[])

  return (
    <>
      {params.runAction && params.runAction.items?
        <>
          <h5 style={{borderTop:'1px solid #ccc',paddingTop:10,marginTop:15}}>Select item to DELETE</h5>
          <Select style={{width:'100%'}} options={arr_options_items} value={params.runAction.item} defaultValue={params.runAction.item} onChange={onChangeItemChecked} />
        </>
        :''
      }
    </>
  );
};

export default DeleteItem;