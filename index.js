/**
* Created by doga on 22/10/2016.
*/

const logger = require('./lib/logger')(),
checkUserFromDatabase = require('./lib/validation-service.js').checkUserFromDatabase,
isBlackListed = require('./lib/blacklist.js').IsBlackListed,
isIpBlackListed = require('./lib/blacklist.js').isBlacklistIp,
config = require('./resources/config.js');

const Koa = require('koa');
const koaApp = new Koa();
//TODO implement koa-router for adress
koaApp.use(async (ctx, next) => {

  if (ctx.request.header.authorize == undefined) ctx.throw(400);

  let authorizeHeader = ctx.request.header.authorize.split(" ");
  if (authorizeHeader.length === 2) {
    var method = authorizeHeader[0];
    var encoded_user_pass = authorizeHeader[1];
  } else {
    ctx.throw(400);
  };

  let user_info = encoded_user_pass.split(":");
  if (user_info.length !== 2) ctx.throw(401);

  let user = user_info[0],
  password = user_info[1];
  //TODO client ip not implemented
  let clientIp = (ctx.request.ip).toString();
  if (user === "" || password === "") ctx.throw(401);

  let reqObj = {"method": method,"credentials": {uid: user, "password": password}};
  let token;

  let answerIP = await isIpBlackListed(clientIp)

  if (answerIP === true) ctx.throw()

  let resultRedis = await isBlackListed(reqObj.credentials.uid)

  if (resultRedis === true) ctx.throw()

  let tokenObj = await checkUserFromDatabase(reqObj, clientIp, resultRedis, answerIP);
//TODO implement stream to body
  token = tokenObj;
  ctx.status = 200
  ctx.body = JSON.stringify(token);

});
//TODO implement from config
koaApp.listen(3012);
