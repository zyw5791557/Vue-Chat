<script>
import UserSettingModule from '@/components/UserSettingModule';
import SystemSettingModule from '@/components/SystemSettingModule';
import ChatPanelModule from '@/components/ChatPanelModule';
export default {
    /**@components  - 组件注册
     * UserSettingModule        用户设置
     * SystemSettingModule      系统设置
     * ChatPanelModule          聊天面板
     * 
     * @data        - 状态
     * systemConfig             系统设置配置项
     * userSettingFlag          用户设置窗口状态
     * systemSettingFlag        系统设置窗口状态
     * chatPanelFlag            聊天窗口状态
     * 
     * @computed    - 计算属性
     * mask                     全局蒙版
     * 
     * @methods     - 方法
     * clearPanel               清除所有面板状态
     */
    components: {
        UserSettingModule,
        SystemSettingModule,
        ChatPanelModule
    },
	data() {
		return {
            chatInitConfig: {
                
            },
            systemConfig: {
                SOURCE_CODE: 'https://github.com/zyw5791557/EmliceChat',
                WEB_SITE: 'https://www.emlice.top'
            },
            userSettingFlag: false,
            systemSettingFlag: false,
            chatPanelFlag: true
		}
    },
    computed: {
        mask () {
            if(this.userSettingFlag || this.systemSettingFlag) {
                return true;
            }else {
                return false;
            }
        }  
    },
	methods: {
        clearPanel () {
            this.userSettingFlag = false;
            this.systemSettingFlag = false;
        }
	},
	mounted() {
		
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
                        <div @click="$message({ message: '暂未开放',showClose: true })" class="nav-list-item " title="联系人">
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
                        <div @click="chatPanelFlag = false" class="user-list-item" data-user="all">
                            <img class="avatar-image" src="/static/images/sleep.gif" alt="">
                            <div class="unread">0</div>
                            <div class="content">
                                <div>
                                    <p></p>
                                    <p></p>
                                </div>
                                <div>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="chatPanelFlag" class="empty-chat-panel" chat-type="empty"></div>
                    <chat-panel-module v-else></chat-panel-module>
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
.chatroom {
	width: 100%;
    height: 100%;
}
.scale-enter-active, .scale-leave-active {
  transition: all .3s
}
.scale-enter, .scale-leave-to /* .scale-leave-active in below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0);
}
</style>
