#Key Idea: The Ultimate Recipe Hub with Personalized Meal Planning and Daily Picks

#Target Audience:   
- Busy Professions, Students, Home Cooks, 
- Anyone who find it challenging to discover new recipes what fit their time constrants and available ingredients
- Anyone who feels meals planning and grocery shopping time-consuming and stressful

#Goals
- To develop a recipe sharing website with an engaging user experience that helps user to get their recipes using comprehensive search / filters
- To create a weekly meal plan that summarise ingredient list and ease grocery shopping
- To implement a recipe management / sharing systems that allow recipe creation, supplement with user rating and pro tips

#Potential features for the site
- Recipe filters by type, ingredients, and cooking time
- “Recipe of the day” feature
- Weekly planner with grocery list generation
- Recipe management system with comment and rating functionality
- Meal Sharing that allow users to connect with each other to share meals and cooking experiences

#Points Related to Technical Requirements
##Schemas / Models
- Recipe Data Model: name, description, cooking instruction, [ingredients], [comments / ratings], preferenceKey
- Comments / ratings: as embeded subdocuments under Recipe Data Model
- Ingredients: Referenced by Recipe Data Model, may include ingredient specific info like price / nutrition value
##API
- [ Post ] createRecipe
- [ Get/Post ] searchRecipe - query param e.g. ingredients, type, cooking time, preferenceKey (criteria for Recipe of the Day)
- [ Post ] createMealPlan
- [ Post ] Comment / Rating / Pro Tips (updates to recipe data)
- 


https://swagger.io/docs/specification/data-models/enums/
https://blog.logrocket.com/documenting-express-js-api-swagger/

//https://mui.com/material-ui/getting-started/installation/