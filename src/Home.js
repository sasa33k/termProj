import React from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';
import CommentList from './ListComment'
const { useState , useEffect } = React;
import { Typography, Button, List, Table, Image } from 'antd';
import { StarOutlined, SmileOutlined, HeartOutlined, SearchOutlined } from '@ant-design/icons';



const Home = props=>{ 



    return ( <>
        <h1>Home Page (Pending)</h1>
        <ul>
            <li>Recipe Index Page
                <ul>
                    <li>List all recipes available in our database</li>
                    <li>Click Add / Remove to update recipes in Grocery Planner</li>
                    <li>Recipe Detail Page - Click list item to enter detail page, allow updating Grocery Planner in detail page</li>
                </ul>
            </li>
            <li>Submit Recipe Page
                <ul>
                    <li>Submit your own recipe (validations pending)</li>
                    <li>Modal Form Page - Create new Ingredient selection if not currently available</li>
                    <li>Pop up after submission - success / error message from server</li>
                </ul>
            </li>
            <li>Grocery Planner Page
                <ul>
                    <li>Summarise all ingredient list from receipes added to planner</li>
                    <li>List recipes selected</li>
                    <li>Recipe cards - Actions to navigate to recipe detail or remove from Grocery Planner</li>
                </ul>
            </li>

        </ul>
    </>
    )
};
export default Home;