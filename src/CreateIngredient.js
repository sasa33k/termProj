//this component should display a list of all playlists, fetched from the API
import React from 'react';
import axios from 'axios';

import { Button, Select, Modal, Form, Input } from 'antd';
import ResultModal from './ResultModal'

const { useState } = React;
//https://ant.design/components/modal
//https://codesandbox.io/s/6wkkjwzw3k?file=/index.js:354-1330

const CreateIngredient =  (props) => {
    const [form] = Form.useForm();
    const [open, setOpen] = React.useState(false);

    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
      setOpen(true);
    };

    const handleCreate = () => {
      setConfirmLoading(true); // loading animation
      console.log(form.getFieldsValue());


      axios.post('/api/ingredient', {name:name, description:description, type:type}, {  headers: {'Content-Type': 'application/json'}})
      .then(results => {
          props.setIngredientSubmitResult(results);
          console.log("post", results)
          setOpen(false);
          setConfirmLoading(false);

          form.resetFields();
      })
      .catch(error=>{
        console.log("error",error)
        setResultModalContent(error.message)
        setResultModalDetail(JSON.stringify(error))
        setIsResultModalOpen(true)
        setConfirmLoading(false);
      })

    };

    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [modalResultContent, setResultModalContent] = useState("");
    const [modalResultDetail, setResultModalDetail] = useState("");

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };

    // State for Ingredient Name
    const [name, setName] = useState("");
    const changeName = event => { 
    		setName(event.target.value);
    } 
    // State for Ingredient Description
    const [description, setDescription] = useState("");
    const changeDescription = event => { 
        setDescription(event.target.value);
    }
    // State for Ingredient Type
    const [type, setType] = useState("");
    const changeType = value => { 
      console.log(value);
        setType(value);
    }


    // State for Ingredient Type List
    const [typeList, setTypeList] = useState(["meat", "vegetables", "other"]);
    //!!!###??? add API to get Type List
    
	return (<>
      <Button onClick={showModal} type="link" style={{position:"absolute", bottom:"-15px", right:"0", background:""}}>
        Create New Ingredient
      </Button>
      <Modal title="Create a new ingredient" open={open}
        okText="Create" onOk={handleCreate} confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >

        {!isResultModalOpen?"":
            <ResultModal setIsModalOpen={setIsResultModalOpen} modalTitle={""} modalContent={modalResultContent} modalDetail={modalResultDetail}
            onOK={()=>{console.log("ok")}} onCancel={()=>{console.log("cancel")}}/>
        }
        <Form layout="vertical" form={form}>
          <Form.Item label="Name" name="ingredient-name">
              <Input  onChange={event=>changeName(event)}/>
          </Form.Item>
          <Form.Item label="Description" name="ingredient-description">
            <Input type="textarea" onChange={event=>changeDescription(event)}/>
          </Form.Item>

          <Form.Item label="Category" name="ingredient-category">
                <Select onChange={event=>changeType(event)}>
                    {typeList !=undefined? typeList.map((option) => (
                        <Select.Option key={option} value={option}>{option}</Select.Option>
                    )):''}
                </Select>
          </Form.Item>
        </Form>
      </Modal>

    </>); 
};
export default CreateIngredient;
