import React from 'react';
const { useState , useEffect } = React;
import CreateIngredient from './CreateIngredient';
import axios from 'axios';

import { Form, Input, Select, Button, Space, Cascader } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const units=['gram','ml','tsp','tbsp','unit'];
// Reference: https://codesandbox.io/s/heuristic-roentgen-mu0ot?file=/src/GroupForm.js
const IngredientList  = ( { setIngredientList, ingredientSubmitResult, setIngredientSubmitResult , recipeForm}) => {
    const onChange = (event) => {
        const arr = []
        recipeForm.getFieldValue('ingredients').forEach(element => {
          const list = new Map();
          list.set('ingredient', element.ingredient[1]);
          list.set('quantity', element.quantity);
          list.set('unit', element.unit);
          arr.push(Object.fromEntries(list));
        });
        console.log(arr);
        setIngredientList(arr);
    }

    const [ingredientOptions, setIngredientOptions] = useState([]);

    // get ingredient list
    useEffect(()=>{

      axios.get(`/api/ingredient`)
      .then(result=>{
          const arr = []
          result.data.data.forEach(element => {
            const list = new Map();
            list.set("value", element._id);
            list.set("label", element._id);

            const ingredient_arr=[]
            element.ingredients.forEach(element => {
              const ingredient_list = new Map();
              ingredient_list.set("value", element._id);
              ingredient_list.set("label", element.name);
              ingredient_arr.push(Object.fromEntries(ingredient_list))
            })

            list.set("children", ingredient_arr);
            arr.push(Object.fromEntries(list));
          });

          console.log(arr)
          setIngredientOptions(arr);
      })
      .catch(error=>console.log(error));
     
   },[ingredientSubmitResult]);



    return (<>
        <Form.List name="ingredients">
            {(fields, { add, remove }) => (
            <>
                {fields.map((field, index) => (
                <Space key={field.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                    <Form.Item {...field} key={field.key+"_ingredient"} name={[field.name, "ingredient"]} >
                      <Cascader
                        options={ingredientOptions}
                        onChange={onChange}
                        placeholder="Ingredient"
                      />
                    </Form.Item>
                    <Form.Item {...field} key={field.key+"_quantity"} name={[field.name, "quantity"]} >
                        <Input placeholder="Quantity" onChange={onChange}/>
                    </Form.Item>
                    <Form.Item {...field} key={field.key+"_unit"} name={[field.name, "unit"]} >
                        <Select onChange={onChange} placeholder="Unit">
                            {units !=undefined? units.map((option) => (
                                <Select.Option key={option} value={option}>{option}</Select.Option>
                            )):''}
                        </Select>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
                ))}
                <Form.Item>
                <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                >
                    Add item
                </Button>
                </Form.Item>
            </>
            )}
        </Form.List>

        <CreateIngredient setIngredientSubmitResult = { setIngredientSubmitResult }/>
    </>
    )
  };


export default IngredientList;
