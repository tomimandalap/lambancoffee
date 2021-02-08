import Swal from 'sweetalert2'
const mixins = {
  data () {
    return {
      serverUrl: process.env.VUE_APP_URL,
      linkgitHub: process.env.VUE_APP_GITHUB,
      form: { // for update dan add items
        name: '',
        image: '',
        price: '',
        category: ''
      },
      formData: { // for add item
        keyword: '',
        page: 1,
        limit: 6
      }
    }
  },
  methods: {
    empityData () {
      this.form.name = ''
      this.form.image = ''
      this.form.price = ''
      this.form.category = ''
    },
    convertRP: (number) => {
      return number.toLocaleString('id', { style: 'currency', currency: 'IDR' }).replace(',00', '').replace('Rp', 'Rp.')
    },
    convert: (number) => {
      return number.toLocaleString('id', { style: 'currency', currency: 'IDR' }).replace(',00', ',-').replace('Rp', 'Rp.')
    },
    alertModif (pos, ico, title) {
      const Toast = Swal.mixin({
        toast: true,
        position: pos,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: ico,
        title: title
      })
    },
    alertPopUp (ico, title, info) {
      Swal.fire({
        icon: ico,
        title: title,
        text: info
      })
    },
    getRandomInt (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
    }
  }
}

export default mixins
