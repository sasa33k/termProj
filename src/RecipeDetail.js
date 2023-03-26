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
        key: 'ingredient',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
      },
]


const RecipeDetail = props=>{ 
    const [recipeDetail, setRecipeDetail] = useState();
    // get recipe detail
    useEffect(()=>{
        

        axios.get(`/api/recipe/${props.currentRecipe.type}/${props.currentRecipe._id}`)
        .then(result=>{              
            {for(const element of result.data.data.ingredient) {element.key = element._id};}
            console.log(result.data.data);

            const formatedIngredientName = {
                ...result.data.data,
                ingredient: result.data.data.ingredient.map(({ ingredient, ...rest }) => ({
                  ...rest,
                  ingredientId: ingredient._id,
                  ingredientName: ingredient.name,
                  ingredientType: ingredient.type,
                  ingredientDesc: ingredient.description
                }))
              }


            setRecipeDetail(formatedIngredientName);
        })
        .catch(error=>console.log(error));
       
     },[]);

    const [isCurrentInPlanner, setIsCurrentInPlanner] = useState(false);
    const [triggerPlanner, setTriggerPlanner] = useState(false);
    const handleAdd=()=>{
        let arr = props.recipePlannerList;
        arr.push(recipeDetail)
        console.log(arr);
        props.setRecipePlannerList(arr)
        setTriggerPlanner(!triggerPlanner)
        setIsCurrentInPlanner(true)
    }
    const handleRemove=()=>{
        let arr = []
        if( props.recipePlannerList!=undefined && Array.isArray( props.recipePlannerList) && props.recipePlannerList.length > 0){
            arr = props.recipePlannerList.filter((a)=>a._id != recipeDetail._id);
        }
        console.log(arr);
        props.setRecipePlannerList(arr)
        setTriggerPlanner(!triggerPlanner)
        setIsCurrentInPlanner(false)
    }

    useEffect(()=>{
        let arr = []
        console.log(props.recipePlannerList)
        if( props.recipePlannerList!=undefined && Array.isArray( props.recipePlannerList) && props.recipePlannerList.length > 0){
            console.log(props.recipePlannerList.filter((a)=>a._id == props.currentRecipe._id).length == 0);
            setIsCurrentInPlanner(props.recipePlannerList.filter((a)=>a._id == props.currentRecipe._id).length > 0);
        }
     },[props.currentRecipe]);

    //  let arr = [{ingredient:[{ingredient:'a', qty:1, unit:'tbsp'},{ingredient:'b', qty:1, unit:'tbsp'}]},{ingredient:[{ingredient:'acc', qty:15, unit:'tbsp'},{ingredient:'ccb', qty:17, unit:'tbsp'}]}]

    //  let arr = [{ingredient:'a', qty:1, unit:'tbsp'},{ingredient:'b', qty:1, unit:'tbsp'},{ingredient:'a', qty:15, unit:'tbsp'},{ingredient:'ccb', qty:17, unit:'tbsp'}]
    //  const groupByCategory = arr.reduce((group, ar) => {
    //     const { ingredient } = ar;
    //     group[ingredient] = group[ingredient] ?? [];
    //     group[ingredient].push(ar);
    //     return group;
    //   }, {});
    //   console.log(groupByCategory);


    const [commentSubmitResult, setCommentSubmitResult] = useState("");


    return ( <>

        {recipeDetail==undefined?"":<>
            <Image
                width={200}
                height={200}
                src={recipeDetail.image}
                fallback="data:image/png;base64,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"
            />
           
           {isCurrentInPlanner?
                <Button onClick={handleRemove} type="dashed">Remove from Planner</Button>:
                <Button onClick={handleAdd}>Add to Planner</Button> 
            }
    
            <Title>{recipeDetail.name}</Title>
            <div className="category">{icons[recipeDetail.type]}{recipeDetail.type}</div>
            <div className="description">
                <Text>{recipeDetail.description}</Text>
            </div>

            {/* {JSON.stringify(recipeDetail.ingredient)} */}

            <Table header={<div>Ingredients</div>}
                    columns={columns} 
                    dataSource={recipeDetail.ingredient} pagination={false} />;




            <List
                header={<div>Steps</div>}
                itemLayout="horizontal"
                dataSource={recipeDetail.step}
                renderItem={(item, index) => (
                    <List.Item key={index}>
                        <Text>{index+1}. {item}</Text>
                    </List.Item>
                )}
            />
                <CreateComment recipeId={recipeDetail._id} setCommentSubmitResult={setCommentSubmitResult}/>
                <CommentList recipeId={recipeDetail._id} commentSubmitResult={commentSubmitResult}/>
        </>}
    </>
    )
};
export default RecipeDetail;