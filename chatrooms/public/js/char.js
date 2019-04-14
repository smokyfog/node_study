var Chat = function(socket){
    this.socket = socket;
};


//发送聊天的函数
Chat.prototype.sendMessage = function(room, text){
    var message = {
        room: room,
        text: text
    };
    this.socket.emit("message", message)
};

//变更房间的函数
Chat.prototype.changeRoom = function(room) {
    this.socket.emit('join', {
        newRoom: room
    });
};


//处理聊天的命令
Chat.prototype.processCommand = function(command){
    console.log('processCommand： ' + command)
    var words = command.split(' ');
    var command = words[0].substring(1, words[0].length).toLowerCase(); //从第一个单词开始解析命令
    var message = false;
    console.log(command)
    switch(command) {
        case 'join':
            words.shift();
            var room = words.join(' ');
            this.changeRoom(room);      //处理房间的变换/创建
            break;
        case 'nick':
            words.shift();
            var name = words.join(' ');
            this.socket.emit('nameAttempt', name);  //处理更名尝试
            break;
        default:
            message = 'Unrecognized command.';
            break;
    }
    return message;
}