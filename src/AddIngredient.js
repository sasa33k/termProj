// This component allow adding ingredients (item name, quantity, and unit) correspond to a recipe (used in create recipe page)
import React from 'react';
const { useState , useEffect } = React;
import CreateIngredient from './CreateIngredient';
import axios from 'axios';

import { Form, InputNumber, Select, Button, Space, Cascader } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const units=['gram','ml','tsp','tbsp','unit'];
// Reference: https://codesandbox.io/s/heuristic-roentgen-mu0ot?file=/src/GroupForm.js
const IngredientList  = ( { setIngredientList, ingredientSubmitResult, setIngredientSubmitResult , recipeForm}) => {
    const onListChange = () => {
        const arr = []
        recipeForm.getFieldValue('ingredients').forEach((element,index) => {
          if(element==undefined){
            const list = new Map();
            list.set('ingredient', undefined);
            list.set('quantity', undefined);
            list.set('unit', undefined);
            list.set('isRequired', false);
            arr.push(Object.fromEntries(list));
          } else{
            const list = new Map();
            if(element.ingredient!=undefined) {
              list.set('ingredient', element.ingredient[1]);
              list.set('isRequired', true);
            } else {
              list.set('isRequired', false)
            }
            list.set('quantity', element.quantity);
            list.set('unit', element.unit);
            arr.push(Object.fromEntries(list));
          }
        });
        console.log(arr);
        setIngredientList(arr);
    }

    const [ingredientOptions, setIngredientOptions] = useState([]);

    // get ingredient list
    useEffect(()=>{

      axios.get(`/api/v1/ingredient`)
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

    const filter = (inputValue, path) =>
      path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    //https://ant.design/components/cascader

    return (<>
        <Form.List name="ingredients">
            {(fields, { add, remove }) => (
            <>
                {fields.map((field, index) => (
                <Space key={field.key} size={[8, 0]} wrap>
                    <Form.Item {...field} key={field.key+"_ingredient"} name={[field.name, "ingredient"]} 
                      rules={[{ required: true, message: 'Please select an ingredient' }]}>
                      <Cascader
                        options={ingredientOptions}
                        onChange={onListChange}
                        placeholder="Ingredient"
                        showSearch={{ filter }}
                        onSearch={(value) => console.log(value)}
                      />
                    </Form.Item>{console.log(field.isRequired)}
                    <Form.Item {...field} key={field.key+"_quantity"} name={[field.name, "quantity"]} 
                    rules={[{ required: field.isRequired, message: 'Please input quantity' }]}>
                        <InputNumber placeholder="Quantity" min={0} onChange={onListChange}/>
                    </Form.Item>
                    <Form.Item {...field} key={field.key+"_unit"} name={[field.name, "unit"]} 
                    rules={[{ required: field.isRequired, message: 'Please select unit' }]}>
                        <Select onChange={onListChange} placeholder="Unit">
                            {units !=undefined? units.map((option) => (
                                <Select.Option key={option} value={option}>{option}</Select.Option>
                            )):''}
                        </Select>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => {remove(field.name); onListChange();}} />
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
