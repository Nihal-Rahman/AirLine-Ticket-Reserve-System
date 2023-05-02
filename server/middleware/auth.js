const {verify} = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");


    if(!accessToken){
        return res.json({error: "User not logged in!"});
    }

    try{
        const valid = verify(accessToken, "ilovedatabases");

        if(valid){
            req.userInfo = valid;
            return next();
        }
    } catch(err) {
        console.log(err);
        return res.json({error: err})
    }
}

module.exports = {validateToken}