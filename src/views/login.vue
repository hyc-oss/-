<template>
    <div class="loginContent">
        <div class="loginWrap">
            <div class="type">登录</div>
            <div class="tips">欢迎使用东软车主软件App</div>
        </div>
        <div class="formWrap">
            <div class="formItem">
                <div class="itemTitle">手机号码</div>
                <div class="inputBox">
                    <van-field
                        v-model="form.username"
                        name="phone"
                        type="number"
                        input-align="left"
                        placeholder="+ 86 | 请输入手机号"
                    />
                </div>
            </div>
            <div class="formItem">
                <div class="itemTitle">密码</div>
                <div class="inputBox">
                    <van-field
                        v-model="form.password"
                        name="password"
                        type="password"
                        input-align="left"
                        placeholder="请输入"
                    />
                </div>
            </div>
            <div class="loginBtn">
                <van-button :disabled="btnDisable" :class="btnDisable?'':'allowClick'" round type="info" @click="loginSubmit">登录</van-button>
            </div>
            <div class="protocal">
                <van-checkbox v-model="checked" @change="checkboxChange">
                    <span class="tips">我已阅读并同意<span class="link">《用户隐私政策》</span></span>
                </van-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
import {userLogin,userInfo} from '@/api/user'
export default {
    name: 'login',
    data(){
        return {
            form: {
                username: '15666666666',
                password: '123456'
            },
            btnDisable: false,
            checked: true
        }
    },
    created() {
        this.checkLogin()
    },
    methods: {
        checkLogin() {
            if(window.localStorage.getItem('hasLogin')) {
                this.$router.push({path: '/home'})
            }
        },
        loginSubmit() {//登录方法
            if(this.form.username.length==0){
                this.$toast.fail('请输入手机号！');
            } else if(!this.verifyPhone(this.form.username)) {
                this.$toast.fail('请输入正确手机号！');
            } else if(this.form.password.length==0){
                this.$toast.fail('请输入密码！');
            } else{
                userLogin(this.form).then(res => {
                    if(res.code == 200) {
                        window.localStorage.setItem('token',res.token);

                        this.getUserInfo();
                    } else {
                        this.$toast.fail(res.msg)
                    }
                })
            }
        },
        getUserInfo() {
            userInfo().then(res => {
                if(res.code == 200) {
                    if(res.cars.length>0) {
                        console.log('login: '+res.cars[0].carId)
                        this.$store.commit('setCarId',res.cars[0].carId);
                        window.localStorage.setItem('carInfo',JSON.stringify(res.cars[0]));
                        window.localStorage.setItem('hasLogin',true);
                    
                        window.localStorage.setItem('userInfo',JSON.stringify(res.user));
                        this.$router.push('/home')
                    } else {
                        window.localStorage.clear();
                        this.$dialog.confirm({
                            title: '系统提示',
                            message: '该账号暂无车辆，请先绑定车辆！',
                            showCancelButton: false,
                            confirmButtonText: '确定'
                        }).then(() => {
                            // on confirm
                        }).catch(() => {
                            // on cancel
                        });
                    }
                }
            })
        },
        verifyPhone(val) {
            let pattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            return pattern.test(val);
        },
        // 勾选版权协议
        checkboxChange(e) {
            this.btnDisable = !this.btnDisable;
        }
    }
}
</script>

<style scoped lang="scss">
    .loginContent{
        background: linear-gradient(180deg, #C1DCF6, #FFFFFF);
    }
    .loginWrap{
        box-sizing: border-box;
        padding: 0 20px;
        text-align: left;
        overflow: hidden;
        background: url('../assets/loginBg.png') no-repeat;
        background-size: 100%;
        padding-bottom: 30px;
        mix-blend-mode: darken;
        position: relative;

        &::after{
            content: '';
            width: 100%;
            height: 30px;
            background-color: rgba(255,255,255,0.5);
            position: absolute;
            left: 0;
            bottom: 0;
            border-bottom: 2px #c3c3c3 dashed;
            z-index: -1;
        }

        .type {
            font-size: 24px;
            font-weight: 600;
            margin-top: 100px;
            margin-bottom: 10px;
            color: #333;
        }
        .tips {
            font-size: 14px;
            color: #535353;
        }
    }
    .formWrap{
        box-sizing: border-box;
        padding: 0 20px 20px 20px;
        text-align: left;
        .tips {
            font-size: 14px;
            color: #535353;
        }
        .link {
            color: #3E6DF2;
        }
        .formItem{
            margin-top: 30px;
            .itemTitle{
                font-size: 16px;
                color: #666;
            }
            .van-cell{
                background: no-repeat;
            }

            .inputBox{
                border-radius: 22px;
                border: 2px solid #A9ADB2;
                margin-top: 15px;
            }
        }
        .van-flex{
            display: flex;
            justify-content: center;
            align-items: center;

            &.forgetbox{
                justify-content: flex-end;
                padding-top: 20px;
            }

            .forget{
                font-size: 14px;
                color: #888;
            }
        }

        .protocal{
            width: 100%;
            display: flex;
            justify-content: center;
            position: fixed;
            left: 0;
            bottom: 40px;
        }

        .loginBtn{
            margin-top: 80px;
            button{
                width: 100%;
                &.allowClick{
                    background: linear-gradient(90deg, #2757ED 2%, #729FFF 100%);
                }
            }
        }

        .regBox{
            margin-top: 20px;
            font-size: 14px;
        }
        .codeReg{
            font-weight: 600;
            color: #333;
        }
    }
</style>