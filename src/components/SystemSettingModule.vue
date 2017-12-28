<script>
export default {
    name: 'SystemSettingModule',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            loadData: this.data
        }
    }
}
</script>

<template>
    <!-- 系统设置 -->
    <div class="system-setting">
        <div>
            <span>系统设置</span>
            <i @click="$emit('close')" class="icon"></i>
        </div>
        <div>
            <div class="switch">
                <span>启用桌面通知</span>
                <div class="switchBtn on"></div>
            </div>
            <div class="switch">
                <span>启用声音通知</span>
                <div class="switchBtn on"></div>
            </div>
            <a :href="loadData.SOURCE_CODE" class="button">
                <i class="icon"></i>
                <span>源码</span>
            </a>
            <a :href="loadData.WEB_SITE" class="button">
                <i class="icon"></i>
                <span>作者</span>
            </a>
            <a @click="$emit('logout')" class="button" id="logoutBtn">
                <i class="icon"></i>
                <span>登出</span>
            </a>
            <a class="button" id="clearData">
                <span>数据清理</span>
            </a>
        </div>
    </div>
</template>

