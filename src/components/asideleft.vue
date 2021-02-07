<template>
  <div>
    <aside class="left" id="side-left">
      <ul class="list-bars">
        <li>
          <router-link to="/" class="icon-list"
            ><i class="fas fa-utensils"></i
          ></router-link>
        </li>
        <li>
          <router-link to="/history" class="icon-list"
            ><i class="far fa-clipboard"></i
          ></router-link>
        </li>
        <li>
          <button
            @click="showModal"
            class="btn btn-light bars-item3"
            id="btn-plus"
          >
            <i class="fas fa-plus"></i>
          </button>
        </li>
      </ul>
    </aside>
    <!-- modal add items -->
    <div>
      <b-modal ref="my-modal" hide-footer title="Add Items">
        <div class="d-block text-left breakadditems">
          <form action="" @submit.prevent="onSubmit()">
            <div class="row">
              <div class="col-2 mt-3">
                <label for="name-form">Name</label>
              </div>
              <div class="col-10">
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control mt-2"
                  placeholder="Name"
                  id="name-form"
                />
              </div>
              <div class="col-2 mt-3">
                <label for="image-form">Image</label>
              </div>
              <div class="col-10">
                <input
                  @change="processFile($event)"
                  type="file"
                  class="form-control mt-2"
                  id="image-form"
                />
              </div>
              <div class="col-2 mt-3">
                <label for="price-form">Price</label>
              </div>
              <div class="col-10">
                <b-input-group size="md" prepend="Rp" append="" class="mt-2">
                  <b-form-input
                    v-model="form.price"
                    placeholder="Price"
                    id="price-form"
                  ></b-form-input>
                </b-input-group>
              </div>
              <div class="col-2 mt-3">
                <label for="category-form">Category</label>
              </div>
              <div class="col-10">
                <select id="category-form" v-model="form.category" class="mt-2">
                  <option value="">Category</option>
                  <option
                    v-for="(item, index) in getDataCategory"
                    :key="index"
                    :value="item.category"
                  >
                    {{ item.category }}
                  </option>
                </select>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-info mt-5">
                  Add Items
                </button>
              </div>
            </div>
          </form>
        </div>
        <b-button class="mt-3" variant="danger" block @click="hideModal"
          >Close Me</b-button
        >
      </b-modal>
    </div>
    <!-- and modal add items -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import dataMixins from '../helpers/mixin'
export default {
  mixins: [dataMixins],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getDataCategory: 'category/getDataCategory'
    })
  },
  methods: {
    showModal () {
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
      // from mixins
      this.empityData()
    },
    ...mapActions({
      addProduct: 'products/insertProduct',
      actionGetDataCategory: 'category/actionGetDataCategory',
      actionsListProduct: 'products/actionsListProduct'
    }),
    processFile (el) {
      // put file data
      this.form.image = el.target.files[0]
    },
    onSubmit () {
      // console.log(this.form)
      const fdata = new FormData()
      fdata.append('name', this.form.name)
      fdata.append('image', this.form.image)
      fdata.append('price', this.form.price)
      fdata.append('category', this.form.category)
      // console.log(fdata) // cek formData
      this.addProduct(fdata).then((response) => {
        // aler modif from mixin
        this.alertModif('top', 'success', response)
        // hide modal
        this.$refs['my-modal'].hide()
        // from mixins
        this.empityData()
        // get all product
        this.actionsListProduct(this.formData)
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
    }
  },
  mounted () {
    this.actionGetDataCategory()
  }
}
</script>
