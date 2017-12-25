<script>
export default {
    data () {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.getApi('login','post',{
                name: this.form.username,
                pwd: this.form.password
            }).then(res => {
                const c = res.data.Code;
                if (c === 0) {
                    // 登录成功
                    localStorage.setItem('UserInfo', JSON.stringify(res.data.Data));
                    localStorage.setItem('Duration', h);
                    this.$router.push({ name: 'Chatroom' });
                } else if (c === -1) {
                    // 账号或密码错误!
                    this.$message.error('账号或密码错误!');
                }
            }).catch(err => {
                this.$message.error('登录失败, 请检查网络连接是否正常。');
            });
        },
        register() {
            this.$router.push({ name: 'Register' });
        }
    }
}
</script>

<template>
    <div class="window">
        <div class="background"></div>
        <div class="login">
            <div>
                <div>
                    <img class="avatar-image" src="../assets/images/user.jpg" style="width: 100px; height: 100px; min-width: 100px; min-height: 100px;">
                </div>
                <div>
                    <span style="position: relative; top: -4px;">滴滴,学生卡~</span>
                    <div class="input normal">
                        <div>
                            <i class="icon"> </i>
                        </div>
                        <input v-model="form.username" id="name" type="text" placeholder="用户名">
                    </div>
                    <div class="input normal">
                        <div>
                            <i class="icon"> </i>
                        </div>
                        <input v-model="form.password" id="pwd" type="password" placeholder="密码">
                    </div>
                    <div>
                        <span @click="register">注册</span>
                        <button @click="login">登录</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
