
function desktopRemind (res, $this) {
    console.log('桌面提醒啊啊啊')
    if (res[0].from !== $this.userInfo.name) {
        var d = JSON.parse(localStorage.getItem('desktopNotification'));
        var s = JSON.parse(localStorage.getItem('soundNotification'));
        if (s) {
            // 消息声音提醒
            var ado = new Audio('/static/audio/momo.mp3');
            ado.play();
        }
        if (d) {
            // 桌面消息提醒
            Notification.requestPermission(function (permission) {
                if (permission == "granted") {
                    var notification = new Notification((res[0].to === 'all' ? "群聊窗口" : res[0].from) + "- 发来消息", {
                        dir: "auto",
                        lang: "zh-CN",
                        // tag: "testNotice",
                        icon: '/static/images/sleep.gif',
                        body: `${res[0].from}：${$this.noticeProcess(res[0].message,res[0].type)}`,
                        // renotify: true,     // 是否替换之前的通知
                    });
                    notification.onclick = function () {
                        window.focus();
                        notification.close();
                    };
                    notification.onshow = function () {
                        //3秒后自动关闭消息框    
                        setTimeout(function () {
                            notification.close();
                        }, 3000);
                    }
                }
            });
        }
    }
}


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
        const f = data[0].to === $this.currentChatUserInfo.userID;
        if(f) {
            $this.currentChatData = $this.currentChatData.concat(data);
        } else {
            const o = {
                name: data[0].from,
                userID: data[0].from,
                avatar: data[0].avatar,
                unread: 0,
                messageInfo: {}
            }
            $this.userList.push(o);
        }
        $this.$nextTick(() => {
            $this.chatPanelAdjust();
            $this.codeBlockAdjust();
            $this.imageAdjust();
            $this.imagePreview();
        });
        // 桌面提醒
        desktopRemind(data, $this);
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
    // 权限检查
    socket.on('check permission', f => {
        if(f) {
            $this.systemConfig.clearDataLock = false;
        }
    });
}


export default SocketClient;