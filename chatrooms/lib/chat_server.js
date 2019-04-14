var socketio = require("socket.io");
var io;
var guestNumber = 1; //来宾数量
var nickNames = {}; //昵称
var namesUsed = []; //已使用名称
var currentRoom = {};//当前房间


exports.listen = function (server){
    io = socketio.listen(server);
    io.set('log level', 1);
    io.sockets.on("connection", function(socket){   //定义每个用户连接的处理逻辑
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);//在用户连接上来时赋予其一个访客名   
        joinRoom(socket, 'lobby');  //进入房间的逻辑
        handleMessageBroadcasting(socket, nickNames);   //处理用户的消息，更名，以及聊天室的创建和变更
        handleNameChangeAttempts(socket, nickNames, namesUsed); //用户修改名称
        handleRoomJoining(socket);  ////创建房间

        socket.on('rooms', function() { //用户发出请求时，向其提供已经被占用的聊天室的列表       
            console.log('发送rooms的列表')             
            socket.emit('rooms', io.sockets.manager.rooms);
        });

        handleClientDisconnection(socket, nickNames, namesUsed) //定义用户断开连接后的清除逻辑
    })
}


//分配用户昵称 
function assignGuestName(socket, guestNumber, nickNames, namesUsed){    //生成新昵称
    var name = 'Guest'+guestNumber;
    nickNames[socket.id] = name;    //把用户昵称和客户端ID连上
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    namesUsed.push(name);
    return guestNumber + 1;       
}

//进入房间
function joinRoom(socket, room) {
    socket.join(room);              //让用户进入房间
    currentRoom[socket.id] = room ; //记录用户的当前房间
    socket.emit('joinResult',{room: room});//让用户知道他们进入了房间
    socket.broadcast.to(room).emit("message", {
        text: nickNames[socket.id] + 'has joined ' + room + '.'
    })

    var userInRoom = io.sockets.clients(room); //确认有哪些用户在这个房间里
    if(userInRoom.length > 1){  //如果不止一个用户在这个房间里，汇总下都是谁
        var userInRoomSummary = `Users currently in ${room}:`;
        for(var index in userInRoom){
            var userSocketId = userInRoom[index].id;
            if(userSocketId != socket.id) {
                if(index > 0){
                    userInRoomSummary += ', ';
                }
            }
            userInRoomSummary += nickNames[userSocketId];
            
        }
    }
    userInRoomSummary += '. ';
    socket.emit('message', {text : userInRoomSummary})  //将房间里其他用户的汇总发送给这个用户
}


//用户修改名称
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
    socket.on('nameAttempt', function(name) {   //添加nameAttempt事件监听器
        if(name.indexOf("Guest") == 0){ //昵称不能以guest开头
            socket.emit('nameResult', {
                success: false,
                message: 'Names cannot bengin with "Guest".'
            });
        }else{
            if(namesUsed.indexOf(name) == -1){  //如果名称未占用，则创建
                var previousName = nickNames[socket.id];
                var previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id] = name;
                delete namesUsed[previousNameIndex];    //删除之前用的名称，让其他用户可以使用
                socket.emit("nameReast", {
                    success: true,
                    name:name
                })
                socket.broadcast.to(currentRoom[socket.id]).emit("message",{
                    text:previousName +'is now known as ' + name + '.'
                });
            }else{  //如果名称已经被占用，则发送错误信息
                socket.emit('nameResult', {
                    success: false,
                    message: 'That name is already in use'
                })
            }
        }
    })
}


//转发消息
function handleMessageBroadcasting(socket) {
    console.log('转发消息了: ')
    socket.on("message",function(message){
        console.log(message)
        socket.broadcast.to(message.room).emit("message", {
            text: nickNames[socket.id] + ': ' + message.text
        });
    });
}



//创建房间
function handleRoomJoining(socket){
    socket.on("join", function(room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    });
}


//用户断开来连接
function handleClientDisconnection(socket) {
    socket.on('disconnect', function() {
        var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
}





