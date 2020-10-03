const jwt = require('jsonwebtoken');

 const comprobatJWT =(token='')=>{

    try {
        const {uid} = jwt.verify(token,process.env.JWT_KEY);
        //req.uid = uid;
        return  [true,uid];
                    
      }catch(error){
          return [false,null];
      }
 }


const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
        }
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {                
                reject('No se pudo generar el jsonwebtoken')
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT,
    comprobatJWT 
}