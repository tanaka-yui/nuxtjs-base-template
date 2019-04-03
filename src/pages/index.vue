<template>
  <section class="login">
    <h1 class="loginLogo">
      Nuxt.js Template
    </h1>
    <div v-if="error" class="el-alert el-alert--error">
      <span class="el-alert__content">{{ error }}</span>
    </div>
    <el-form ref="form" :model="form" width="120px">
      <el-form-item>
        <el-input v-model="form.id" placeholder="ユーザーID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          placeholder="パスワード"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="loginButton" type="text" @click="onSubmit">
          Login
        </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<style scoped>
.el-alert {
  margin: 0 auto 2rem;
  width: 300px;
}

.el-form {
  width: 300px;
  margin: 0 auto;
}
.el-form-item {
  text-align: left;
}

.loginLogo {
  width: 500px;
  margin: 2rem auto;
  font-size: 3rem;
}

.loginButton {
  box-shadow: 0 0 0 3px #000, 0 0 0 6px #fff;
  border-radius: 16px;
  background-color: #fff;
  margin: 0 auto;
  padding: 8px;
  width: 200px;
  color: #000;
  font-weight: bold;
  display: block;
  text-decoration: none;
  font-size: 18px;
}

.loginButton:hover {
  text-decoration: underline;
  opacity: 0.7;
}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import VueRouter from 'vue-router/types'

import { NuxtAxiosInstance, Data } from '~/types/vue'
import { AuthApiUrl } from '~/server/api/routes/url'

interface LoginForm {
  id: string
  password: string
}

interface DataTypes {
  form: LoginForm
  error?: string
}

@Component({})
export default class Login extends Vue {
  readonly $axios!: NuxtAxiosInstance

  readonly $data: Data<DataTypes>

  readonly $router!: VueRouter

  public data(): DataTypes {
    return {
      form: {
        id: 'user', // デバッグのため入れておく
        password: 'password' // デバッグのため入れておく
      },
      error: ''
    }
  }

  public async onSubmit() {
    try {
      await this.$axios.post(AuthApiUrl.LOGIN, {
        id: this.$data.form.id,
        password: this.$data.form.password
      })
      window.location.href = '/home'
    } catch (e) {
      this.$set(this.$data, 'error', 'ログインに失敗しました')
    }
  }
}
</script>
