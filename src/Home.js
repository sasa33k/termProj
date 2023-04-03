// This component shows home page content (static text)
import React from 'react';

const Home = props=>{ 

    return ( <>
        <h2>Welcome!</h2>
        <p>Welome to The Ultimate Recipe Hub!</p>
        <p>Are you running out of culinary inspiration and struggling to come up with a delicious dinner idea that fits your busy schedule and limited ingredients? We've got your back! Our Recipe Hub is here to take the stress out of meal planning and grocery shopping, so you can enjoy cooking and experimenting with new flavors. Let's get creative in the kitchen together!</p>
        
        <p>Brief Overview of our site:</p>
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