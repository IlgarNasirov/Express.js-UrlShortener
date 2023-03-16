exports.get404=(request, response, next)=>{
    response.status(404).render('404');
};

exports.get500=(error, request, response, next)=>{
    console.log(error);
    response.status(500).render('500');
};