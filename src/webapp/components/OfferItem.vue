<template>
  <div>
    <div class="offer is-align-items-center">
      <div class="offer__details">
        <img :src="picture" />
        <div class="offer__text">
          <h1>{{ name }}</h1>
          <div>{{ adcopy }}</div>
        </div>
      </div>
      <div class="offer__earn">
        <a :href="getOfferUrl(offerid, username)" target="_blank">
          <button class="button is-primary big-btn has-text-weight-semibold is-uppercase">
            {{ convertDollarsToRbx(payout) }} Rbx
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
const CORS_ANYWHERE = 'api/proxy?url='
const generateClickIdUrl = 'affiliate/generate-click'
export default {
  name: 'OfferItem',
  props: ['offer', 'affiliateid'],
  data() {
    return {
      name: this.offer.name,
      adcopy: this.offer.adcopy,
      payout: this.offer.payout,
      offerid: this.offer.offerid,
      picture: `${CORS_ANYWHERE}${this.offer.picture}`,
      username: this.$auth.user.username
    }
  },
  methods: {
    convertDollarsToRbx(offerPrice) {
      return Math.round(offerPrice * (65 / 1) * 0.5)
    },
    getOfferUrl(offerid, username) {
      const offerLink = `http://jump.ogtrk.net/aff_c?aff_id=${this.affiliateid}&offer_id=${offerid}&aff_sub5=${username}`
      return offerLink
    }
  }
}
</script>

<style lang="scss" scoped>
.offer {
  background: white;
  padding: 27px;
  border-top: 1px solid #999999;
  display: flex;
  justify-content: space-between;
  &__text {
    h1 {
      color: #3f3f3f;
      font-size: 18px;
      font-weight: 600;
    }
  }
  &__details {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
    }
  }
}
</style>
