const Ajv = require("ajv");
const ajv = new Ajv({
	allErrors:true, // run all validations and return all errors, instead of terminate once error hit
	coerceTypes:true,  // try to convert "true" to Boolean value true
	useDefaults: true}); 

require('ajv-keywords')(ajv); //calling the function on our ajv instance
require('ajv-formats')(ajv); 
require('ajv-errors')(ajv); 

// Validate Comments
const commentValidator = (req, res, next) => {
	let schema = {
        type: 'object',
		properties:{
			name:{ type: 'string', transform: ['trim'], minLength: 3, maxLength: 30,
				errorMessage :{minLength:"AJV: Name too short!", maxLength: "AJV: Name too long!"}},
				rating:{ 	type:'number', minimum:0, maximum:5,
                errorMessage :{type:"AJV: Number Only!", minimum:"AJV: Rate too low!", maximum: "AJV: Rate too high!"}},
			comment:{ 	type:'string', minLength:5, maxLength:300,
                errorMessage :{minLength:"AJV: Comment too short!", maxLength: "AJV: Comment too long!"}},
		},
		required: ['name','rating'],  // ** empty string is "ok" for the validator => check minLength
		additionalProperties: true, // allow additional properties to pass it, will not fail
		errorMessage :{
			required:{ 'name':'AJV: Name is required!', 'rate': 'AJV: Rate is required!'}
		}, 
	} // end schema

	const validate = ajv.compile(schema);
	validate(req.body);

	if(validate.errors != null) {
		res.status(500).json(validate.errors);
	} else {
		next(); 
	}


};


// Validate Ingredient
const ingredientValidator = (req, res, next) => {
	let schema = {
        type: 'object',
		properties:{
			name:{ type: 'string', transform: ['trim'], minLength: 3, maxLength: 30,
				errorMessage :{minLength:"AJV: Name too short!", maxLength: "AJV: Name too long!"}},
		},
		required: ['name'],
		additionalProperties: true,
		errorMessage :{
			required:{ 'name':'AJV: Name is required!'}
		}, 
	} // end schema

	const validate = ajv.compile(schema);
	validate(req.body);

	if(validate.errors != null) {
		res.status(500).json(validate.errors);
	} else {
		next(); 
	}



};



// Validate Recipe
const recipeValidator = (req, res, next) => {
	let schema = {
        type: 'object',
		properties:{
			name:{ type: 'string', transform: ['trim'], minLength: 3, maxLength: 50,
				errorMessage :{minLength:"AJV: Name too short!", maxLength: "AJV: Name too long!"}},
		},
		required: ['name'],
		additionalProperties: true,
		errorMessage :{
			required:{ 'name':'AJV: Name is required!'}
		}, 
	} // end schema

	const validate = ajv.compile(schema);
	validate(req.body);

	if(validate.errors != null) {
		res.status(500).json(validate.errors);
	} else {
		next(); 
	}


};

module.exports = {commentValidator, ingredientValidator, recipeValidator};