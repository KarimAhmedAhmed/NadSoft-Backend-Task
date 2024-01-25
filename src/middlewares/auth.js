const { PermissionError } = require("../utils/Errors");
const { checkAuthToken } = require("../service/JWTTokenService");

 const ensureAuth = async (
  req,
  res,
  next
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) throw new PermissionError("Unauthorized");
    const user = await checkAuthToken(token);

    if (!user) throw new PermissionError("Unauthorized");
    req.body.user = user;
    next();
  } catch (error) {
    throw new PermissionError("Unauthorized");
   }
};

module.exports =ensureAuth