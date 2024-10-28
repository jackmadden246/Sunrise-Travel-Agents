const Joi = require('joi');

   
    
        module.exports.holidaySchema = Joi.object({ 
            holiday: Joi.object({
                destination: Joi.string().required(), 
                image: Joi.string().required(), 
                start_date: Joi.date(), 
                end_date: Joi.date(),
                traveler_name: Joi.string(),
                accommodation_description: Joi.string(), 
                traveler_age: Joi.number().required().min(0),
                traveler_gender: Joi.string(),
                traveler_nationality: Joi.string(), 
                accommodation_type: Joi.string().required(),
                accommodation_cost: Joi.number().required().min(0), 
                transportation_type: Joi.string().required(), 
                transportation_cost: Joi.number().required().min(0),
                duration: Joi.number().required().min(0)
                }).required()
            
                })