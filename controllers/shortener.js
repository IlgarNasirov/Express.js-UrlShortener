const {validationResult}=require('express-validator');

const Shortener=require('../models/shortener');

exports.getAdd=(request, response, next)=>{
    response.render('shortener/index');
};

exports.getPage=async(request, response, next)=>{
    const value=request.params.urlId;
    try{
        const data=await Shortener.findById(value);
        if(!data){
           return response.redirect('/');
        }
        response.redirect(data.url);
    }
    catch(error){
        const newError=new Error(error);
        next(newError);
    }
};

exports.postAdd=async(request, response, next)=>{
    const errors=validationResult(request).array();
    if(errors.length>0){
        return response.render('shortener/shortener', {hasError: true, error: errors[0].msg});
    }
    const url=request.body.url;
    try{
        const result=await Shortener.findOne({
            url: url
        });
        if(result){
            return response.render('shortener/shortener', {hasError: false, longUrl:result.url, url: request.get('host')+"/"+result._id});
        }
        const shortener=new Shortener({
            url:url
        });
        await shortener.save();
        response.render('shortener/shortener', {hasError: false, longUrl:shortener.url, url: request.get('host')+"/"+shortener._id});
    }
    catch(error){
       const newError=new Error(error);
       next(newError); 
    }
};