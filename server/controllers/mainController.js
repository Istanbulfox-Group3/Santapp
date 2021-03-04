const axios = require('axios')

class MainController {

    static APIedamam(req,res,next){
        console.log(req.body);
        axios({
            method :'get',
            url : `https://api.edamam.com/api/food-database/v2/parser?ingr=${req.body.searchFood}&app_id=${process.env.APP_ID_EDAMAM}&app_key=${process.env.APP_KEY_EDAMAM}`
        })
        .then(responseAPI=>{
            console.log(responseAPI.data, "ini di controller-------");
            res.status(200).json(responseAPI.data )
            
        })
        
        .catch(err=>{
            next(err)
            console.log(err);
        })
    }
}

module.exports = MainController