import React, { useEffect, useState } from 'react';
import { Button, Modal, Space } from 'antd';

const ContentModal = (params) => {

//  console.log(params)

  return (
    <>
      <Modal
        title={params.content?params.content.title:''}
        open={params.isModalOpen[2]}
        onOk={() => {
          params.toggleModal(2, false)
        }}
        onCancel={() =>{
          params.toggleModal(2, false)
        }}
        cancelText = "Close"
        okButtonProps={{
            disabled: true
        }}        
        cancelButtonProps={{
//          disabled: true,
        }}        
      >

      <>
        {params.content?params.content.text:''}
        <br />
        {params.content && params.content.add_text?params.content.add_text:''}
        
      </>
      </Modal>
    </>
  );
};
export default ContentModal;