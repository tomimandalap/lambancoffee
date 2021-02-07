<template>
  <div>
    <navbar />
    <div class="container-bars">
      <asideLeft />
      <contenHistory />
    </div>
  </div>
</template>
<script>
import navbar from '../components/navbar'
import asideLeft from '../components/asideleft'
import contenHistory from '../components/contenHistory'
export default {
  components: {
    navbar,
    asideLeft,
    contenHistory
  },
  methods: {
  },
  mounted () {
    document.querySelector('span.nav-link').innerHTML = 'History'
    document.querySelector('span.nav-link').classList.add('centerText')
    document.querySelector('span.index-item').remove()
    document.querySelector('#search-btn').remove()
    document.querySelector('#cart-btn').remove()
  }
}
</script>
