# Key Idea: The Ultimate Recipe Hub with Personalized Meal Planning and Daily Picks
A recipe sharing platform that offers an engaging user experience, incorporating a grocery planning feature that summarizes ingredient lists to streamline grocery shopping. 
Implement a robust recipe management system that allows users to create, rate, and share their own recipes.

[Click Here](https://prussian-blue-elephant-vest.cyclic.app) to view the sample site 

# Target Audience:   
- Busy Professions, Students, Home Cooks, 
- Anyone who find it challenging to discover new recipes what fit their time constrants and available ingredients
- Anyone who feels meals planning and grocery shopping time-consuming and stressful

# Key Features
- Pages are responsive with current section highlighted on header menu
- Page Components are mounted to / unmounted from the page by clicking the header menu component, setting the state for current page
- Application of Template model [Ant Design](https://ant.design/components/overview) 
- Recipe Index - listed all recipies from the database
    - icons for distinguishing type of recipes using array
    - API design - include both the total count and data in the same API to reduce Axio calls and meaningful to user
    - Pagination - using static functions in mongoose, support parameters to query by page number and items per page
    - Add to Planner for each list item - added to a state array for Grocery Planner component handling
    - Click the row to see recipe detail
- Recipe Detail
    - Image Handling - fallback image if image cannot be loaded
    - list and tables
    - Add to Planner and Remove from Planner
    - Comments - with both AJV and Mongoose validation
        - Immediate display the comments on successful submission
        - Display pop up modal to see formated errors on failure
- Submit Recipe
    - Validation
        - Frontend validation on Recipe Type
        - AJV validation on Name
        - Mongoose Validation
    - Controlled component - two way synchronise of input value & onchange implemented on Name field
    - Cover Image - using JS FileReader and reader.readAsDataURL to convert image into base64 format, use of asynchronous function
    - Add Ingredients - using sub-component to group relevant fields, allow saving data in state as array of objects, additional backend validation to check quantity and unit must be provided if ingredient is selected
    - Add Steps - sub-component to group relevant fields and save data as array of objects
    - Create New Ingredient - Modal form, to create a reference document to be used in recipe, instantly refresh the Ingredients cascade selection box
    - Result Modal
        - Allow user to directly navigate to Recipe detail on successful submission
        - Show formated error on failure
- Grocery Planner
    - Conditional message - remind user to add recipes from Recipe Index before start
    - Summarize Ingredients from all recipes added to Grocery Planner state (using Javascript)
        - for same unit, the number will be summed together (e.g. 5 gram + 10 gram will be displayed as 15 gram)
        - for different unit, the quantity will be shown with a plus sign (e.g. 5 gram + 3 tbsp)

# User Guide
- Want to find a recipe? go to our ~Recipe Index~!
    - Click on a row to navigate to the ~Recipe Detail~ Page.
        - You can give your ~Comments~ here for this recipe!
- Eager to share yours with others? go and ~Submit Recipe~!
    - Input the details of your recipe
    - Make sure you enter the ingredients and steps properly
    - Cannot find the ingredient from the dropdown selection? Click ~Create New Ingredient~ with a nice description to add it to our database!
- Struggling how to plan your grocery shopping? Use our ~Grocery Planner~ !
    - Simply go to our ~Recipe Index~ and add your favourite recipes to the planner
    - The Planner will summarise all ingredients you need to buy!

Happy Cooking!



# Build Instruction
- download the project and put into your workspace
- Update your configurations in termProj/.env
    - PORT
    - DB_CONNECTION (Using MongoDB Atlas, after you create your custer, click connect > connect your application and copy the connection string), format would be similar to following, adding db name
```
mongodb+srv://{username}:{password}@cluster0.xxxxxxx.mongodb.net/{dbname}?retryWrites=true&w=majority
```


- navigate to the workspace and run the following command to install required libraries
```
npm install
```
- For development, 
  - open first terminal and run 
```
npm run dev
```
  - open second terminal and run 
```
npm run watch
```

- For general use, open terminal and run 
```
npm run build
node app.js
```

# References
- link
    - file names & line


# API documentation 
• Endpoints and methods with a brief description of each;
• Response format;
• Expected POST body format;
• Examples on how to use each endpoint;
- Please refer to [Swagger Documentation](https://prussian-blue-elephant-vest.cyclic.app/api-docs)


# Supplementary Technical Information
## BACKEND - Node / Express / Mongoose / AJV validation
- app.js - main entry
- db - connection to MongoDB Atlas
- Models - storing mongoose data schema and rules
    - Recipe Data Model: Key data model used in this site
    - Comment: as embeded subdocuments under Recipe Data Model
    - Ingredient: Referenced by Recipe Data Model, include ingredient specific description
    - RecipeIngredient: a sub model storing reference to ingreditent, correspoinding unit and quantity, when creating recipe
- routes - routes for different API categories
- controllers - logics to handle data request and responses
- validators - AJV validation rules
    - fully implemented for comments
    - implemented on name field only for recipe and ingredient creation

## FRONTEND - React / Axios
- index.js main entry
- src - React components, css
    - index.js - handle page navigation by mounting / unmounting components
- public - files packaged by webpack and actually serve to client


# References
## Design Template
- [Ant Design](https://ant.design/components/overview) 
    - used in React Components in src folder
    - Key components
        - [Form](https://ant.design/components/form)
        - [Input](https://ant.design/components/input)
        - [Modal](https://ant.design/components/modal)
        - [Select](https://ant.design/components/select)
        - [Button](https://ant.design/components/button)
        - [Cascader](https://ant.design/components/cascader)
            - ./src/AddIngredient.js: Lines 84-90
        - [Icon](https://ant.design/components/icon)
        - [Pagination](https://ant.design/components/pagination)
        - [Layout](https://ant.design/components/layout)
    - [Group Form implementation reference](https://codesandbox.io/s/heuristic-roentgen-mu0ot?file=/src/GroupForm.js)
        - ./src/AddIngredient.js: Lines 77-119
        - ./src/AddStep.js: Lines 18-42
    - [Create New Ingredit form modal implementation reference](//https://codesandbox.io/s/6wkkjwzw3k?file=/index.js:354-1330)
        - ./src/CreateIngredient.js
    - [Responsive Table in Ant Design](https://codesandbox.io/s/responsive-sample-forked-yji5do?file=/index.js:1034-1177)
        - ./src/GroceryPlanner.js
- Image Upload - CreateRecipe.js
    -[Convert file to base64]https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
        - ./src/CreateRecipe.js: Lines 125-136
- Swagger Documentation
    - used in files under ./model and ./routes
    - [General Tutorial](https://blog.logrocket.com/documenting-express-js-api-swagger/)
    - [Enums](https://swagger.io/docs/specification/data-models/enums/)
        - ./model/Ingredient.js: Lines 21-24
        - ./model/Recipe.js: Lines 32-35
        - ./model/RecipeIngredient.js: Lines 23-26 
- CSS line truncation
    - [How to limit text to n lines](https://albertwalicki.com/learn/solutions/how-to-limit-text-to-n-lines)
        - ./src/style.css : Lines 13-20


