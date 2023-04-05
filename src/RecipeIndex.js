// This component lists all recipes in the database
import React from 'react';
import axios from 'axios';
const { useState , useEffect } = React;
import { List, Button, Pagination} from 'antd';
import { StarOutlined, SmileOutlined, HeartOutlined, SearchOutlined } from '@ant-design/icons';


const icons = [];
icons["main"] = <StarOutlined />;
icons["side"] = <SmileOutlined />;
icons["dessert"] = <HeartOutlined />;
icons["other"] = <SearchOutlined />;

const defaultPageSize=10;
const defaultCurrent=1;

const RecipeIndex = props=>{ 
    const [recipeList, setRecipeList] = useState([]);
    const [addToPlannerResult, setAddToPlannerResult] = useState();
    const [totalItems, setTotalItems] = useState();
    const [currentPage, setCurrentPage] = useState(defaultCurrent);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    // get ingredient list
    useEffect(()=>{

        axios.get(`/api/v1/recipe?perPage=${pageSize}&page=${currentPage}`)
        .then(result=>{          
            result.data.data.forEach(element => {
                element.isInPlanner=false;
                if(props.recipePlannerList.filter((a)=>a._id == element._id).length == 0){
                    element.isInPlanner=false;
                }else{
                    element.isInPlanner=true;
                }
            });
            setRecipeList(result.data.data);
            setTotalItems(result.data.total)
        })
        .catch(error=>console.log(error));
       
     },[addToPlannerResult, currentPage, pageSize]);
    
    
    // handle adding to grocery planner
    const handleAdd=(currentRecipe)=>{
        props.getRecipeDetail(currentRecipe)
        .then(result => {
            let arr = props.recipePlannerList;
            arr.push(result)
            console.log(arr);
            props.setRecipePlannerList(arr)
            console.log(props.recipePlannerList)
            setAddToPlannerResult(result)
        })
        .catch(error=>console.log(error))
    }

    // handle on click and navigate to recipe detail
    const handleOnClick=(currentRecipe)=>{
        props.getRecipeDetail(currentRecipe)
        .then(result => {
            props.navCurrentRecipe(result)
        })
        .catch(error=>console.log(error))
    }



    return (<>
        <h2>Recipe Index</h2>
    
        <List
            itemLayout="horizontal"
            dataSource={recipeList}
            renderItem={(item, index) => (
            <List.Item key={item._id}
            extra={item.isInPlanner?
                <Button onClick={()=>{props.handleRemove(item);setAddToPlannerResult(item)}} type="dashed">Remove from Planner</Button>:
                <Button onClick={()=>{handleAdd(item)}}>Add to Planner</Button> } 
            >
                <List.Item.Meta className="truncate" onClick={() =>{handleOnClick(item)} } style={{cursor: "pointer"}}
                avatar={icons[item.type]}
                title={item.name}
                description={item.description}
                />
            </List.Item>
            )}
        />

        <br/>
        {totalItems==undefined?"":
        <Pagination onChange={(currentPage, pageSize)=>{
            setCurrentPage(currentPage); setPageSize(pageSize);
            console.log("xx", currentPage, pageSize )}}

            showSizeChanger
            pageSizeOptions={[2,5,10,20,50,100]}
            total={totalItems}
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={defaultPageSize}
            defaultCurrent={defaultCurrent}
        />
        }
    </>)
};
export default RecipeIndex;