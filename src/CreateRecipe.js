//this component is used to create a recipe
import React from 'react';
import axios from 'axios';
import StepList from './AddStep';
import IngredientList from './AddIngredient';
import ResultModal from './ResultModal';

import { UploadOutlined } from '@ant-design/icons';
import {  Form,  Input,  Button,  Select, InputNumber,  Upload,} from 'antd';
const { TextArea } = Input;

// https://ant.design/components/form
//https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript


// Reference for Dynamic add Step

const { useState , useEffect } = React;
const CreateRecipe = props=>{ 
    // State for image
    const [img, setImg] = useState("");
    // State for Ingredients
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [recipeForm] = Form.useForm();

    // State for Recipe Name
    const [name, setName] = useState("");
    const changeName = event => { 
    		setName(event.target.value);
    } 
    // State for Recipe Description
    const [description, setDescription] = useState("");
    const changeDescription = event => { 
        setDescription(event.target.value);
    }
    // State for Recipe Type
    const [type, setType] = useState("");
    const changeType = value => { 
        setType(value);
    }
    // State for cookingTimeInMinute
    const [cookingTimeInMinute, setCookingTimeInMinute] = useState();
    const changeCookingTimeInMinute = (value) => { 
        setCookingTimeInMinute(value);
            console.log('changed', value);
    }

    // State for ingredient array
    const [checkedIngredient, setCheckedIngredient] = useState(new Map() );

    // State for step array
    const [stepList, setStepList] = useState([""]);
    // State for ingredients array
    const [ingredientList, setIngredientList] = useState([""]);

    // State for Recipe Type List
    const [typeList, setTypeList] = useState([ "main", "side", "dessert", "other" ]);

    // handle form submission
    const submitRecipe = async (values) => { 

        try {
            const values = await recipeForm.validateFields();
            console.log('Success:', values);
            
            // create recipe
            axios.post(`/api/v1/Recipe/${type}`, {name:name, description:description, image:img, cookingTimeInMinute:cookingTimeInMinute, ingredient:ingredientList , step:stepList.length==1&&stepList[0].length==0?[]:stepList}, 
            {  headers: {'Content-Type': 'application/json'}})
            .then(results => {
                props.setRecipeSubmitResult(results);
                console.log("post", results)
                setModalContent("Recipe Created successfully! View it now?")
                setModalDetail("")
                setIsModalOpen(true);
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
                console.log("error",error)
            })
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }


    }

    // state for handling result modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalDetail, setModalDetail] = useState("");

	return (<>

           
        <h2>Create Recipe</h2>
        {!isModalOpen?"":
            <ResultModal setIsModalOpen={setIsModalOpen} modalTitle={""} modalContent={modalContent} modalDetail={modalDetail}
            onOK={()=>{if(props.recipeSubmitResult.status==201){props.navCurrentRecipe(props.recipeSubmitResult.data.data)} else console.log("OK");}} onCancel={()=>{console.log("cancel")}}/>
        }
        <Form  id="createRecipe" form={ recipeForm } name="recipeForm"
            onFinish={event=>submitRecipe(event)}
        // onFinishFailed={onFinishFailed}
            labelCol={{ span: 6 }} wrapperCol={{ span: 20 }} layout="horizontal" style={{ maxWidth: 600 }}
        >
            <Form.Item label="Name" rules={[{ required: true, message: 'Please input recipe name!' }]}> 
                <Input onChange={event=>changeName(event)} value={name} />  
            </Form.Item>
            
            <Form.Item label="Cover Image"> 
                <Upload  accept=".png, .jpeg, .jpg" showUploadList={true} maxCount={1}
                    beforeUpload={file => {
                        const reader = new FileReader();

                        reader.readAsDataURL(file);
                        reader.onload = e => {
                            setImg(e.target.result);
                        };

                        // Prevent upload
                        return false;
                    }}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item label="Description">  <TextArea rows={4} onInput={event=>changeDescription(event)}/> </Form.Item>

            <Form.Item label="Recipe Type"  name="type" rules={[{ required: true, message: 'Please select recipe type!' }]}> 
                <Select onChange={event => changeType(event)}>
                    {typeList !=undefined? typeList.map((option) => (
                        <Select.Option key={option} value={option}>{option}</Select.Option>
                    )):''}
                </Select>
            </Form.Item>
    
            <Form.Item label="Cooking Time" > 
                 <InputNumber min={0} onChange={event=>changeCookingTimeInMinute(event)}/> minutes</Form.Item>

            <Form.Item label="Ingredients" rules={[{ required: true, message: 'Please input ingredients!' }]}> 
                <IngredientList setIngredientList={setIngredientList} ingredientSubmitResult={props.ingredientSubmitResult} setIngredientSubmitResult={props.setIngredientSubmitResult} recipeForm={recipeForm}/>
            </Form.Item>
            <Form.Item label="Steps"> 
                <StepList setStepList={setStepList} recipeForm={recipeForm}/>
            </Form.Item> 
            <Button type="primary" htmlType="submit">Submit Recipe</Button>
       </Form>
            
        </>); 
};
export default CreateRecipe;
