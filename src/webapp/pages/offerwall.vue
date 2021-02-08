<template>
  <section class='section p-0'>
     <nav
      class='navbar px-5 is-align-items-center'
      style='height: 40px;margin-bottom: 35px;'
      role='navigation'
      aria-label='main navigation'
    >
      <h1>RBX CLOUD</h1>
    </nav>
    <div class="loading" v-if="isLoading"></div>
    <div class='px0' v-if="!isLoading && !error">
      <div v-for="offer in offers" :key="offer.offerid">
        <OfferItem :offer="offer" :affiliateid="affiliateid" />
      </div>
    </div>
    <div class='px0' v-if="!isLoading && error">
      {{ error }}
    </div>
  </section>
</template>
<script>
import OfferItem from '@/components/OfferItem'

const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com'
const IPIFY_URL = `${CORS_ANYWHERE}/https://api.ipify.org?format=json`
export default {
  name: 'OfferWall',
  auth: true,
  middleware: ['auth'],
  components: {
    OfferItem
  },
  data () {
    return {
      isLoading: false,
      offers: null,
      error: null,
      affiliateid: 106684
    }
  },
  async mounted () {
    this.isLoading = true
    try {
      await this.getOGADS()
    } catch (err) {
      this.error = 'Network Error (Refresh Page)'
      this.isLoading = false
    }
    this.isLoading = false
  },
  methods: {
    getClientAgent () {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera

      if (/android/i.test(userAgent)) {
        return 'android'
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios'
      }
      return 'desktop'
    },
    async getClientIp () {
      const { ip } = await this.$axios.$get(IPIFY_URL)
      return ip
    },
    async getOGADS () {
      const clientAgent = this.getClientAgent()
      const clientIp = await this.getClientIp()
      const ogadsApiUrl = `${CORS_ANYWHERE}/https://mobverify.com/api/v1/?affiliateid=${this.affiliateid}&ip=${clientIp}&device=${clientAgent}&ctype=1`
      const { success, offers } = await this.$axios.$get(ogadsApiUrl)
      if (success) {
        this.offers = offers
      } else {
        this.error = 'Network Error (Refresh Page)'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  background: #f5f7fd;
  height: 100vh;
}
.navbar {
  h1 {
    font-size: 20px;
    font-weight: 600;
  }
}
.loading {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.loading:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(199, 189, 189);
  border-color: #3f3f3f transparent #3f3f3f transparent;
  animation: loading 1.2s linear infinite;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
