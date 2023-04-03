import React from 'react';
const { useState , useEffect} = React;
import axios from 'axios';
import Home from './Home';
import CreateRecipe from './CreateRecipe';
import RecipeIndex from './RecipeIndex';
import RecipeDetail from './RecipeDetail';
import GroceryPlanner from './GroceryPlanner';

import { HomeOutlined, UnorderedListOutlined, UploadOutlined, FormOutlined, LikeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content } = Layout;

const pages = [{label:'Home', key:'home', icon: <HomeOutlined />}, 
               {label:'Recipe Index', key:'recipes',  icon: <UnorderedListOutlined />}, 
               {label:'Submit Recipe', key:'newRecipe',  icon: <UploadOutlined />},
               {label:'Grocery Planner', key:'planner',  icon: <FormOutlined />}];

const hiddenPage = [{label:'Recipe Detail', key:'recipe', icon: <UnorderedListOutlined />}];

const App = props=>{ 
    // Handle navigations
    const [currentPage, setCurrentPage] = useState(pages[0]);
    const [currentRecipe, setCurrentRecipe] = useState();
    const navCurrentPartialRecipe = (recipe) => {
        getRecipeDetail(recipe)
        .then(result =>{
            setCurrentRecipe(result);
            setCurrentPage(hiddenPage[0]);
        })
        .catch(error => { console.log(error);})
    }
    const navCurrentRecipe = (recipe) => {
        setCurrentRecipe(recipe);
        setCurrentPage(hiddenPage[0]);
    }

    // function to get recipe detail shared by multiple pages
    const getRecipeDetail = async (currentRecipe) => {
        return axios.get(`/api/recipe/${currentRecipe.type}/${currentRecipe._id}`)
        .then(result => {
          const formattedIngredients = result.data.data.ingredient.map(({ ingredient, ...rest }) => ({
            ...rest,
            key: ingredient._id,
            ingredientName: ingredient.name,
            ingredientType: ingredient.type,
            ingredientDesc: ingredient.description
          }));
          const formattedData = {
            ...result.data.data,
            ingredient: formattedIngredients
          };
          return formattedData;
        })
        .catch(error => {
          console.log(error);
          throw error;
        });

    } 

    // Grocery Planner states
    const [recipePlannerList, setRecipePlannerList] = useState([]);

    // Recipe in Grocery Planner remove function
    const handleRemove=(currentRecipe)=>{
        let arr = []
        if( recipePlannerList!=undefined && Array.isArray( recipePlannerList) && recipePlannerList.length > 0){
            arr = recipePlannerList.filter((a)=>a._id != currentRecipe._id);
        }
        console.log(arr);
        setRecipePlannerList(arr)
    }

    // State for FormSubmission
    const [ingredientSubmitResult, setIngredientSubmitResult] = useState("");
    const [recipeSubmitResult, setRecipeSubmitResult] = useState("");

    

    const {
        token: { colorBgContainer, colorPrimaryBg},
      } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);
    
    

	return (
        <Layout>
            <Layout className="site-layout">

                <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                    <div
                    style={{  float: 'left',  width: 30,
                        height: 31,   margin: '16px 24px 16px 0', background: 'rgba(193, 145, 247, 0.8)',
                    }}
                    >
                    <LikeOutlined style={{  float: 'left',  padding: '8px'}}/> </div>
                    <Menu theme="dark" mode="horizontal"
                    defaultSelectedKeys={['home']}
                    items={pages} onClick={(e) => {setCurrentPage(e)}}
                    />
                </Header>

                {/* Handle page components mount / unmount */}
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, }} >
                    <h1>The Ultimate Recipe Hub</h1>

                    {currentPage.key == "home"?
                        <Home/> :""
                    }

                    {currentPage.key == "newRecipe"?
                        <CreateRecipe ingredientSubmitResult={ ingredientSubmitResult } setIngredientSubmitResult={setIngredientSubmitResult} 
                        recipeSubmitResult={ recipeSubmitResult } setRecipeSubmitResult={ setRecipeSubmitResult }  navCurrentRecipe={navCurrentPartialRecipe}/>:""
                    }

                    
                    {currentPage.key == "recipes"?
                        <RecipeIndex navCurrentRecipe={navCurrentRecipe} getRecipeDetail={getRecipeDetail}
                            handleRemove = {handleRemove}
                            recipePlannerList={recipePlannerList} setRecipePlannerList={setRecipePlannerList}/>:""
                    }


                    {currentPage.key == "recipe"?
                        <RecipeDetail currentRecipe = {currentRecipe} handleRemove={handleRemove}
                            recipePlannerList={recipePlannerList} setRecipePlannerList={setRecipePlannerList}/>:""
                    }


                    {currentPage.key == "planner"?
                        <GroceryPlanner recipePlannerList={recipePlannerList} setRecipePlannerList={setRecipePlannerList} 
                            navCurrentRecipe={navCurrentRecipe} handleRemove={handleRemove}/>:""
                    }

                </Content>
            </Layout>
        </Layout>
    )
};
export default App;
