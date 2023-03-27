import React from 'react';
const { useState , useEffect} = React;
import axios from 'axios';
import Home from './Home';
import CreateRecipe from './CreateRecipe';
import RecipeIndex from './RecipeIndex';
import RecipeDetail from './RecipeDetail';
import GroceryPlanner from './GroceryPlanner';

// import AppMenu from './Menu';

import { MenuFoldOutlined, MenuUnfoldOutlined,HomeOutlined, UnorderedListOutlined, UploadOutlined, FormOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Typography } from 'antd';
const { Header, Sider, Content } = Layout;

const pages = [{label:'Home', key:'home', icon: <HomeOutlined />}, 
               {label:'Recipe Index', key:'recipes',  icon: <UnorderedListOutlined />}, 
               {label:'Submit Recipe', key:'newRecipe',  icon: <UploadOutlined />},
               {label:'Grocery Planner', key:'planner',  icon: <FormOutlined />}];

const hiddenPage = [{label:'Recipe Detail', key:'recipe', icon: <UnorderedListOutlined />}];

const App = props=>{ 

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
        // .then(result=>{              
        //     {for(const element of result.data.data.ingredient) {element.key = element._id};}
        //     console.log(result.data.data);

        //     const formatedIngredientName = {
        //         ...result.data.data,
        //         ingredient: result.data.data.ingredient.map(({ ingredient, ...rest }) => ({
        //           ...rest,
        //           ingredientId: ingredient._id,
        //           ingredientName: ingredient.name,
        //           ingredientType: ingredient.type,
        //           ingredientDesc: ingredient.description
        //         }))
        //       }


        //     setRecipeDetail(formatedIngredientName);
        //     console.log("YYY" , formatedIngredientName);
        //     return(formatedIngredientName);
        // })
        // .catch(error=>{console.log(error); return (error)});

    } 

    const [recipePlannerList, setRecipePlannerList] = useState([]);

    const handleRemove=(currentRecipe)=>{
        let arr = []
        if( recipePlannerList!=undefined && Array.isArray( recipePlannerList) && recipePlannerList.length > 0){
            arr = recipePlannerList.filter((a)=>a._id != currentRecipe._id);
        }
        console.log(arr);
        setRecipePlannerList(arr)
        // setAddToPlannerResult(arr)
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
             {/* hasSider> */}
            
            {/* <Sider trigger={null} theme ="dark" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
            style={{ overflow: 'auto', height: '100vh'}}>
                <div className="logo" />
                <Menu mode="inline" onClick={(e) => {setCurrentPage(e)}}
                    defaultSelectedKeys={['home']}  items={pages} theme ="dark" 
                />
            </Sider> */}
            <Layout className="site-layout">
                {/* <Header style={{  padding: 0, background: colorPrimaryBg}}> */}
                    {/* <div style={{ display:'inline', margin: 30}}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    </div> */}
                    {/* <Typography.Title style={{ display:'inline'}} level={3}>The Ultimate Recipe Hub</Typography.Title>
                    <div className="logo" />
                        <Menu mode="horizontal" onClick={(e) => {setCurrentPage(e)}}
                            defaultSelectedKeys={['home']}  items={pages} theme ="dark" 
                        />
                </Header> */}

                <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                    <div
                    style={{  float: 'left',  width: 30,
                        height: 31,   margin: '16px 24px 16px 0', background: 'rgba(255, 255, 255, 0.2)',
                    }}
                    />
                    <Menu theme="dark" mode="horizontal"
                    defaultSelectedKeys={['home']}
                    items={pages} onClick={(e) => {setCurrentPage(e)}}
                    />
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, 
                }} >
                    <h1>The Ultimate Recipe Hub</h1>
                    <h3>{currentPage.key}</h3>

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
