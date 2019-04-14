

//函数divEscapedContentElement用来显示可疑的文本。
function divEscapedContentElement(message) {
    return $("<div></div>").text(message);
}

//函数divSystemContentElement用来显示系统创建的受信内容
function divSystemContentElement(message) {
    return $('<div></div>').html(`<i>${message}</i>`)
}

//处理原始用户输入
function processUserInput(chatApp, socket) {    
    var message = $("#send-message").val();
    var systemMessage;
    if(message.charAt(0) == '/'){   //如果用户输入的内容以斜杠（/） 开头，将其作为聊天命令 
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    }else{
        console.log($('#room').text())
        chatApp.sendMessage($('#room').text(), message);    //将非命令输入广播给 其他用户
        $('#messages').append(divEscapedContentElement(message));
        $("#messages").scrollTop($('messages').prop('scrollHeight'));
    }
    $("#send-message").val('');
}




//客户端程序初始化逻辑 

var socket = io.connect();
$(document).ready(function() {
    var chatApp = new Chat(socket);

    socket.on('nameResult',function(result){  //显示更名尝试的结果
        var message;

        if(result.success) {
            message = 'You are now konwn as ' + result.name + '.';
        }else{
            message = result.message
        }
        $("#messages").append(divSystemContentElement(message));
    });
    socket.on('joinResult', function(result){   //显示房间变更结果 
        $("#room").text(result.room);
        $("#messages").append(divSystemContentElement("Room changed."))
    })

    socket.on('message', function(message){   //显示接收到的消息 
        console.log('接收到的消息： '+ message)
        var newElement = $("<div></div>").text(message.text);
        $("#messages").append(newElement);
    });

    socket.on("rooms", function (rooms){     //显示可用房间列表 
        $("#room-list").empty();
        for(var room in rooms) {
            room = room.substring(1, room.legth);
            if(room != '') {
                $("#room-list").append(divEscapedContentElement(room));
            }
        }
        $("#room-list div").click(function(){   //点击房间名可以换到那 个房间中
            chatApp.processCommand("/join "+$(this).html());
            $("#send-message").focus();
        })
    });
    $("#send-message").focus();
    setInterval(function() {        //定期请求可用房间列表 
        socket.emit("rooms");
        console.log('定时发送请求了')
    },1000);
    $(document).on("click","#send-button", function(){
        processUserInput(chatApp, socket);
    })
})

