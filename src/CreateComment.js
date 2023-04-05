//this component is used to create comment for a paticular recipe
import React from 'react';
import axios from 'axios';
import ResultModal from './ResultModal';

import { Button, Rate, Form, Input } from 'antd';
const { TextArea } = Input;

const { useState } = React;
//https://ant.design/components/modal

const CreateComment =  (props) => {
    const [form] = Form.useForm();

    const handleCreate = () => {
      // Post Comment
      axios.post(`/api/v1/comment/${props.recipeId}`, {name:name, comment:comment, rating:rate}, {  headers: {'Content-Type': 'application/json'}})
      .then(results => {
          console.log("post comment: ", results)
          props.setCommentSubmitResult(results);
      })
      .catch(error=>{
        // catch error, format error message and show in modal
        setModalContent(error.message)
        let err=error.response.data
        try {// format mongoose error
            setModalDetail(Object.keys(err.errors).map(key => `<li>${key}: ${err.errors[key].message}</li>`))
        }
        catch{
            if (Array.isArray(err)){// format ajv
                setModalDetail(Object.keys(err).map(key => `<li>${key}: ${err[key].message}</li>`))
            } else{
                setModalDetail(JSON.stringify(err))
            }
        } 
        setIsModalOpen(true);
        console.log("error",error);
      })
    };


    // State for Name
    const [name, setName] = useState("");
    const changeName = event => { 
    		setName(event.target.value);
    } 
    // State for comment
    const [comment, setComment] = useState("");
    const changeComment = event => { 
      setComment(event.target.value);
    }
    // State for Ingredient Type
    const [rate, setRate] = useState("");
    const changeRate = value => { 
      console.log(value);
      setRate(value);
    }

    // state for handling result modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalDetail, setModalDetail] = useState("");

	return (<div id="comment-form">
        {!isModalOpen?"":
            <ResultModal setIsModalOpen={setIsModalOpen} modalTitle={""} modalContent={modalContent} modalDetail={modalDetail}
            onOK={()=>{console.log("OK")}} onCancel={()=>{console.log("cancel")}}/>
        }
        <h2>Comments</h2>

        <Form  id="createComment" form={ form } 
        onFinish={event=>handleCreate(event)}
        // onFinishFailed={onFinishFailed}
            labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 600 }}
        >
          <Form.Item label="Name" name="name">
              <Input  onChange={event=>changeName(event)}/>
          </Form.Item>

        <Form.Item name="rate" label="Rate">
          <Rate onChange={event=>changeRate(event)}/>
        </Form.Item>

        <Form.Item label="Comment" name="comment">
            <TextArea rows={4} onInput={event=>changeComment(event)}/>
        </Form.Item>


        <Button type="primary" htmlType="submit">Submit Comment</Button>
      </Form>
    </div>); 
};
export default CreateComment;
