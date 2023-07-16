const userWS = require("../DALs/userWS");
const helper = require("../helpers/error-handler");
const userService = require("../DALs/userDBService");
const jwt = require("jsonwebtoken");

require("dotenv").config();
//generates jwt access token using sercert for access token.
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
//generates jwt refresh token using secret for refresh token.
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

//authenticates user using jsonplaceholder webservice, return access token,refresh token,user id.
const authenticateUser = async (credentials) => {
  try {
    const { fullName, email } = credentials;
    let { data: emailResult } = await userWS.getUserByEmail(email);
    let { data: nameResult } = await userWS.getUserByName(fullName);
    if (emailResult.length > 0) {
      if (nameResult.length > 0) {
        const { _id: userID } = await userService.getUserByName(fullName);
        //jwt.sign creates a jwt token, takes some "Payload" which can be userID, then takes the "secret" and takes expiration time.
        const accessToken = generateAccessToken({
          userInfo: { fullName, email, userID },
        });
        const refreshToken = generateRefreshToken({
          userInfo: { fullName, email, userID },
        });
        return {
          access_token: accessToken,
          id: userID,
          refresh_token: refreshToken,
        };
      } else {
        throw new Error(helper.authErrorHandler("USER_ERROR"));
      }
    } else if (nameResult.length > 0) {
      throw new Error(helper.authErrorHandler("EMAIL_ERROR"));
    } else {
      throw new Error(helper.authErrorHandler("NOT_EXIST"));
    }
  } catch (err) {
    return err;
  }
};

//send new access token when expired using refresh token, if bot expired then send "expired" which makes user forcefully logout,
// and user needs to relogin again.
const refreshToken = (tokens) => {
  const accessVerify = jwt.verify(
    tokens.access_token,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        if (err.message == "jwt expired") {
          return true;
        }

        return decoded;
      }
    }
  );
  const refreshVerify = jwt.verify(
    tokens.refresh_token,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        if (err.message == "jwt expired") {
          return true;
        }
      } else {
        const { fullName, email, userID } = decoded.userInfo;
        const newToken = generateAccessToken({
          userInfo: { fullName, email, userID },
        });
        const newRefreshToken = generateRefreshToken({
          userInfo: { fullName, email, userID },
        });
        return {
          access_token: newToken,
          refresh_token: newRefreshToken,
          id: userID,
        };
      }
    }
  );

  if (refreshVerify == true && accessVerify == true) {
    return "Need To Login Again";
  } else {
    console.log("returning refresh");
    return refreshVerify;
  }
};

module.exports = {
  authenticateUser,
  refreshToken,
};
