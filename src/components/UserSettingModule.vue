<script>
export default {
    name: 'UserSettingModule',
    data () {
        return {

        }
    }
}
</script>

<template>
    <!-- 用户设置 -->
    <div class="user-setting">
        <div>
            <i @click="$emit('close')" class="icon"></i>
            <div class="background-image" style="background-image: url(&quot;https://cdn.suisuijiang.com/user_59b5e4563a453b067878c989_1505119796105.jpeg?imageView2/2/h/300/w/300/format/jpg&quot;);"></div>
            <div class="background-mask"></div>
            <div class="content">
                <img class="avatar-image" src="https://cdn.suisuijiang.com/user_59b5e4563a453b067878c989_1505119796105.jpeg?imageView2/2/w/80/h/80"
                    style="width: 80px; height: 80px; min-width: 80px; min-height: 80px;">
                <span>Emlice</span>
                <div class="icon-list">
                </div>
                <input type="file" accept="image/jpg,image/jpeg,image/png,image/gif">
            </div>
        </div>
        <div class="normal-status">
            <div>
                <div>
                    <div>
                        <span>性别:</span>
                        <span>年龄:</span>
                        <span>时长:</span>
                        <span>位置:</span>
                    </div>
                    <div>
                        <span>男</span>
                        <span>1</span>
                        <span>32天</span>
                        <span>火星</span>
                    </div>
                </div>
            </div>
            <div>
                <button>编辑</button>
            </div>
        </div>
    </div>
</template>