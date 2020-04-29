/**
* Created by doga on 14/04/16.
*/


var config = require('../resources/config'),
redis = require('redis');

var redisCli = redis.createClient(config.redis.redis_port, config.redis.redis_ip, {no_ready_check: true});

redisCli.on("error", function (err) {
  console.error(err);

});

redisCli.select(config.redis.db, function (err, res) {
  if (err)  {
    console.error(err,res);
  }
});

function IsBlackListed(user_name){
  return new Promise(
    function(fullfill,reject){
      var key = "blacklist/authn_try_count:user:"+ user_name;
      redisCli.get(key, function(err, reply) {
        reply = Number (reply)
        if (reply >= 5){
          reject(true)
        }else{
          fullfill(false);
        }
      });
    }
  )
}



function isBlacklistIp(ip){
  return new Promise(
    function(fullfill,reject){
      var key  = "blacklist/authn_try_count:ip:"+ ip;
      redisCli.get(key, function(err, reply) {
        reply = Number (reply)
        if (reply >= 100){
          reject(true)
        }else{
          fullfill(reply);
        }
      });
    }
  )
}

function updateBlackList(user_name,count,callback){
  var key = "blacklist/authn_try_count:user:"+ user_name;
  count = count + 1;
  redisCli.set(key,count, function (err, res) {
    //TODO implement
  });
}

function updateIpBlackList(ip,count,callback){
  var key  = "blacklist/authn_try_count:ip:"+ ip;
  count = count + 1;
  redisCli.set(key,count, function (err, res) {
    // TODO implement
  });
}


function ipTTL(ip){
  var key  = "blacklist/authn_try_count:ip:"+ ip;
  redisCli.expire(key , 60 * 60)

}

function TTL(user_name){
  var key = "blacklist/authn_try_count:user:"+ user_name;
  redisCli.expire(key , 60 * 5);
}



module.exports = {
  IsBlackListed: IsBlackListed,
  updateBlackList: updateBlackList,
  isBlacklistIp:isBlacklistIp,
  updateIpBlackList:updateIpBlackList,
  TTL:TTL,
  ipTTL:ipTTL
};
