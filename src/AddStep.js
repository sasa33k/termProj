// This component allow adding steps correspond to a recipe (used in create recipe page)
import React from 'react';

import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";


// Reference: https://codesandbox.io/s/heuristic-roentgen-mu0ot?file=/src/GroupForm.js
const StepList  = ( { setStepList, recipeForm}) => {
    const onChange = () => {
        console.log(recipeForm.getFieldValue('steps'));
        let steps = recipeForm.getFieldValue('steps').map(step=>step.step);
        console.log(steps);
        setStepList(steps);
    }

    return (<>
        <Form.List name="steps">
            {(fields, { add, remove }) => (
            <>
                {fields.map((field, index) => (
                <Space.Compact key={field.key} align="baseline" block>
                    <Form.Item {...field} key={field.key} name={[field.name, "step"] } style={{ width:"90%" }} 
                    rules={[{ required: true, message: 'Please enter a step' }]}>
                        <Input placeholder={"Step "+(index+1)} onChange={onChange}/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => {remove(field.name);onChange()}} style={{ width:"10%", height:"min-content", padding:"10px"}}/>
                </Space.Compact>
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
    </>
    )
  };


export default StepList;
