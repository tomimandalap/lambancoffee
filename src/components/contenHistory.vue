<template>
  <!-- section main -->
  <section class="main" id="main">
    <!-- history-card -->
    <div class="row" id="history-card">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="cards today">
          <div class="dot1 dot-up"></div>
          <div class="dot1 dot-center"></div>
          <div class="dot1 dot-down"></div>
          <div class="cards-body">
            <h5 class="cards-title">Today’s Income</h5>
            <h3 class="cards-nominal">
              Rp. <span class="no-today">1.000.000</span>
            </h3>
            <p class="cards-text">+2% Yesterday</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="cards orders">
          <div class="dot2 dot-up"></div>
          <div class="dot2 dot-center"></div>
          <div class="dot2 dot-down"></div>
          <div class="cards-body">
            <h5 class="cards-title">Orders</h5>
            <h3 class="cards-nominal">
              Rp. <span class="no-today">3.270</span>
            </h3>
            <p class="cards-text">+5% Last Week</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <div class="cards years">
          <div class="dot3 dot-up"></div>
          <div class="dot3 dot-center"></div>
          <div class="dot3 dot-down"></div>
          <div class="cards-body">
            <h5 class="cards-title">This Year’s Income</h5>
            <h3 class="cards-nominal">
              Rp. <span class="no-today">100.000.000.000</span>
            </h3>
            <p class="cards-text">+10% Last Year</p>
          </div>
        </div>
      </div>
    </div>
    <!-- history-card end -->

    <!-- box revenue -->
    <div class="row justify-content-center" id="history-graph">
      <div class="col-12 col-md-12">
        <div class="revenue-box">
          <p><b>Revenue</b></p>
          <div class="chart-container">
            <!-- <canvas id="revenueChart"><graph /></canvas> -->
          </div>
        </div>
      </div>
    </div>
    <!-- box revenue end -->
    <!-- box recent order -->
    <div class="row" id="history-order">
      <div class="recent-box">
        <p class="ml-2"><b>Recent Order</b></p>
        <div class="col-5 box-search mb-4 ml-n2" id="box-search">
          <b-form-input
            type="text"
            v-model="formData.keyword"
            @keyup="searchTable()"
            placeholder="Search code invoices"
          ></b-form-input>
        </div>
        <div v-if="!getErrStatus" class="col-12 col-md-12">
          <table class="tables" id="my-table">
            <thead class="bg-dark" style="color: #fff">
              <tr>
                <th>No</th>
                <th>Invoices</th>
                <th>Cashier</th>
                <th>Date</th>
                <th>Order</th>
                <th>Amount</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody class="table-list" id="my-table">
              <tr v-for="(item, idx) in getListHistory" :key="idx">
                <td>{{ item.id }}</td>
                <td>{{ item.invoices }}</td>
                <td>{{ item.cashier }}</td>
                <td>{{ item.date.substring(0, 10) }}</td>
                <td>{{ item.cart }}</td>
                <td>{{ convertRP(item.amount) }}</td>
                <td>
                  <button
                    @click="detailHistory(item.id)"
                    class="btn btn-secondary btn-detail-product"
                  >
                    <i class="far fa-file-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="row mt-4">
            <div class="col-4 mt-3">
              <p class="page-tb-history">
                <b>Total data : {{ getPages.totalData }} </b>
              </p>
            </div>
            <div class="col-8">
              <b-pagination
                @input="pageHistory('')"
                v-model="formData.page"
                :total-rows="getPages.totalData"
                :per-page="formData.limit"
                size="sm"
                align="right"
                class="mt-2 mr-4"
              ></b-pagination>
            </div>
          </div>
        </div>
        <div v-else class="col-12 col-md-12">
          <div>
            <h3>Data tabel {{ getErrMsg }}!</h3>
          </div>
        </div>
      </div>
    </div>
    <!-- box recent order end -->
    <!-- modal detail history -->
    <div>
      <b-modal
        ref="my-modal"
        hide-footer
        :title="'Detail History [' + idHistory + ']'"
      >
        <div
          class="d-block text-left"
          v-for="(item, idx) in getDetail"
          :key="idx"
        >
          <div class="row">
            <div class="col-6">
              <p>
                <b>Invoices : {{ item.invoices }}</b>
              </p>
            </div>
            <div class="col-6">
              <p class="float-right">
                <b>Date : {{ item.date.substring(0, 10) }}</b>
              </p>
            </div>
            <div class="col-6">
              <p>
                <b>Cashier : {{ item.cashier }}</b>
              </p>
            </div>
            <div class="col-6">
              <p class="float-right">
                <b>Total : {{ convertRP(item.amount) }}</b>
              </p>
            </div>
            <div class="col-12">
              <p>
                <span class="icon-line-item"
                  ><i class="fas fa-clipboard-list"></i
                ></span>
                <b> List order </b>
              </p>
              <p class="mt-n1 line-items">
                <b>{{ item.cart }}</b>
              </p>
            </div>
          </div>
        </div>
        <b-button class="mt-3" variant="danger" block @click="deleteHistory"
          >Delete</b-button
        >
        <b-button class="mt-2" variant="dark" block @click="cancelModal"
          >Cancle</b-button
        >
      </b-modal>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import getMixins from '../helpers/mixin'
export default {
  mixins: [getMixins],
  data () {
    return {
      formData: {
        search: 'invoices',
        keyword: '',
        page: 1,
        limit: 5
      },
      idHistory: ''
    }
  },
  computed: {
    ...mapGetters({
      getListHistory: 'mHistory/getListHistory',
      getErrStatus: 'mHistory/getErrStatus',
      getErrMsg: 'mHistory/getErrMsg',
      getErrCode: 'mHistory/getErrCode',
      getPages: 'mHistory/getPages',
      getDetail: 'mHistory/getDetail',
      getNameAccess: 'auth/getNameAccess',
      getCodeAccess: 'auth/getCodeAccess'
    })
  },
  methods: {
    ...mapActions({
      actionGetHistory: 'mHistory/actionGetHistory',
      actionDetailHistory: 'mHistory/actionDetailHistory',
      deleteDetailHistory: 'mHistory/deleteDetailHistory'
    }),
    searchTable () {
      this.actionGetHistory(this.formData).then((response) => {
        // console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    pageHistory () {
      this.actionGetHistory(this.formData)
    },
    detailHistory (id) {
      // get data code access from vuex
      const codeAccess = this.getCodeAccess
      // validasi access
      if (codeAccess === 1) {
        this.idHistory = id
        this.actionDetailHistory(id)
        this.$refs['my-modal'].show()
      } else {
        // alert modif from mixins
        this.alertPopUp('error', 'Access denied', 'Only for cashier!')
      }
    },
    deleteHistory () {
      this.deleteDetailHistory(this.idHistory).then((response) => {
        // alert modif from mixins
        this.alertModif('top', 'success', response)
        // reload data
        this.actionGetHistory(this.formData)
        this.$refs['my-modal'].hide()
      }).catch((error) => {
        // alert modif from mixins
        this.alertModif('top', 'error', error)
        // reload data
        this.actionGetHistory(this.formData)
        this.$refs['my-modal'].hide()
      })
    },
    cancelModal () {
      this.$refs['my-modal'].hide()
    }
  },
  mounted () {
    this.actionGetHistory(this.formData)
  }
}
</script>
