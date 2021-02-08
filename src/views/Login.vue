<template>
  <div class="container">
    <section class="login-box">
      <h2><i class="fas fa-user-friends"></i> Form Login</h2>
      <form action="" v-on:submit.prevent="onLogin()">
        <input
          v-model="email"
          class="form-control mb-2"
          type="text"
          placeholder="Email"
        />
        <input
          v-model="password"
          class="form-control mb-2"
          type="password"
          placeholder="Password"
        />
        <button type="submit" class="btn btn-success mb-2">
          <i class="fas fa-sign-in-alt"></i> Login
        </button>
      </form>
      <button class="btn btn-info mb-4" @click="btnRegister()">
        <i class="far fa-address-card"></i> Register
      </button>
      <a
        v-custlink="{ color: '#555', decoration: 'none' }"
        :href="`${linkgitHub}`"
        >&copy; Lamban Coffee 2021</a
      >
    </section>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import getMixins from '../helpers/mixin'
export default {
  mixins: [getMixins],
  data () {
    return {
      email: '',
      password: ''
    }
  },
  directives: {
    custlink: (el, binding) => {
      el.style = `
      color: ${binding.value.color};
      text-decoration: ${binding.value.decoration};
      `
    }
  },
  methods: {
    ...mapActions({
      actionLoginUsers: 'auth/actionLogin',
      getStsBtn: 'products/getStsBtn'
    }),
    onLogin () {
      const data = {
        email: this.email,
        pass: this.password
      }
      // validasi
      if (!data.email || !data.pass) {
        // aler modif from mixin
        this.alertModif('top', 'error', 'Please enter your email or password!')
      } else {
        this.actionLoginUsers(data).then((response) => {
          // statement message
          if (response === 'Email not found!') {
            // aler modif from mixin
            this.alertModif('top', 'warning', 'Email not found!')
          } else if (response === 'Login failed, password wrong!') {
            // aler modif from mixin
            this.alertModif('top', 'warning', 'Login failed, password wrong!')
          } else {
            // aler modif from mixin
            this.alertModif('top-end', 'success', response)
            this.$router.push('/') // goto home
            // set status menu
            const sts = true
            this.getStsBtn(sts)
          }
        }).catch((error) => {
          console.log(error.message)
          // aler modif from mixin
          this.alertModif('top', 'error', error)
        })
      }
    },
    btnRegister () {
      this.$router.push('/register')
    }
  }
}
</script>
<style src='../assets/css/styles.css'></style>
