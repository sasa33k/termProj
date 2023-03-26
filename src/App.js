import React from 'react';
const { useState , useEffect} = React;
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
    const navCurrentRecipe = (recipe) => {
        setCurrentRecipe(recipe);
        setCurrentPage(hiddenPage[0]);
    }

    const [recipePlannerList, setRecipePlannerList] = useState([]);
   

    // State for FormSubmission
    const [ingredientSubmitResult, setIngredientSubmitResult] = useState("");
    const [recipeSubmitResult, setRecipeSubmitResult] = useState("");

    const {
        token: { colorBgContainer, colorPrimaryBg},
      } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);


	return (
        <Layout hasSider>
            
            <Sider trigger={null} theme ="dark" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
            style={{ overflow: 'auto', height: '100vh'}}>
                <div className="logo" />
                <Menu mode="inline" onClick={(e) => {setCurrentPage(e)}}
                    defaultSelectedKeys={['home']}  items={pages} theme ="dark" 
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{  padding: 0, background: colorPrimaryBg}}>
                    <div style={{ display:'inline', margin: 30}}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    </div>
                    <Typography.Title style={{ display:'inline'}} level={3}>The Ultimate Recipe Hub</Typography.Title>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, 
                }} >
                    <h1>The Ultimate Recipe Hub</h1>
                    <h3>{currentPage.key}</h3>

                    {currentPage.key == "newRecipe"?
                        <CreateRecipe ingredientSubmitResult={ ingredientSubmitResult } setIngredientSubmitResult={setIngredientSubmitResult} 
                        recipeSubmitResult={ recipeSubmitResult } setRecipeSubmitResult={ setRecipeSubmitResult }  navCurrentRecipe={navCurrentRecipe}/>:""
                    }

                    
                    {currentPage.key == "recipes"?
                        <RecipeIndex navCurrentRecipe={navCurrentRecipe}/>:""
                    }


                    {currentPage.key == "recipe"?
                        <RecipeDetail currentRecipe = {currentRecipe} 
                            recipePlannerList={recipePlannerList} setRecipePlannerList={setRecipePlannerList}/>:""
                    }


                    {currentPage.key == "planner"?
                        <GroceryPlanner recipePlannerList={recipePlannerList}/>:""
                    }


                    
                </Content>
            </Layout>
        </Layout>
    )
};
export default App;
