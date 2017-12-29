<script>
import Date from '@/common/js/util.js';
import UserSettingModule from '@/components/UserSettingModule';
import SystemSettingModule from '@/components/SystemSettingModule';
import PanelRoomNoticeModule from '@/components/PanelRoomNoticeModule';
import PanelRoomInfoModule from '@/components/PanelRoomInfoModule';
import PanelExpressionModule from '@/components/PanelExpressionModule';
export default {
    /**@components  - 组件注册
     * UserSettingModule        用户设置
     * SystemSettingModule      系统设置
     * PanelRoomNoticeModule    群聊公告面板
     * PanelRoomInfoModule      群聊信息面板
     * PanelExpressionModule    表情模块
     * 
     * @data        - 状态
     * userInfo                 用户信息
     * duration                 注册时长
     * currentChatData          当前聊天窗口的消息
     * chatGroup                群聊组
     * userList                 用户列表
     * systemConfig             系统设置配置项
     * userSettingFlag          用户设置窗口状态
     * systemSettingFlag        系统设置窗口状态
     * chatPanelFlag            聊天窗口状态
     * roomNoticeFlag           群聊公告窗口状态
     * roomInfoFlag             群聊信息窗口状态
     * expressionFlag           表情输入窗口状态
     * secretPanel              私聊 / 群聊标志位
     * codeInputFlag            代码输入窗口状态
     * 
     * @computed    - 计算属性
     * mask                     全局蒙版
     * 
     * @methods     - 方法
     * loadChatData             加载离线消息
     * clearPanel               清除所有面板状态
     * loadChatPanel            加载聊天面板
     * unfinished               未完成提示
     * normalSmartProcess       消息智能处理
     * noticeProcess            消息提示工厂
     * userTip                  用户列表消息提示处理
     * sendMessage              发送消息
     * takeMessage              调取离线消息
     * logout                   注销
     * chatPanelAdjust          调整聊天框位置
     * codeBlockAdjust          代码块格式化调整
     * imageAdjust              图片加载完成调整
     */
    components: {
        UserSettingModule,
        SystemSettingModule,
        PanelRoomNoticeModule,
        PanelRoomInfoModule,
        PanelExpressionModule
    },
	data() {
		return {
            message: '',
            code: '',
            userInfo: JSON.parse(localStorage.getItem('UserInfo')),
            duration: ~~localStorage.getItem('Duration'),
            currentChatData: [],
            chatGroup: ['all'],
            userList: [
                {
                    name: '群聊',
                    userID: 'all',
                    avatar: '/static/images/sleep.gif',
                    unread: 0,
                    messageInfo: {
                        message: '',
                        date: ''
                    }
                }
            ],
            currentChatUserInfo: {
                name: '',
                userID: '',
                avatar: ''
            },
            systemConfig: {
                SOURCE_CODE: 'https://github.com/zyw5791557/EmliceChat',
                WEB_SITE: 'https://www.emlice.top'
            },
            userSettingFlag: false,
            systemSettingFlag: false,
            chatPanelFlag: true,
            roomNoticeFlag: false,
            roomInfoFlag: false,
            expressionFlag: false,
            secretPanel: false,
            codeInputFlag: false,
		}
    },
    watch: {
        currentChatData (val) {
            const last = val[val.length - 1];
            this.userTip(last);
        }
    },
    computed: {
        mask () {
            if(
                this.userSettingFlag || 
                this.systemSettingFlag || 
                this.roomNoticeFlag ||
                this.roomInfoFlag ||
                this.expressionFlag ||
                this.codeInputFlag
            ) {
                return true;
            }else {
                return false;
            }
        }  
    },
	methods: {
        loadChatData () {

        },
        clearPanel () {
            this.userSettingFlag = false;
            this.systemSettingFlag = false;
            this.roomNoticeFlag = false;
            this.roomInfoFlag = false;
            this.expressionFlag = false;
            this.codeInputFlag = false;
        },
        loadChatPanel (item) {
            if(item.userID === this.currentChatUserInfo.userID) return;
            this.takeMessage({
                from: this.userInfo.name,
                take: item.userID
            });
            const { name, userID, avatar } = item;
            this.currentChatUserInfo.name = name;
            this.currentChatUserInfo.userID = userID;
            this.currentChatUserInfo.avatar = avatar;
            if(this.chatGroup.indexOf(item.userID) !== -1) {
               this.chatPanelFlag = false; 
            }else {
                this.secretPanel = true;
            }
        },
        unfinished () {
            this.$notify.info({ title: '消息', message: '暂未开放' });
        },
        normalSmartProcess (param, type) { 
            var FTA = param.match(/^(https?|ftp|file):\/\//g);
            var f = param.match(/.*(\.png|\.jpg|\.jpeg|\.gif)$/);
            // 远程图片链接解析, 接口反防盗链
            if(FTA !== null && f !== null) {
                return `
                    <div class="image">
                        <img data-original="/api/imgload?url=${param}" src="/api/imgload?url=${param}" onerror="this.src='/static/images/imgError.jpg'" style="max-height: 200px;">
                    </div>
                `;
            }
            // 渲染链接
            if (FTA !== null) {
                return `
                    <div class="text">
                        <a class="imageURL" href="${param}" rel="noopener noreferrer" target="_blank">${param}</a>
                    </div>
                `;
            } else {
                return `
                    <div class="text">
                        ${param}
                    </div>
                `;
            }
        },
        expressionProcess (item) {
            const baidu = this.$store.state.expression.baidu.data;
            const baidu_space = this.$store.state.expression.baidu.space;
            const baidu_address = this.$STATIC_URL + this.$store.state.expression.baidu.address;
            let query;
            if(item.type === 'expression') {
                query = item.message;
            }else {
                query = item.message.substr(1);
            }
            let baidu_idx;
            baidu.some((item, index) => {
                if (item === query) {
                    baidu_idx = index;
                }
            });
            if(baidu_idx === undefined) return item.message;
            return  `<img 
                        class="expression-default-message" 
                        src="data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==" 
                        style="background-position: left -${baidu_idx * baidu_space}px; background-image: url(${baidu_address})" 
                        onerror="this.style.display='none'">`
        },
        noticeProcess (param,type) {
            const baidu = this.$store.state.expression.baidu.data;
            if (type === 'expression') {
                var baidu_idx;
                baidu.some((item, index) => {
                    if (item === param) {
                        baidu_idx = index;
                    }
                });
                if (baidu_idx === undefined) return param;
                return `[表情]`;
            } else if (type === 'printscreen') {
                return `[图片]`;
            } else if(type === 'code') {
                return `[代码片段]`;
            } else {
                var FTA = param.match(/^(https?|ftp|file):\/\//g);
                var f = param.match(/.*(\.png|\.jpg|\.jpeg|\.gif)$/);
                if(FTA !== null && f !== null) return `[远程地址图片]`;
                if(FTA !== null) return `[链接]`; 
                return param;
            }
        },
        userTip (last) {
            this.userList.some(item => {
                if(item.userID === last.to) {
                    item.messageInfo.message = last.from + '： ' + this.noticeProcess(last.message,last.type);
                    item.messageInfo.date = new Date(last.date).format('hh:mm');
                }
            });
        },
        sendMessage (message,type,clear) {
            var msg = {
                from: this.userInfo.name,
                avatar: this.userInfo.avatar,
                to: this.currentChatUserInfo.userID,
                message: message,
                type: type,
                date: new Date().getTime(),
                read: false,
            }
            console.log('消息', msg);
            socket.emit('message', msg);
            this[clear] = '';
        },
        takeMessage (o) {
            socket.emit('take messages', o);
        },
        logout () {
            localStorage.removeItem('UserInfo');
            this.$router.push({ name: 'Login' });
        },
        chatPanelAdjust () {
            if(!this.$refs.messageList) return;
            this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
        },
        codeBlockAdjust () {
            if(!this.$refs.codeBlock) return;
            for(let i = 0; i < this.$refs.codeBlock.length;i++) {
                hljs.highlightBlock(this.$refs.codeBlock[i]);
            }
        },
        imageAdjust () {
            if(!this.$refs.messageList) return;
            /**
             * 创建 imagesLoaded 实例
             * 确保 image 加载完毕改变聊天室 scrollTop
             */
            const imgLoad = imagesLoaded(this.$refs.messageList);
            // vanilla JS
            imgLoad.on('always',  instance => {
                if (!this.$refs.messageList) return;
                this.chatPanelAdjust();
            });
        },
        imagePreview () {
            // 图片放大
            if(this.$refs.preview) new Viewer(this.$refs.messageList, {
                url: 'data-original'
            });
        }
	},
	mounted() {
        // 音乐初始化
        playmusic('.description','432778620');
        // 用户加入
        socket.emit('user join', this.userInfo.name);
        // 接受历史记录
        socket.on('take messages',  data => {
            console.log('历史记录：', data);
            this.currentChatData = data;
            this.userTip(data[0]);
        });
        // 接收 message
        socket.on('message', data => {
            console.log('消息',data);
            this.currentChatData = this.currentChatData.concat(data);
        });
	},
    updated() {
        this.codeBlockAdjust();
        this.chatPanelAdjust();
        this.imageAdjust();
        this.imagePreview();
        console.log('更新了')
    }
}
</script>

<template>
	<div class="chatroom">
		<div class="windows">
            <div class="background">
                <div style="background-size: 1920px 1030px;background-image: url('/static/images/b.jpg');"></div>
            </div>
            <div v-show="mask" @click="clearPanel" class="mask-layout"></div>
            <div class="chatRoom">
                <header>
                    <div class="logo">
                        <img src="https://assets.suisuijiang.com/images/logo.b3e14.png">
                    </div>
                    <div class="nav-list">
                        <div class="nav-list-item selected" title="聊天">
                            <i class="icon"></i>
                        </div>
                        <div @click="unfinished" class="nav-list-item " title="联系人">
                            <i class="icon"></i>
                        </div>
                        <div @click="systemSettingFlag = true" class="nav-list-item " title="系统设置">
                            <i class="icon"></i>
                        </div>
                    </div>
                    <div class="user-panel">
                        <div class="online" title="在线"></div>
                        <div :style="`background-image: url(${userInfo.avatar})`" @click="userSettingFlag = true" class="avatar-text" title="查看个人信息"></div>
                    </div>
                </header>
                <div class="body">
                    <div class="user-list">
                        <div v-for="(item,index) in userList" :key="index" @click="loadChatPanel(item)" class="user-list-item" :data-user="item.userID">
                            <img class="avatar-image" :src="item.avatar" alt="">
                            <div class="unread">{{ item.unread }}</div>
                            <div class="content">
                                <div>
                                    <p>{{ item.name }}</p>
                                    <p>{{ item.messageInfo.date }}</p>
                                </div>
                                <div>
                                    <p>{{ item.messageInfo.message }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="chatPanelFlag" class="empty-chat-panel" chat-type="empty"></div>
                    <div v-else class="chat-panel" chat-type="">
                        <div class="chat-panel-header">
                            <div>
                                <img class="avatar-image" :src="currentChatUserInfo.avatar" style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                                <p>{{ currentChatUserInfo.name }}</p>
                            </div>
                            <div v-if="!secretPanel">
                                <div @click="roomNoticeFlag = true" style="margin: auto 8px;" class="roomNotice">
                                    <i class="icon" title="公告"></i></div>
                                <div @click="roomInfoFlag = true" style="margin: auto 8px;" class="roomInfo">
                                    <i class="icon" title="关于"></i></div>
                            </div>
                        </div>
                        <div ref="messageList" class="message-list">
                            <div v-for="(item,index) in currentChatData" :key="index" class="message-list-item">
                                <div :class="{ 'message-self': item.from === userInfo.name }" class="native-message">
                                    <img class="avatar-image user-icon" :src="item.avatar" alt="" :data-username="item.from">
                                    <div>
                                        <div>
                                            <span class="message-username">{{ item.from }}</span>
                                            <span>{{ (new Date(item.date).format('hh:mm:ss')) }}</span>
                                        </div>
                                        <template>
                                            <div v-if="item.type === 'code'" ref="codeBlock" class="code"><pre><code>{{ item.message }}</code></pre></div>
                                            <div v-else-if="(item.type === 'express') || (item.message.charAt(0) === '#')" class="text">
                                                <div v-html="expressionProcess(item)"></div>
                                            </div>
                                            <div v-else-if="item.type === 'printscreen'" class="image" ref="preview">
                                                <img :data-original="item.message" :src="item.message" onerror="this.src='/images/imgError.jpg'" style="max-height: 200px;">
                                            </div>
                                            <div v-else v-html="normalSmartProcess(item.message, item.type)">
                                                
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="toolbar">
                            <div @click="expressionFlag = true">
                                <i class="icon" title="表情"></i>
                            </div>
                            <div @click="unfinished">
                                <i class="icon" title="图片"></i>
                            </div>
                            <div @click="codeInputFlag = true">
                                <i class="icon" title="代码"></i>
                            </div>
                            <input type="file" class="image-input" accept="image/png,image/jpeg,image/gif">
                        </div>
                        <div class="input-box">
                            <input v-model="message" @keyup.enter="sendMessage(message,'normal','message')" type="text" placeholder="输入消息" maxlength="1024">
                        </div>
                        <template v-if="!secretPanel">
                            <transition name="silde-rightIn">
                                <panel-room-notice-module v-show="roomNoticeFlag" @close="roomNoticeFlag = false"></panel-room-notice-module>
                            </transition>
                            <transition name="silde-rightIn">
                                <panel-room-info-module v-show="roomInfoFlag" @close="roomInfoFlag = false"></panel-room-info-module>
                            </transition>
                        </template>
                        <transition name="scale">
                            <panel-expression-module 
                                v-show="expressionFlag" 
                                @send="sendMessage" 
                                @close="expressionFlag = false"
                                @unfinished="unfinished"
                                ></panel-expression-module>
                        </transition>
                        <transition name="scale">
                            <div v-show="codeInputFlag" class="code-input">
                                <textarea v-model="code" placeholder="输入要展示的代码"></textarea>
                                <div>
                                    <button @click="sendMessage(code,'code','code')" class="sendCode">发送</button>
                                    <button @click="codeInputFlag = false" class="cancelCode">取消</button></div>
                            </div>
                        </transition>
                        <div class="user-info" style="opacity: 0; transform: scale(0); display: none;">
                            
                        </div>
                    </div>
                </div>
                <transition name="scale">
                    <user-setting-module 
                        v-show="userSettingFlag" 
                        data="" @close="userSettingFlag = false"
                    ></user-setting-module>
                </transition>
                <transition name="scale">
                    <system-setting-module 
                    v-show="systemSettingFlag" 
                    :data="systemConfig" 
                    @close="systemSettingFlag = false"
                    @logout="logout"
                    ></system-setting-module>
                </transition>
            </div>
        </div>
		<div v-show="!chatPanelFlag" class="lyric_content">
            <div class="description"></div>
        </div>
	</div>
</template>

<style scoped lang="scss">
@import '../styles/transition.scss';
.chatroom {
	width: 100%;
    height: 100%;
}
</style>
