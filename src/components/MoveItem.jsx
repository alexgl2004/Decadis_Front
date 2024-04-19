import React, { useEffect, useState, useCallback } from 'react';
import { Select, Button, Modal, Space } from 'antd';

const MoveItem = (params) => {


  useEffect(() => {
    params.getPositionsItems()
  }, []);  

//  const [runAction, setRunAction] = useState(null);

  const onChangeItemChecked = (elem) => {

    params.setRunAction({
      ...params.runAction,
      item: elem,

      position: String(params.runAction.items.filter((itemF)=>{ 
                  return itemF.id==elem
                })[0].position_id),

      runFunction: 'move'
    })
  }

  const onChangePositionChecked = (elem) => {
    params.setRunAction({
      ...params.runAction,
      position:elem,
      runFunction:'move'
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

//  if(runAction){
    const [ selectBox_items, arr_options_items ] = returnArraysFor(params.runAction?params.runAction.items:[])
    const [ selectBox_positions, arr_options_positions ] = returnArraysFor(params.runAction?params.runAction.positions:[])
//  }
  

//  console.log(1000,runAction,selectBox_options)

   return (
    <>
      {params.runAction && params.runAction.items?
        <>
          <h5 style={{borderTop:'1px solid #ccc',paddingTop:10,marginTop:15}}>Select item to move</h5>
          <Select style={{width:'100%'}} options={arr_options_items} value={params.runAction.item} defaultValue={params.runAction.item} onChange={onChangeItemChecked} />
        </>
        :''
      }
      {params.runAction && params.runAction.positions?
        <>
          <h5>Select position to move</h5>
            <Select style={{width:'100%'}} options={arr_options_positions} value={params.runAction.position} defaultValue={params.runAction.position} onChange={onChangePositionChecked} />
        </>
        :''
      }
    </>
  );
};

export default MoveItem;