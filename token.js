function doPost(e){
    var dataFromTelegram = {
        "method": "post",
        "payload": e.postData.contents
    }
    var body = JSON.parse(e.postData.contents);

    body.message.chat.id = body.message.chat.id + '';

    var payload = preparePayload(body);
    var data = {
        "method": "post",
        "payload": payload
    }

    var dataToTelegram = {
        "method": "post",
        "payload": payload
    }

    UrlFetchApp.fetch("https://api.telegram.org/bot682267360:AAHmjSil8oylavD2pENLLpcMU1svaD7mVeA/", data);
}
function preparePayload(body){
    var payload;

    body.message.text = body.message.text.toLowerCase();
    body.message.text = body.message.text.replace(/@temptestbot2/g, '');

    var paras = body.message.text.trim().split(" ");
    // remove empty strings
    paras = paras.filter(function(para){
        if (para){
            return true;
        }
    });

    if (body.message.text){

        payload = {
            "method": "sendMessage",
            "chat_id": body.message.chat.id,
            "text": "你好， 欢迎使用本机器人， 本机器人现在只认识颜色。",
        }

        if(body.message.text.indexOf("/help") === 0){
            payload.text = "你好， 欢迎使用本机器人， 本机器人现在只认识颜色。";
            return payload;
        }

        if(body.message.text.indexOf("/colors") === 0){
            payload.text = "红\n黄\n蓝";
            return payload;
        }

        if(body.message.text.indexOf("/list") === 0){
            if (paras[1]){
                switch (paras[1].toLowerCase()){
                    case "people":
                        if (paras[2]){
                            if ("JS神技能".toLowerCase().indexOf(paras[2]) >= 0){
                                payload.text = "JS神技能 - https://www.youtube.com/channel/UC6tPP3jOTKgjqfDgqMsaG4g";
                            }
                            if ("悟空的日常".toLowerCase().indexOf(paras[2]) >= 0){
                                payload.text = "悟空的日常 - https://www.youtube.com/channel/UCii04BCvYIdQvshrdNDAcww";
                            }
                            if ("YuFeng Deng".toLowerCase().indexOf(paras[2]) >= 0){
                                payload.text = "YuFeng Deng - https://www.youtube.com/channel/UCG6xoef2xU86hnrCsS5m5Cw";
                            }
                        } else {
                            payload.text = "JS神技能\n"
                                + "悟空的日常\n"
                                + "YuFeng Deng\n";
                            return payload;
                        }
                        break;
                    default:
                        payload.text = "红\n黄\n蓝";
                        break;
                }

                return payload;
            } else {
                payload.text = "JS神技能\n"
                    + "悟空的日常\n"
                    + "YuFeng Deng\n";
                return payload;
            }
        }



        payload = {
            "method": "sendMessage",
            "chat_id": body.message.chat.id,
            "text": body.message.text,
        }

    }
    else if (body.message.sticker){
        payload = {
            "method": "sendSticker",
            "chat_id": body.message.chat.id,
            "sticker": body.message.sticker.file_id
        }
    }
    else if (body.message.photo){
        array = body.message.photo;
        text = array[1];
        payload = {
            "method": "sendPhoto",
            "chat_id": body.message.chat.id,
            "photo": text.file_id
        }
    }
    else {
        payload = {
            "method": "sendMessage",
            "chat_id": body.message.chat.id,
            "text": "Try other stuff"
        }
    }
    return payload
}
