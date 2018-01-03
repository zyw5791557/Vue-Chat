<script>
export default {
    name: 'UserSettingModule',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            loadData: {},
            editFlag: true
        }
    },
    watch: {
          data (val) {
              this.loadData = val;
          }
    },
    computed: {
        selectSex: {
            get () {
                if(this.loadData.Data) {
                   return this.loadData.Data.sex === 'male' ? '男' : '女'; 
                }
            },
            set (newVal) {
                if(newVal[0] === '男' && this.loadData.Data) {
                    this.loadData.Data.sex = 'male';
                }else {
                    this.loadData.Data.sex = 'female';
                }
            }
        }  
    },
    filters: {
        sexFilter (val) {
            return val === 'male' ? '男' : '女';
        },
        birthdayFilter (val) {
            return (new Date().getFullYear() - new Date(val).getFullYear()) <= 0 ? 1 : (new Date().getFullYear() - new Date(val).getFullYear());
        },
        placeFilter (val) {
            return val === '' ? '火星' : val;
        }
    },
    methods: {
        edit () {
            this.editFlag = false;
        },
        postEdit () {
            const userData = {
                name: this.loadData.Data.name,
                sex: this.loadData.Data.sex,
                birthday: this.loadData.Data.birthday,
                place: this.loadData.Data.place,
                website: this.loadData.Data.website,
                github: this.loadData.Data.github,
                qq: this.loadData.Data.qq
            }
            this.getApi('userInfoEdit',{
                method: 'post',
                data: userData
            }).then(res => {
                const Code = res.data.Code;
                const Str = res.data.Str;
                if (Code === -1) {
                    this.$notify.error({
                        title: '错误',
                        message: Str
                    });
                    setTimeout(() => {
                        this.$router.push({ name: Login });
                    }, 2000);
                } else if (Code === 0) {
                    // 成功
                    this.$notify({
                        title: '成功',
                        message: Str,
                        type: 'success'
                    });
                    var localData = JSON.parse(localStorage.getItem('UserInfo'));
                    for (var i in res.data.Data) {
                        localData[i] = res.data.Data[i];
                    }
                    localStorage.setItem('UserInfo', JSON.stringify(localData));
                    this.editFlag = true;
                }
            });
        }
    }
}
</script>

<template>
    <!-- 用户设置 -->
    <div class="user-setting" v-if="loadData.Data">
        <div>
            <i @click="$emit('close')" class="icon"></i>
            <div class="background-image" :style="`background-image: url(${loadData.Data.avatar});`"></div>
            <div class="background-mask"></div>
            <div class="content">
                <img class="avatar-image" :src="loadData.Data.avatar"
                    style="width: 80px; height: 80px; min-width: 80px; min-height: 80px;">
                <span>Emlice</span>
                <div class="icon-list">
                    <a class="icon" title="github" v-if="loadData.Data.github" :href="`//${loadData.Data.github}`" rel="noopener noreferrer" target="_blank"></a>
                    <a class="icon" title="website" v-if="loadData.Data.website" :href="`//${loadData.Data.website}`" rel="noopener noreferrer" target="_blank" style="position: relative; top: 3px;"></a>
                    <a class="icon" title="qq" v-if="loadData.Data.qq" :href="`tencent://message/?uin=${loadData.Data.qq}`" rel="noopener noreferrer" target="_blank"></a>
                </div>
                <input type="file" accept="image/jpg,image/jpeg,image/png,image/gif">
            </div>
        </div>
        <div v-if="editFlag" class="normal-status">
            <div>
                <div>
                    <div>
                        <span>性别:</span>
                        <span>年龄:</span>
                        <span>时长:</span>
                        <span>位置:</span>
                    </div>
                    <div>
                        <span>{{ loadData.Data.sex | sexFilter }}</span>
                        <span>{{ loadData.Data.birthday | birthdayFilter }}</span>
                        <span>{{ loadData.duration }}天</span>
                        <span>{{ loadData.Data.place | placeFilter }}</span>
                    </div>
                </div>
            </div>
            <div>
                <button @click="edit">编辑</button>
            </div>
        </div>
        <div v-else class="edit-status">
            <div>
                <div>
                    <div>
                        <span>性别:</span>
                        <span>出生日期:</span>
                        <span>位置:</span>
                        <span>个人网站:</span>
                        <span>github:</span>
                        <span>qq:</span>
                    </div>
                    <div id="personInfoBox">
                        <select v-model="selectSex">    
                            <option>男</option>
                            <option>女</option>
                        </select>
                        <input class="birthday" type="date" v-model="loadData.Data.birthday">
                        <input class="place" type="text" v-model="loadData.Data.place">
                        <input class="website" type="url" placeholder="不用写传输协议头" v-model="loadData.Data.website">
                        <input class="github" type="url" placeholder="不用写传输协议头" v-model="loadData.Data.github">
                        <input class="qq" type="text" v-model="loadData.Data.qq">
                    </div>
                </div>
            </div>
            <div>
                <button @click="postEdit">确定</button>
            </div>
        </div>
    </div>
</template>