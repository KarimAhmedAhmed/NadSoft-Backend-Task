const jwt = require("jsonwebtoken");
const  {PermissionError}  =  require("../utils/Errors");
const MemoryCache = require('./memoryCache'); 


let memoryCache = new MemoryCache();

 async function createAccessToken(email, mobile) {
  let secretKey = process.env.SECRET_KEY? process.env.SECRET_KEY: "secret-key";
  const payload = { email, mobile };
  const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
  await memoryCache.storeToken(mobile, token);

  return token;
}

 async function checkAuthToken(token) {
    let secretKey = process.env.SECRET_KEY? process.env.SECRET_KEY: "secret-key";
  console.log(token, secretKey)
    let user = jwt.verify(token, secretKey, async (err, user) => {
      if (err) {
        throw new PermissionError("Forbidden");
      }
            return user;
    });


  return true;
}


module.exports = {
  createAccessToken,
  checkAuthToken,
};