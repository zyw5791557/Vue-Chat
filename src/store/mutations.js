import * as types from './mutation-types';

/**
 * @mutations
 * UPDATE_CONNECTSTATE          更新连接状态
 * UPDATE_USERINFO              更新登录用户信息
 * UPDATE_TOURISTINFO           更新游客信息
 * UPDATE_GLOBALMASK            更新全局蒙版
 * UPDATE_LYRICSTATE            更新歌词状态
 * UPDATE_USERSETTINGSTATE      更新用户设置状态
 * UPDATE_SYSTEMSETTINGSTATE    更新系统设置状态
 * UPDATE_USERPANELSTATE        更新用户面板状态
 * UPDATE_ROOMNOTICESTATE       更新聊天室消息窗口状态
 * UPDATE_ROOMINFOSTATE         更新聊天室信息窗口状态
 * UPDATE_EXPRESSIONSTATE       更新表情界面状态
 * UPDATE_CODEINPUTSTATE        更新代码输入窗口状态
 * UPDATE_CONTACTSPANELSTATE    更新联系人面板状态
 * DELETE_DB_MESSAGE            删除数据库消息    
 * 
 * UPDATE_ONLINEUSERS           更新在线用户数   
 * UPDATE_MYUSERLISTARR         更新我的当前聊天用户列表     
 * UPDATE_CURRENTCHATDATA       更新当前聊天面板数据  
 * UPDATE_USERLIST              更新用户列表
 * UPDATE_CURRENTCHATUSERINFO   更新当前聊天用户信息
 * UPDATE_LOADING               更新数据加载状态
 * CLEAR_HISTORY                清空用户历史数据
 * 
 * UPDATE_LATEST_MESSAGE        更新收到的最新消息
 * UPDATE_TYPINGSTATE           更新打字状态
 * UPDATE_SEARCHUSERRES         查询用户结果
 * UPDATE_MYCONTACTSLIST        更新我的联系人列表
 * 
 * @function - 函数
 * CHECK_GLOBALMASK						检查全局蒙版状态
 */

function CHECK_GLOBALMASK($state) {
	if (
		$state.userSettingState ||
		$state.systemSettingState ||
		$state.userPanelState ||
		$state.roomNoticeState ||
		$state.roomInfoState ||
		$state.expressionState ||
		$state.codeInputState
	) {
		$state.globalMask = true;
	} else {
		$state.globalMask = false;
	}
}


const mutations = {

	[types.UPDATE_CONNECTSTATE](state, boolean) {
		state.connectState = boolean;
	},

	[types.UPDATE_USERINFO](state, data) {
		state.userInfo = data;
	},

	[types.UPDATE_TOURISTINFO](state, data) {
		state.touristInfo = data;
	},

	[types.UPDATE_GLOBALMASK](state, boolean) {
		if (!boolean) {
			state.userSettingState = false;
			state.systemSettingState = false;
			state.userPanelState = false;
			state.roomNoticeState = false;
			state.roomInfoState = false;
			state.expressionState = false;
			state.codeInputState = false;
		}
		state.globalMask = boolean;
	},

	[types.UPDATE_USERSETTINGSTATE](state, boolean) {
		state.userSettingState = boolean;
		CHECK_GLOBALMASK(state);

	},

	[types.UPDATE_SYSTEMSETTINGSTATE](state, boolean) {
		state.systemSettingState = boolean;
		CHECK_GLOBALMASK(state);
	},

	[types.UPDATE_USERPANELSTATE](state, boolean) {
		state.userPanelState = boolean;
		CHECK_GLOBALMASK(state);
	},

	[types.UPDATE_ROOMNOTICESTATE](state, boolean) {
		state.roomNoticeState = boolean;
		CHECK_GLOBALMASK(state);
	},

	[types.UPDATE_ROOMINFOSTATE](state, boolean) {
		state.roomInfoState = boolean;
		CHECK_GLOBALMASK(state);
	},

	[types.UPDATE_EXPRESSIONSTATE](state, boolean) {
		state.expressionState = boolean;
		CHECK_GLOBALMASK(state);
	},

	[types.UPDATE_CODEINPUTSTATE](state, boolean) {
		state.codeInputState = boolean;
		CHECK_GLOBALMASK(state);
	},

	[types.UPDATE_LYRICSTATE](state, boolean) {
		state.lyricState = boolean;
	},

	[types.UPDATE_CONTACTSPANELSTATE](state) {
		state.contactsPanelState = !state.contactsPanelState;
	},

	[types.DELETE_DB_MESSAGE](state, boolean) {
		state.systemConfig.clearDataLock = boolean;
	},

	// Chat

	[types.UPDATE_ONLINEUSERS](state, data) {
		state.onlineUsers = data;
	},

	[types.UPDATE_MYUSERLISTARR](state, obj) {
		console.log(obj)
		if (obj.addRead) {
			state.myUserListArr[obj.userID].noRead++;
			return;
		}
		if(!obj.userID) {
			this._vm.$set(state.myUserListArr, obj.key, obj.value);
		} else {
			state.myUserListArr[obj.userID].noRead = 0;
		}
	},

	[types.UPDATE_CURRENTCHATDATA](state, obj) {
		if(!obj.concat) {
			state.currentChatData = obj.data;
		} else {
			state.currentChatData = state.currentChatData.concat(obj.data);
		}
	},

	[types.UPDATE_USERLIST](state, o) {
		state.userList.push(o);
	},

	[types.CLEAR_HISTORY](state) {
		state.myUserListArr = {
			all: {
				noRead: 0
			},
		}
		state.userList = [
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
		];
		state.currentChatUserInfo.name = '';
		state.currentChatUserInfo.userID = '';
		state.currentChatUserInfo.avatar = '';
	},

	[types.UPDATE_CURRENTCHATUSERINFO](state, item) {
		state.currentChatUserInfo.name = item.name;
		state.currentChatUserInfo.userID = item.userID;
		state.currentChatUserInfo.avatar = item.avatar;
	},

	[types.UPDATE_LATEST_MESSAGE](state, obj) {
		state.latestMessage = obj;
	},

	[types.UPDATE_LOADING](state, boolean) {
		state.loading = boolean;
	},

	[types.UPDATE_TYPINGSTATE](state, boolean) {
		state.typingState = boolean;
	},

	[types.UPDATE_SEARCHUSERRES](state, data) {
		state.searchUserRes = data;
	},

	[types.UPDATE_MYCONTACTSLIST](state, data) {
		state.myContactsList = data;
	}

};


export default mutations;

