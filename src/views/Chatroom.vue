<script>
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
     * sendMessage              发送消息
     * takeMessage              调取离线消息
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
            this.takeMessage(item.userID);
            const { name, avatar } = item;
            this.currentChatUserInfo.name = name;
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
        sendMessage () {

        },
        takeMessage(o) {
            socket.emit('take messages', { 
                from: '我是你毛爷爷',
                take: 'all'
             });
        }
	},
	mounted() {
        // 接受历史记录
        socket.on('user join', function (data) {
            console.log('人：', data);
        });
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
                        <div @click="userSettingFlag = true" class="avatar-text" title="查看个人信息"></div>
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
                        <div class="message-list">
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
                            <input @keyup.enter="sendMessage" type="text" placeholder="输入消息" maxlength="1024">
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
                            <panel-expression-module v-show="expressionFlag"></panel-expression-module>
                        </transition>
                        <transition name="scale">
                            <div v-show="codeInputFlag" class="code-input">
                                <textarea placeholder="输入要展示的代码"></textarea>
                                <div>
                                    <button class="sendCode">发送</button>
                                    <button @click="codeInputFlag = false" class="cancelCode">取消</button></div>
                            </div>
                        </transition>
                        <div class="user-info" style="opacity: 0; transform: scale(0); display: none;">
                            
                        </div>
                    </div>
                </div>
                <transition name="scale">
                    <user-setting-module v-show="userSettingFlag" data="" @close="userSettingFlag = false"></user-setting-module>
                </transition>
                <transition name="scale">
                    <system-setting-module v-show="systemSettingFlag" :data="systemConfig" @close="systemSettingFlag = false"></system-setting-module>
                </transition>
            </div>
        </div>
        <div class="lyric_content">
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
