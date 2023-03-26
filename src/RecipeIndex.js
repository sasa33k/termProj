import React from 'react';
import axios from 'axios';
const { useState , useEffect } = React;
import { Avatar, List } from 'antd';
import { StarOutlined, SmileOutlined, HeartOutlined, SearchOutlined } from '@ant-design/icons';


const icons = [];
icons["main"] = <StarOutlined />;
icons["side"] = <SmileOutlined />;
icons["desert"] = <HeartOutlined />;
icons["other"] = <SearchOutlined />;


const RecipeIndex = props=>{ 
    const [recipeList, setRecipeList] = useState([]);
    // get ingredient list
    useEffect(()=>{

        axios.get(`/api/recipe/`)
        .then(result=>{              
            console.log(result.data.data);
            setRecipeList(result.data.data);
        })
        .catch(error=>console.log(error));
       
     },[]);


    return (
        <List
            itemLayout="horizontal"
            dataSource={recipeList}
            renderItem={(item, index) => (
            <List.Item onClick={() => props.navCurrentRecipe(item)}>
                <List.Item.Meta
                avatar={icons[item.type]}
                title={item.name}
                description={item._id}
                />
            </List.Item>
            )}
        />
    )
};
export default RecipeIndex;