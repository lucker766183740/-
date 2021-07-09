<template>
  <div class="aui-wrapper aui-page--login">
    <div class="aui-content__wrapper">
      <div class="aui-content">
        <div class="logo1">
          <!-- <img src="~@/assets/img/logo1.png" alt="" srcset=""> -->
          <img src="~@/assets/img/logo.png" alt="" srcset="">
          <!--<img src="~@/assets/img/login-log.png" alt="" srcset="">-->
          <div class="title-div">
            <div class="title-left">
              <span style="font-size:36px;">“审讯名师堂”云端教研室平台</span>
              <!--<span style="font-size:36px;">智慧实验室管理平台</span>-->
            </div>

          </div>
        </div>
        <div class="login-main">
          <h3 class="login-title">云端教研室平台</h3>
         <!-- <h5 class="login_sm_title"></h5> -->
          <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            @keyup.enter.native="dataFormSubmit()"
            status-icon
          >
            <el-form-item prop="userName">
              <el-input v-model="dataForm.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="dataForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-input v-model="dataForm.captcha" placeholder="验证码"></el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <img :src="captchaPath" @click="getCaptcha()" alt />
                </el-col>
              </el-row>
            </el-form-item>
           <!-- <el-form-item label="身份选择">
                <el-radio-group v-model="dataForm.type">
                  <el-radio  :label="2">学生</el-radio>
                  <el-radio  :label="1">系统用户</el-radio>
                </el-radio-group>
              </el-form-item>
            <el-form-item> -->
              <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
          </el-form>
        </div>
        <div class="bot_text">
<!--          <p class="xahr">版权所有:西安鸿仁汇智软件有限公司</p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUUID } from '@/utils'
  export default {
    data () {
      return {
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        },
        captchaPath: ''
      }
    },
    created () {
      this.getCaptcha()
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': this.dataForm.userName,
                'password': this.dataForm.password,
                'uuid': this.dataForm.uuid,
                'captcha': this.dataForm.captcha
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$cookie.set('token', data.token)
                this.$router.replace({ name: 'home' })
              } else {
                this.getCaptcha()
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 获取验证码
      getCaptcha () {
        this.dataForm.uuid = getUUID()
        this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
      }
    }
  }
</script>

<style lang="scss">
.aui-wrapper.aui-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;

  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(~@/assets/img/login_bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .aui-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }

  .aui-content {
    min-height: 100%;
    // padding: 30px 500px 30px 30px;
  }

  .logo {
    // position: absolute;
    top: 30px;
    left: 80px;

    > img {
      height: 70px;
    }
  }

  .login-main {
    // position: absolute;
    top: 50%;
    right: 50%;
    width: 850px;
    // margin-right: -425px;
    margin:auto;
    margin-top: 3%;
    background-image: url(~@/assets/img/login_useBg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-left: 425px;
    padding-top: 60px;
    padding-bottom: 60px;
    padding-right: 123px;

  }


  .login-title {
    font-size: 32px;
    color: #2bbcf6;
    text-align: center;
    margin-bottom: 40px;
  }

  .login_sm_title {
    font-size: 14px;
    color: #909090;
    text-align: center;
    font-weight: normal;
    margin-top: 10px;
  }

  .login-captcha {
    overflow: hidden;

    > img {
      width: 100%;
      cursor: pointer;
    }
  }

  .login-btn-submit {
    width: 100%;
    margin-top: 5px;
    background-color: #2bbcf6;
    border-color: #2bbcf6;
    border-radius: 18px;
  }

  .bot_text {
    position: absolute;
    bottom: 10px;
    min-width: 100%;

    > p {
      text-align: center;
      font-size: 14px;
      color: #909090;
    }
  }

  .el-input__inner {
    border: none;
    background-color: #f4f8f7;
  }

  .logo1 {
    display: flex;
    flex-direction: row;
    // position: absolute;
    margin-top: 50px;
    margin-left: 100px;
    top: 50px;
    left: 100px;
    font-size: 37px;
    font-family: "微软雅黑";
    font-weight: 600;
    color: #3f3f3f;
    > img {
      width: 100px;
      height: 100px;
    }
  }

}
.title-div{
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: flex-start;



  .title-left{
    display: flex;
    flex-direction: column;
    font-size: 30px;
    color: #777;
    margin-left: 10px;
    text-shadow: 3px 5px 4px  #fff;
    // align-items: center;
    >span:last-child{
      font-size: 36px;
      margin-top: 3px;
    }
  }

}

</style>
