<template>
  <div class="container-bars">
    <asideLeft />
    <contenHome v-on:thisEmit="actionADD" />
    <div v-if="statusCart">
      <aside class="right" id="side-right">
        <div class="containter-cart">
          <div v-for="(item, idx) in dataCART" :key="idx">
            <div class="row">
              <div class="col-4 mt-2">
                <img
                  :src="`${serverUrl}/image/${item.image}`"
                  :alt="item.name"
                  id="img-cart"
                />
              </div>
              <div class="col-4">
                <h3 class="title-cart">{{ item.name }}</h3>
                <button
                  @click="btnDecrement(item.id)"
                  class="btn btn-outline-success btn-min"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <span class="cart-items">x{{ item.qty }}</span>
                <button
                  @click="btnIncrement(item.id)"
                  class="btn btn-outline-success btn-plus"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-4">
                <button
                  @click="deleteITEM(item.id)"
                  class="btn btn-outline-danger"
                  id="deleteCart"
                >
                  <i class="fas fa-times"></i>
                </button>
                <span class="total-items">{{ convertRP(item.subtotal) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row" id="line-cart">
          <div class="col-6">
            <h3 class="buy-total ml-3">Total</h3>
          </div>
          <div class="col-6 ml-n2">
            <span class="total-price">{{ convert(total) }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-12 ml-3">
            <p class="no-ppn">*Belum termasuk ppn</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button
              @click="checkOUT()"
              class="btn btn-outline-primary"
              id="btn-checkout"
            >
              Checkout
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button
              @click="cancelCart()"
              class="btn btn-danger"
              id="btn-cancel-cart"
            >
              Cancel
            </button>
          </div>
        </div>
      </aside>
      <!-- modal checkout -->
      <div class="modalcheckout">
        <b-modal
          ref="my-modal-checkout"
          hide-footer
          :title="`Checkout | code pemesanan #${codeInvoices}`"
        >
          <div class="row mb-3">
            <div class="col-12">
              <h6>Cashier: {{ getNameAccess }}</h6>
            </div>
          </div>
          <div
            class="d-block text-left breakpoint"
            v-for="(items, index) in dataCART"
            :key="index"
          >
            <div class="row">
              <div class="col-6 mt-n3">{{ items.name }}</div>
              <div class="col-2 mt-n3">x {{ items.qty }}</div>
              <div class="col-4 mt-n3">
                <p class="p-total">
                  {{ convertRP(items.price * items.qty) }}
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <p class="text-ppn">Ppn 10%</p>
            </div>
            <div class="col-4">
              <span class="total-check-items">{{
                convertRP(0.1 * total)
              }}</span>
            </div>
          </div>
          <div class="row mt-n3">
            <div class="col-12">
              <p class="p-total">
                Total:
                <span class="total-pay">{{
                  convertRP(0.1 * total + total)
                }}</span>
              </p>
            </div>
            <div class="col-12">
              <p class="payment">Payment: Cash</p>
            </div>
          </div>
          <div class="d-block text-center">
            <b-button class="mt-3 mb-3" variant="primary" block @click="print()"
              >Send Data</b-button
            >
            <h6>Or</h6>
            <b-button class="mt-3" variant="danger" block @click="sendEmail()"
              >Send Email</b-button
            >
            <b-button
              class="mt-3 mb-3"
              variant="dark"
              block
              @click="cancelModel()"
              >Cancel</b-button
            >
          </div>
        </b-modal>
      </div>
    </div>
    <div v-else>
      <aside class="right" id="side-right">
        <div class="containter-cart">
          <img
            class="image"
            src="../assets/img/food-and-restaurant.png"
            alt="image-empity"
          />
          <h3 class="menu-cart" id="menu_cart">Your cart is empty</h3>
          <p class="menu-add"><i>Please add some items from the menu!</i></p>
        </div>
      </aside>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import asideLeft from '../components/asideleft'
import contenHome from '../components/conten'
import getMixins from '../helpers/mixin'
export default {
  mixins: [getMixins],
  data () {
    return {
      statusCart: false,
      dataCART: [],
      datalist: [],
      total: 0,
      idx: 0,
      codeInvoices: ''
    }
  },
  components: {
    asideLeft,
    contenHome
  },
  computed: {
    ...mapGetters({
      getNameAccess: 'auth/getNameAccess',
      getCodeAccess: 'auth/getCodeAccess'
    })
  },
  methods: {
    totalPrice () {
      this.total = 0
      this.dataCART.forEach((elm) => {
        this.total = this.total + elm.subtotal
      })
    },
    indexCart () {
      this.idx = 0
      this.dataCART.forEach((elm) => {
        this.idx = this.idx + elm.qty
        document.querySelector('span.index-item').textContent = this.idx
      })
    },
    actionADD (data) {
      // alert(data)
      this.statusCart = true
      const checkData = this.dataCART.filter((item) => {
        return item.id === data.id
      })
      if (checkData.length >= 1) {
        // alert modif from mixins
        this.alertModif('top', 'info', 'Data sudah ada di cart!')
      } else {
        const newDataCart = {
          qty: 1,
          id: data.id,
          name: data.name,
          category: data.category,
          price: data.price,
          image: data.image,
          subtotal: 1 * data.price
        }
        this.dataCART = [...this.dataCART, newDataCart]
      }
      this.totalPrice()
      this.indexCart()
    },
    btnDecrement (id) {
      const min = 1
      this.dataCART.forEach(element => {
        if (element.id === id) {
          element.qty -= 1
          element.subtotal = element.qty * element.price
          if (element.qty < min) {
            // alert modif from mixins
            this.alertModif('top', 'info', 'Minimum Pemesanan ' + min + ' item!')
            element.qty = min
            element.subtotal = min * element.price
          }
        }
      })
      this.totalPrice()
      this.indexCart()
    },
    btnIncrement (id) {
      const max = 99
      this.dataCART.forEach(element => {
        if (element.id === id) {
          element.qty += 1
          element.subtotal = element.qty * element.price
          if (element.qty > max) {
            // alert modif from mixins
            this.alertModif('top', 'info', 'Maksimum pemesanan ' + max + ' item!')
            element.qty = max
            element.subtotal = max * element.price
          }
        }
      })
      this.totalPrice()
      this.indexCart()
    },
    deleteITEM (id) {
      const deletenewData = this.dataCART.filter((item) => {
        return item.id !== id
      })
      this.dataCART = deletenewData
      if (this.dataCART.length === 0) {
        this.statusCart = false
        this.dataCART = []
        this.idx = 0
        document.querySelector('span.index-item').textContent = this.idx
      }
      this.totalPrice()
      this.indexCart()
    },
    ...mapActions({
      createToCart: 'mHistory/createToCart',
      deleteToCart: 'mHistory/deleteToCart',
      createToHistory: 'mHistory/createToHistory'
    }),
    reloadCode () {
      return this.getCodeAccess
    },
    checkOUT () {
      // get data random from mixins
      this.codeInvoices = this.getRandomInt(10, 1000)
      const nameCashier = this.getNameAccess
      const codeAccess = this.getCodeAccess
      // validasi access only cashier
      if (codeAccess === 1) {
        this.$refs['my-modal-checkout'].show()
        this.dataCART.forEach((e) => {
          this.datalist.push({
            id: e.id,
            invoices: this.codeInvoices,
            cashier: nameCashier,
            item: e.name,
            qty: e.qty,
            price: e.price,
            subtotal: e.subtotal
          })
        })
        // console.log(this.datalist)
        this.createToCart(this.datalist).then((response) => {
          // alert modif from mixins
          // this.alertModif('top', 'success', response)
        }).catch((error) => {
          // alert modif from mixins
          this.alertModif('top', 'error', error)
        })
      } else {
        if (codeAccess === 1) {
          this.$route.push('/login')
          // alert modif from mixins
          this.alertModif('top', 'info', 'Masa akses kedaluarsa!')
        } else {
          // custom alert from mixins
          this.alertPopUp('error', 'Access denied', 'Only for cashier!')
        }
      }
    },
    cancelModel () {
      this.$refs['my-modal-checkout'].hide()
      this.deleteToCart(this.datalist[0].invoices)
    },
    print () {
      // alert('print data!')
      const newDATA = []
      this.datalist.forEach((e) => {
        newDATA.push({
          invoices: e.invoices,
          cashier: e.cashier,
          cart: e.item + ' x' + e.qty
        })
      })
      // console.log(newDATA)
      // grab invoices data
      const idorder = newDATA[0].invoices
      const invoices = '#' + idorder.toString()
      // grab cashier data
      const cashier = newDATA[0].cashier
      // grab date data
      const date = '18 Januari 2020'
      // grab cart data
      const mapping = newDATA.map((el) => {
        return el.cart
      })
      const cart = mapping.join(', ')
      // grab total
      const ppn = 0.1 // 10%
      const amount = ppn * this.total + this.total
      // output
      // console.log(invoices)
      // console.log(cashier)
      // console.log(date)
      // console.log(cart)
      // console.log(amount)
      // object data
      const history = {
        invoices,
        cashier,
        date,
        cart,
        amount
      }
      // console.log(history)
      // send data
      this.createToHistory(history).then((response) => {
        // alert modif from mixins
        this.alertModif('top', 'success', response)
        this.$refs['my-modal-checkout'].hide()
        this.cancelCart() // remove data
      }).catch((error) => {
        // alert modif from mixins
        this.alertModif('top', 'error', error)
      })
    },
    sendEmail () {
      alert('send to email')
      this.cancelCart()
    },
    cancelCart () {
      this.statusCart = false
      this.dataCART = []
      this.datalist = []
      this.idx = 0
      document.querySelector('span.index-item').textContent = this.idx
    }
  },
  mounted () {
    this.reloadCode()
  }
}
</script>
