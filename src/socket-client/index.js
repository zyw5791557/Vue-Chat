function SocketClient($this) {
    // 音乐初始化
    playmusic('.description','432778620');
    // 用户加入
    socket.emit('user join', $this.userInfo.name);
    // 接受用户数
    socket.on('user join', data => {
        console.log(data)
        $this.onlineUsers = data;
    });
    // 接受历史记录
    socket.on('take messages',  data => {
        console.log('历史记录：', data);
        $this.loading = false;
        $this.currentChatData = data;
        if(data.length >= 1) $this.userTip(data[data.length - 1]);
        $this.$nextTick(() => {
            $this.chatPanelAdjust();
            $this.codeBlockAdjust();
            $this.imageAdjust();
            $this.imagePreview();
        });
    });
    // 接收 message
    socket.on('message', data => {
        console.log('消息',data);
        $this.currentChatData = $this.currentChatData.concat(data);
        $this.$nextTick(() => {
            $this.chatPanelAdjust();
            $this.codeBlockAdjust();
            $this.imageAdjust();
            $this.imagePreview();
        });
    });
    // 接受用户名片
    socket.on('take userInfo', res => {
        console.log(res);
        if(res.Data.name !== $this.userInfo.name) {
            $this.userPanelInfo = res;
        }else {
            $this.myPanel = res;
        }
    });
}


export default SocketClient;