<template>
  <div class="container">
    <section class="register-box">
      <h2><i class="far fa-id-card"></i> Registration</h2>
      <form action="" v-on:submit.prevent="onRegister()">
        <input
          v-model="name"
          class="form-control mb-2"
          type="text"
          placeholder="name"
        />
        <input
          v-model="email"
          class="form-control mb-2"
          type="text"
          placeholder="email"
        />
        <input
          v-model="password"
          class="form-control mb-2"
          type="password"
          placeholder="password"
        />
        <select v-model="access" class="select-access mb-5">
          <option value="">Access</option>
          <option :value="0">Admin</option>
          <option :value="1">Cashier</option>
        </select>
        <button type="submit" class="btn btn-info mb-2">
          <i class="fas fa-clipboard-list"></i> Submit
        </button>
      </form>
      <button class="btn btn-danger mb-2" @click="btnCancel()">
        <i class="far fa-hand-point-left"></i> Cancel
      </button>
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
      name: '',
      email: '',
      password: '',
      access: ''
    }
  },
  methods: {
    ...mapActions({
      actionLoginUser: 'registration/actionLogin'
    }),
    onRegister () {
      const dataRegister = {
        name: this.name,
        email: this.email,
        pass: this.password,
        access: this.access
      }
      // console.log(dataRegister)
      // validasi form
      if (!dataRegister.name || !dataRegister.email || !dataRegister.pass) {
        // aler modif from mixin
        this.alertModif('top', 'error', 'Oops Wrong!, Please complete this data!')
      } else {
        this.actionLoginUser(dataRegister).then((response) => {
          // statement message
          if (response === 'Email registered!') {
            // aler modif from mixin
            this.alertModif('top', 'warning', 'Email registered!')
          } else {
            // aler modif from mixin
            this.alertModif('top', 'success', 'Registration Success')
            this.$router.push('/login') // goto home
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    btnCancel () {
      this.$router.push('/login')
    }
  }
}
</script>
