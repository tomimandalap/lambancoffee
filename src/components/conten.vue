<template>
  <section class="main" id="main">
    <div class="row mb-5 search-sort">
      <div class="col-5 box-search ml-n2" id="box-search">
        <b-form-input
          type="text"
          v-model="formData.keyword"
          @keyup="searchData()"
          placeholder="Search menu"
        ></b-form-input>
      </div>
      <div class="col-7 box-sort ml-2" id="box-sort">
        <div class="container-sort">
          <b-button-group>
            <b-dropdown right split text="Sort">
              <b-dropdown-item @click="sortA()"
                >Default <i class="far fa-calendar"></i
              ></b-dropdown-item>
              <b-dropdown-item @click="sortB()"
                >Name <i class="fas fa-sort-alpha-down"></i
              ></b-dropdown-item>
              <b-dropdown-item @click="sortC()"
                >Name <i class="fas fa-sort-alpha-down"></i
              ></b-dropdown-item>
              <b-dropdown-item @click="sortD()"
                >Price <i class="fas fa-sort-numeric-down"></i
              ></b-dropdown-item>
              <b-dropdown-item @click="sortE()"
                >Price <i class="fas fa-sort-numeric-up"></i
              ></b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>
      </div>
    </div>
    <div v-if="!isError">
      <div v-if="!getStsButton">
        <!-- dark -->
        <div class="row" id="menu-list">
          <div v-for="(item, index) in getListProduct" :key="index">
            <div class="col-sm-6 col-md-4 col-lg-4">
              <div class="card mb-4 ml-n2 mr-n2">
                <img
                  :src="`${serverUrl}/image/${item.image}`"
                  class="card-img-top"
                  alt="image"
                  id="img-cursor"
                />
                <button
                  class="btn btn-outline-dark add-cart cart"
                  @click="addToCart(item)"
                >
                  <i class="far fa-check-circle"></i>
                </button>
                <div class="card-body">
                  <h5 class="card-title" id="card-dark">{{ item.name }}</h5>
                  <span class="prices" id="card-dark">{{
                    convertRP(item.price)
                  }}</span>
                  <button
                    @click="gotoDetail(item.id)"
                    class="btn btn-primary bt-detail"
                  >
                    Detail <i class="fas fa-info-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- information pagination -->
        <div class="row overflow-auto">
          <div class="col-12 col-md-2">
            <p class="mt-3 footer-page" id="card-dark">
              Page : {{ formData.page }}
            </p>
          </div>
          <div class="col-6 col-md-4">
            <p class="mt-3 footer-page" id="card-dark">
              Total Data : {{ pagination.totalData }}
            </p>
          </div>
          <div class="col-6 col-md-6">
            <b-pagination
              @input="pageProduct('')"
              v-model="formData.page"
              :total-rows="pagination.totalData"
              :per-page="formData.limit"
              size="sm"
              align="right"
              class="mt-2 mr-4"
            ></b-pagination>
          </div>
        </div>
        <!-- end information -->
        <!-- dark -->
      </div>
      <div v-else>
        <!-- normal -->
        <div class="row" id="menu-list">
          <div v-for="(item, index) in getListProduct" :key="index">
            <div class="col-sm-6 col-md-4 col-lg-4">
              <div class="card mb-4 ml-n2 mr-n2">
                <img
                  :src="`${serverUrl}/image/${item.image}`"
                  class="card-img-top"
                  alt="image"
                  id="img-cursor"
                />
                <button
                  class="btn btn-outline-dark add-cart cart"
                  @click="addToCart(item)"
                >
                  <i class="far fa-check-circle"></i>
                </button>
                <div class="card-body">
                  <h5 class="card-title" id="card-title">{{ item.name }}</h5>
                  <span class="prices">{{ convertRP(item.price) }}</span>
                  <button
                    @click="gotoDetail(item.id)"
                    class="btn btn-primary bt-detail"
                  >
                    Detail <i class="fas fa-info-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- information pagination -->
        <div class="row overflow-auto">
          <div class="col-12 col-md-2">
            <p class="mt-3 footer-page">Page : {{ formData.page }}</p>
          </div>
          <div class="col-6 col-md-4">
            <p class="mt-3 footer-page">
              Total Data : {{ pagination.totalData }}
            </p>
          </div>
          <div class="col-6 col-md-6">
            <b-pagination
              @input="pageProduct('')"
              v-model="formData.page"
              :total-rows="pagination.totalData"
              :per-page="formData.limit"
              size="sm"
              align="right"
              class="mt-2 mr-4"
            ></b-pagination>
          </div>
        </div>
        <!-- end information -->
        <!-- normal -->
      </div>
    </div>
    <div v-else>
      <div v-if="!getStsButton">
        <div class="row">
          <div class="col-12 not-found" style="color: #fff">
            <i class="far fa-times-circle"></i>
          </div>
          <div class="col-12 not-found" style="color: #fff">
            {{ errMessage }}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-12 not-found">
            <i class="far fa-times-circle"></i>
          </div>
          <div class="col-12 not-found">{{ errMessage }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import callMixins from '../helpers/mixin'
export default {
  mixins: [callMixins],
  data () {
    return {
      formData: {
        keyword: '',
        page: 1,
        limit: 6,
        sort: '',
        metode: 'asc'
      }
    }
  },
  computed: {
    ...mapGetters({
      getListProduct: 'products/getListProduct',
      isError: 'products/getListError',
      errMessage: 'products/getListErrMessage',
      pagination: 'products/getPagination',
      getCodeAccess: 'auth/getCodeAccess',
      getStsButton: 'products/getStsButton'
    })
  },
  methods: {
    ...mapActions({
      actionsListProduct: 'products/actionsListProduct',
      getStsBtn: 'products/getStsBtn'
    }),
    searchData () {
      // alert(this.search)
      this.actionsListProduct(this.formData).then((response) => {
        // console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    pageProduct () {
      this.actionsListProduct(this.formData)
    },
    sortA  () {
      // set id metode asc
      this.formData.sort = 'id'
      this.formData.metode = 'asc'
      this.actionsListProduct(this.formData)
    },
    sortB  () {
      // set name merode asc
      this.formData.sort = 'name'
      this.formData.metode = 'asc'
      this.actionsListProduct(this.formData)
    },
    sortC  () {
      // set name merode desc
      this.formData.sort = 'name'
      this.formData.metode = 'desc'
      this.actionsListProduct(this.formData)
    },
    sortD  () {
      // set name merode desc
      this.formData.sort = 'price'
      this.formData.metode = 'asc'
      this.actionsListProduct(this.formData)
    },
    sortE  () {
      // set name merode desc
      this.formData.sort = 'price'
      this.formData.metode = 'desc'
      this.actionsListProduct(this.formData)
    },
    gotoDetail (id) {
      if (this.getCodeAccess === 1) {
        // alert(id)
        this.$router.push(`/detail/${id}`)
      } else {
        // custom alert from mixins
        this.alertPopUp('error', 'Access denied', 'Only for cashier!')
      }
    },
    addToCart (data) {
      this.$emit('thisEmit', data)
    }
  },
  mounted () {
    this.actionsListProduct(this.formData)
    // set status menu
    const sts = true
    this.getStsBtn(sts)
  }
}
</script>
