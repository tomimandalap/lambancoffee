<template>
  <div class="container-sm mt-3">
    <h1 class="title-detail mt-1" style="color: #fff">Detail Item {{ id }}</h1>
    <div class="row mt-3">
      <div class="col-sm-12 col-md-12 col-lg-3 mb-3">
        <img
          class="img-details"
          :src="`${serverUrl}/image/${getDetailProduct.image}`"
          :alt="getDetailProduct.name"
        />
      </div>
      <div class="col-sm-12 col-md-12 col-lg-9 mb-3">
        <table class="table mt-1">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody style="border-bottom: 2px solid #000">
            <tr style="font-weight: bold; background: #fff">
              <th scope="row">{{ getDetailProduct.category }}</th>
              <td>
                {{ getDetailProduct.name }}
              </td>
              <td>{{ getDetailProduct.price }}</td>
              <td>{{ getDetailProduct.date }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="back()" class="btn btn-outline-light btn-detail-back">
          <i class="fas fa-angle-double-left"></i> Back
        </button>
        <button @click="update()" class="btn btn-dark ml-3 btn-detail-update">
          <i class="far fa-edit"></i> Update
        </button>
        <button
          @click="deleteRow()"
          class="btn btn-dark ml-3 btn-detail-delete"
        >
          <i class="far fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
    <div class="modal-updateItem">
      <b-modal
        ref="my-modal"
        hide-footer
        :title="'Update data ' + getDetailProduct.name + ' id [' + id + ']'"
      >
        <input
          v-model="form.name"
          type="text"
          class="form-control mb-2"
          :placeholder="getDetailProduct.name"
        />
        <input
          @change="processFile($event)"
          type="file"
          class="form-control mb-2"
          id="image-form"
        />
        <input
          v-model="form.price"
          type="text"
          class="form-control mb-2"
          :placeholder="getDetailProduct.price"
        />
        <select id="category-form" class="mt-2" v-model="form.category">
          <option value="">Category</option>
          <option
            v-for="(item, index) in getCategory"
            :key="index"
            :value="item.category"
          >
            {{ item.category }}
          </option>
        </select>
        <b-button class="mt-3" variant="primary" block @click="updateRow()"
          >Update Product</b-button
        >
        <b-button class="mt-3" variant="danger" block @click="hideModal"
          >Cancel</b-button
        >
      </b-modal>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import callMixins from '../helpers/mixin'
export default {
  mixins: [callMixins],
  data () {
    return {
      id: this.$route.params.id,
      form: {
        name: '',
        image: '',
        price: '',
        category: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      getDetailProduct: 'products/getDetailProduct',
      getCategory: 'category/getDataCategory'
    })
  },
  methods: {
    ...mapActions({
      detailProduct: 'products/detailProduct',
      deleteProduct: 'products/deleteDetailProduct',
      updateProduct: 'products/updateProduct',
      actionGetDataCategory: 'category/actionGetDataCategory',
      getStsBtn: 'products/getStsBtn'
    }),
    back () {
      // alert('s')
      this.$router.push('/')
      // set status menu
      const sts = true
      this.getStsBtn(sts)
    },
    update () {
      // alert('update')
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
      // from mixin
      this.empityData()
    },
    processFile (el) {
      this.form.image = el.target.files[0]
    },
    updateRow () {
      // console.log(this.form)
      const fupdate = new FormData()
      fupdate.append('name', this.form.name)
      fupdate.append('image', this.form.image)
      fupdate.append('price', this.form.price)
      fupdate.append('category', this.form.category)
      // new data
      const newData = {
        id: this.id,
        data: fupdate
      }
      // console.log(newData) // cek formData
      this.updateProduct(newData).then((response) => {
        // alert modif from mixins
        this.alertModif('top', 'success', response)
        // hide modal
        this.$refs['my-modal'].hide()
        // from mixins
        this.empityData()
        // get reload
        this.detailProduct(this.id)
      }).catch((error) => {
        if (error === 'Please select an image to upload') {
          // aler modif from mixin
          this.alertPopUp('error', 'Oops..,', `${error}!`)
        } else if (error === 'Bad request') {
          // aler modif from mixin
          this.alertPopUp('warning', error, 'Make sure the data is complete!')
        } else if (error === 'Wrong type extention! Please upload like png/PNG/jpg/JPG.') {
          // aler modif from mixin
          this.alertPopUp('error', 'Wrong type extention!', 'Please upload like png or jpg.')
        } else if (error === 'File size exceeds the 1 Mb limit') {
          // aler modif from mixin
          this.alertPopUp('warning', 'Oops..,', 'Maximum file size is 1MB!')
        } else {
          console.log(error)
        }
      })
    },
    deleteRow () {
      this.deleteProduct(this.id).then((response) => {
        // alert modif from mixins
        this.alertModif('top', 'success', 'Delete product success!')
        this.$router.push('/')
        // set status menu
        const sts = true
        this.getStsBtn(sts)
      }).catch((error) => {
        // alert modif from mixins
        this.alertModif('top', 'info', error)
      })
    }
  },
  mounted () {
    this.detailProduct(this.id)
    this.actionGetDataCategory()
  }
}
</script>
<style scoped>
h1.title-detail {
  text-align: left;
}
img.img-details {
  width: 225px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}
</style>
