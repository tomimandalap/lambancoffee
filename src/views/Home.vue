<template>
  <div>
    <navbar />
    <asideRight />
  </div>
</template>
<script>
import navbar from '../components/navbar'
import asideRight from '../components/asideright'
export default {
  name: 'Home',
  data () {
    return {
      dataEmitFromConten: []
    }
  },
  components: {
    navbar,
    asideRight
  },
  methods: {
  }
}
</script>
<style src='../assets/css/styles.css'></style>
