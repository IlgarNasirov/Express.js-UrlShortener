const express=require('express');
const {body}=require('express-validator');

const router=express.Router();

const shortenerController=require('../controllers/shortener');

router.get('/', shortenerController.getAdd);

router.get('/:urlId', shortenerController.getPage);

router.post('/shortener', body('url').isURL().withMessage('Please enter a valid URL.'), shortenerController.postAdd);

module.exports=router;