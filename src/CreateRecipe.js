//this component should display a list of all playlists, fetched from the API
import React from 'react';
import axios from 'axios';
import StepList from './ListStep';
import IngredientList from './ListIngredient';
import ResultModal from './ResultModal';

import { PlusOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd';
import {  Modal, Form,  Watch, Input,  Button,  Select, Cascader,  InputNumber,  Upload,} from 'antd';

// https://ant.design/components/form

// Reference for Dynamic add Step
const { TextArea } = Input;
// const props = {
//     name: 'file',
//     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//     headers: {
//       authorization: 'authorization-text',
//     },
//     onChange(info) {
//       if (info.file.status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (info.file.status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully`);
//       } else if (info.file.status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };




const { useState , useEffect } = React;
const CreateRecipe = props=>{ 
    const xx = Form.useWatch('steps', recipeForm);

    const [img, setImg] = useState({myFile:""});
    // State for Ingredients
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [recipeForm] = Form.useForm();

    const handleSelectIngredients = (event) => {
        const { options } = event.target;
        const values = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            values.push(options[i].value);
          }
        }
        setSelectedIngredients(values);
    }

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
    const [updateCheckedTime, setUpdateCheckedTime] = useState(true); 
    //!!!###??? check y cannnot update with just setCheckedIngredient
    const changeCheckedIngredient = event => { 
        setCheckedIngredient(
            checkedIngredient.set(
                event.target.value, event.target.checked
            )
        )
        console.log(checkedIngredient);
        setUpdateCheckedTime(new Date());
    }

    // State for step array
    const [stepList, setStepList] = useState([""]);
    // State for ingredients array
    const [ingredientList, setIngredientList] = useState([""]);

    // State for Recipe Type List
    const [typeList, setTypeList] = useState([ "main", "side", "desert", "other" ]);
    //!!!###??? add API to get Type List

    // handle form submission
    const submitRecipe = values => { 
        // event.preventDefault();
        console.log({name:name, description:description, image:img, type:type, cookingTimeInMinute:cookingTimeInMinute, ingredient:ingredientList , step:stepList})

        axios.post(`/api/Recipe/${type}`, {name:name, description:description, image:img, cookingTimeInMinute:cookingTimeInMinute, ingredient:ingredientList , step:stepList}, 
        {  headers: {'Content-Type': 'application/json'}})
        .then(results => {
            props.setRecipeSubmitResult(results);
            console.log("post", results)
            setModalContent("Recipe Created successfully! View it now?")
            setModalDetail("")
            setIsModalOpen(true);
        })
        .catch(error=>{
            setModalContent(error.message)
            let err=error.response.data.errors
            try{
                setModalDetail(Object.keys(err).map(key => `<li>${key}: ${err[key].message}</li>`))
            }catch{
                setModalDetail(JSON.stringify(error))
            }
            
            setIsModalOpen(true);
            console.log("error",error)
        })
    }

    //https://stackoverflow.com/questions/55238215/ant-design-upload-get-file-content
    const handleFileUpload = async (e) => {
        const file = e.file
        console.log(convertToBase64(file));
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalDetail, setModalDetail] = useState("");

	return (<>

           
        <h2>Create Recipe</h2>
        {!isModalOpen?"":
            <ResultModal setIsModalOpen={setIsModalOpen} modalTitle={""} modalContent={modalContent} modalDetail={modalDetail}
            onOK={()=>{if(props.recipeSubmitResult.status==201)props.navCurrentRecipe(props.recipeSubmitResult.data.data)}} onCancel={()=>{console.log("cancel")}}/>
        }
        <Form  id="createRecipe" form={ recipeForm } 
            onFinish={event=>submitRecipe(event)}
        // onFinishFailed={onFinishFailed}
            labelCol={{ span: 6 }} wrapperCol={{ span: 20 }} layout="horizontal" style={{ maxWidth: 600 }}
        >
            <Form.Item label="Name"> <Input onChange={event=>changeName(event)}/>  </Form.Item>
            
            <Form.Item label="Cover Image"> 
                {/* <Upload onChange={handleFileUpload}> */}
                <Upload  accept=".png" showUploadList={true}
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

            <Form.Item label="Recipe Type" >
                <Select onChange={event => changeType(event)}>
                    {typeList !=undefined? typeList.map((option) => (
                        <Select.Option key={option} value={option}>{option}</Select.Option>
                    )):''}
                </Select>
            </Form.Item>
            
            <Form.Item label="Cooking Time">  <InputNumber min={1} onChange={event=>changeCookingTimeInMinute(event)}/> minutes</Form.Item>
                {/* 
                <IngredientSelection ingredientSubmitResult={props.ingredientSubmitResult} setIngredientSubmitResult={props.setIngredientSubmitResult} setSelectedIngredients={setSelectedIngredients} />

                

                {stepList.map((singleStep, index) => (<>
                    <StepList index={index} value={singleStep} name={"Step "+{index}}  onChange={changeStepList} addStep={addStep} removeStep={removeStep} stepList={stepList}/>
                </>))} */}

            <Form.Item label="Ingredients"> 
                <IngredientList setIngredientList={setIngredientList} ingredientSubmitResult={props.ingredientSubmitResult} setIngredientSubmitResult={props.setIngredientSubmitResult} recipeForm={recipeForm}/>
            </Form.Item>
            <Form.Item label="Steps"> 
                <StepList setStepList={setStepList} recipeForm={recipeForm}/>
            </Form.Item>
                {console.log(xx)}
            <Button type="primary" htmlType="submit">Submit Recipe</Button>
       </Form>
            
        </>); 
};
export default CreateRecipe;


function convertToBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}