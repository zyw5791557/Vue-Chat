<script>
export default {
    name: 'PanelRoomInfoModule',
    data () {
        return {

        }
    }
}
</script>

<template>
    <div class="float-panel roomInfoPanel">
        <div>
            <span>群设置</span>
            <i @click="$emit('close')" class="icon close"></i></div>
        <div class="group-info">
            <div class="content">
                <span>管理员：</span>
                <span>无</span></div>
            <div class="content">
                <span>在线人数：</span>
                <span class="onlineUsers">人</span>
            </div>
            <div class="userList">
                
            </div>
            <input type="file" accept="image/*"></div>
        <div class="group-info-exit">
            <button>退出群组</button></div>
    </div>
</template>
