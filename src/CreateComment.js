//this component should display a list of all playlists, fetched from the API
import React from 'react';
import axios from 'axios';

import { Button, Rate, Form, Input } from 'antd';
const { TextArea } = Input;

const { useState } = React;
//https://ant.design/components/modal
//https://codesandbox.io/s/6wkkjwzw3k?file=/index.js:354-1330

const CreateComment =  (props) => {
    const [form] = Form.useForm();

    const handleCreate = () => {
      console.log("xx", props.recipeId)

      axios.post(`/api/comment/${props.recipeId}`, {name:name, comment:comment, rating:rate}, {  headers: {'Content-Type': 'application/json'}})
      .then(results => {
          console.log("post comment: ", results)
          props.setCommentSubmitResult(results);
      })
      .catch(error=>console.log("error",error))

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

	return (<div id="comment-form">
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
