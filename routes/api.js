var express = require('express');
var router = express.Router();
var Crypt = require('../libs/WXBizDataCrypt');
const conn = require('../models/conn');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/token', function(req, res, next) {
    //console.log('---------', req.query);
    var params = req.query;
    var timestamp =params.timestamp;
    var nonce = params.nonce;
    var token = 'shaowh';
    var signature = params.signature;
    var echostr = params.echostr;

    var arr = [timestamp, nonce, token];
    //console.log('=====', timestamp);
    res.send(echostr);
});

router.post('/token', (req, res, next) => {
    var params = req.body;
   // console.log('------', params);
    try {
    
        var appId = "wx43bafc954c5da571";
        var obj = {
            ToUserName: params.ToUserName,
            FromUserName: appId,
            CreateTime: new Date().getTime(),
            MsgType: 'transfer_customer_service'
        };

        //var sql = 'select * from tb_wechat';
        var time = params.CreateTime;
        var toUser = params.ToUserName;
        var fromUser = params.FromUserName;
        var eventName = params.Event || '';
        var closeType = params.CloseTYpe || '';
        var msgType = params.MsgType;
        var content = params.Content || '';
        var sql = `INSERT INTO tb_wechat (time,toUser,fromUser,eventName,closeType,msgType,content) VALUES ('${time}','${toUser}','${fromUser}','${eventName}','${closeType}','${msgType}','${content}');`;
        //console.log('------>>>', sql);
        conn.query(sql).then(ret => {
            //console.log('++++++', ret);
        }).catch(err => {
            console.log('query Error:', err);
        });

        var objMsg = JSON.parse(JSON.stringify(params));
        objMsg.FromUserName = 'gh_2a5673dcb7d2';
        objMsg.ToUserName = params.FromUserName;
        objMsg.MsgType = 'transfer_customer_service';//转接消息到网页版中
        res.send(objMsg);

/*
        var sessionKey = "tiihtNczf5v6AKRyjwEUhQ==";
        var iv = "r7BXXKkLb8qrSNn05n0qiA==";
        var pc = new Crypt(appId, sessionKey);
        console.log('init is ok');
        var data = pc.decryptData(params.Encrypt, iv);
        console.log('=====', data);
        */
    } catch(err) {
        console.log('router Error:', err);
    }
})

module.exports = router;
