//this component should display a model showing results of an operation
import React from 'react';
import {  Modal } from 'antd';
// https://ant.design/components/form

const ResultModal = ({setIsModalOpen, modalTitle, modalContent, modalDetail, onOK, onCancel})=>{ 
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        onOK();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        onCancel();
        setIsModalOpen(false);
    };
    

	return (<>
        <Modal title={modalTitle} open={true} onOk={handleOk} onCancel={handleCancel}>
            <p>{modalContent}</p>
            <ul id="detail" dangerouslySetInnerHTML={{ __html: modalDetail}}></ul>
        </Modal>
            
        </>); 
};
export default ResultModal;
