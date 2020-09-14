const Router = require('koa-router');
const Koa = require('koa');
const checkUserFromDatabase = require('./lib/validation-service.js').checkUserFromDatabase;

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  console.log(ctx.request)
  if (ctx.request.header.authorize === undefined) ctx.throw(400);

  let authorizeHeader = ctx.request.header.authorize.split(" ");
  let method;
  let encoded_user_pass;
  if (authorizeHeader.length === 2) {
    method = authorizeHeader[0];
    encoded_user_pass = authorizeHeader[1];
  } else {
    ctx.throw(400);
  }

  let user_info = encoded_user_pass.split(":");
  if (user_info.length !== 2) ctx.throw(401);

  let user = user_info[0].toLowerCase();
  let password = user_info[1].toLowerCase();

  let clientIp = (ctx.request.ip).toString();
  if (user === "" || password === "") ctx.throw(401);

  let reqObj = {"method": method, "credentials": {uid: user, "password": password}};
  let token;

  let answerIP = await isIpBlackListed(clientIp)

  if (answerIP === true) ctx.throw()

  let resultRedis = await isBlackListed(reqObj.credentials.uid)

  if (resultRedis === true) ctx.throw()
  token = await checkUserFromDatabase(reqObj, clientIp, resultRedis, answerIP);
  ctx.status = 200
  ctx.body = JSON.stringify(token);
});
app.use(router.routes())
//TODO implement from config
app.listen(3092);
