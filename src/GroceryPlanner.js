import React from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';
import CommentList from './ListComment'
const { useState , useEffect } = React;
import { Typography, Button, List, Table, Image } from 'antd';
import { StarOutlined, SmileOutlined, HeartOutlined, SearchOutlined } from '@ant-design/icons';

const{ Title, Text, Link} = Typography;

const icons = [];
icons["main"] = <StarOutlined />;
icons["side"] = <SmileOutlined />;
icons["desert"] = <HeartOutlined />;
icons["other"] = <SearchOutlined />;

const columns = [
    {
        title: 'Ingredient',
        dataIndex: 'ingredientName',
        key: 'ingredientName',
    },
    {
        title: 'Type',
        dataIndex: 'ingredientType',
        key: 'ingredientType',
    },
    {
        title: 'Description',
        dataIndex: 'ingredientDesc',
        key: 'ingredientDesc',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    }
]


const GroceryPlanner = props=>{ 
    const [triggerPlanner, setTriggerPlanner] = useState(false);
    const [commentSubmitResult, setCommentSubmitResult] = useState("");
    
    // To group ingredients by their name, quantity and unit using reduce(), 
    // then combines the quantities for each group
    const quantitiesByIngredientUnit = props.recipePlannerList.reduce((result, obj) => {
        obj.ingredient.forEach(({ingredientId, ingredientName, ingredientType, ingredientDesc, quantity, unit}) => {
            const index = result.findIndex(x => x.key === ingredientId && x.unit === unit);
            if (index === -1) {
                result.push({ingredientName, ingredientType, ingredientDesc, key:ingredientId, quantity:parseFloat(quantity), unit: unit});
            } else {
                result[index].quantity+= parseFloat(quantity);
            }
        });
        return result;
      }, []);

      // Format the quantities as desired
    const quantitiesByIngredient = {};
    quantitiesByIngredientUnit.forEach(({ key, ingredientName, ingredientType, ingredientDesc, quantity, unit }) => {
    if (!quantitiesByIngredient[key]) {
        quantitiesByIngredient[key] = {
            ingredientName, ingredientType, ingredientDesc,
            key,
            quantity: `${quantity} ${unit}`
        };
    } else {
        quantitiesByIngredient[key].quantity += ` + ${quantity} ${unit}`;
    }
    });

    const formatedTableData=Object.values(quantitiesByIngredient);


    return ( <>
       {/* {JSON.stringify(props.recipePlannerList)}  */}
        <Table header={<div>Ingredients</div>}
        columns={columns} 
        dataSource={formatedTableData} pagination={false} />;

    </>
    )
};
export default GroceryPlanner;