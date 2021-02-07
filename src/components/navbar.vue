<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid justify-content-center">
      <div v-if="status === true">
        <button @click="hideBar()" class="btn btn-light">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div v-else>
        <button @click="showBar()" class="btn btn-light">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
    <div class="container justify-content-start">
      <span class="nav-link">{{ Statetitle }}</span>
    </div>
    <div class="container justify-content-center">
      <div v-if="sts === true">
        <button
          class="btn btn-light search"
          id="search-btn"
          type="button"
          @click="btnSearchSort()"
        >
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div v-else>
        <button
          class="btn btn-light search"
          id="search-btn"
          type="button"
          @click="unBtnSearchSort()"
        >
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
    <div class="container justify-content-end">
      <div v-if="state === true">
        <button
          @click="hideRIGHT()"
          class="btn btn-light cart"
          id="cart-btn"
          type="button"
        >
          <p>cart</p>
        </button>
      </div>
      <div v-else>
        <button
          @click="showRIGHT()"
          class="btn btn-light cart"
          id="cart-btn"
          type="button"
        >
          <p>cart</p>
        </button>
      </div>
      <span class="index-item" id="index-item">0</span>
      <div class="mt-1">
        <button @click="onLogout()" class="btn btn-outline-info bt-logout">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import getMixins from '../helpers/mixin'
export default {
  mixins: [getMixins],
  data () {
    return {
      status: true,
      state: true,
      sts: true
    }
  },
  computed: {
    ...mapState({
      Statetitle: (state) => state.title
    }),
    ...mapGetters({
      getListTitle: 'products/getListTitle'
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/actionLogout',
      getStsBtn: 'products/getStsBtn'
    }),
    onLogout () {
      this.logout().then((response) => {
        if (response) {
          // aler modif from mixin
          this.alertModif('top', 'info', 'Logout Success')
          this.$router.push('/login')
        }
      })
    },
    hideBar: function () {
      document.getElementById('side-left').classList.add('active')
      document.getElementById('main').classList.add('setting')
      this.status = false
      this.getStsBtn(this.status)
    },
    showBar: function () {
      document.getElementById('side-left').classList.remove('active')
      document.getElementById('main').classList.remove('setting')
      this.status = true
      this.getStsBtn(this.status)
    },
    hideRIGHT () {
      document.getElementById('side-right').classList.add('active')
      this.state = false
    },
    showRIGHT () {
      document.getElementById('side-right').classList.remove('active')
      this.state = true
    },
    btnSearchSort () {
      this.sts = false
      // alert('false')
      document.getElementById('box-search').classList.add('hiden')
      document.getElementById('box-sort').classList.add('hide')
    },
    unBtnSearchSort () {
      this.sts = true
      document.getElementById('box-search').classList.remove('hiden')
      document.getElementById('box-sort').classList.remove('hide')
    }
  }
}
</script>
