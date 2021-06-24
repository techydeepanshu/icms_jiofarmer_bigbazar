const { privateKEY, publicKEY } = require("./config");
const jwt = require("jsonwebtoken");

module.exports = {
 sign: (payload) => {
  /*
   sOptions = {
    issuer: "Authorizaxtion/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }
  */
  // Token signing options
  const signOptions = {
    expiresIn:  "12h",
    algorithm:  "RS256"
  };
  return jwt.sign(payload, privateKEY, signOptions);
},
verifyToken: (token) => {
  /*
   vOption = {
    issuer: "Authorization/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }  
  */
  token = token.replace(/^Bearer\s+/, "");
  const verifyOptions = {
      // issuer:  $Option.issuer,
      // subject:  $Option.subject,
      // audience:  $Option.audience,
      expiresIn:  "12h",
      algorithm:  ["RS256"]
  };
   try{
     return jwt.verify(token, publicKEY, verifyOptions);
   }catch (err){
     return false;
   }
},
 decode: (token) => {
    return jwt.decode(token, {complete: true});
    //returns null if token is invalid
 }
}
