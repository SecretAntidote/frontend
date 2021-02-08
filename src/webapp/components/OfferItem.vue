<template>
  <div>
    <div class="offer is-align-items-center">
      <div class="offer__details">
        <div class="offer__title">{{ name }}</div>
        <div>{{ adcopy }}</div>
      </div>
      <div class="offer__earn">
        <button
          class="button is-primary big-btn has-text-weight-semibold is-uppercase"
          @click="goToOffer(offerid, username)"
        >
          {{ convertDollarsToRbx(payout) }} Rbx
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const generateClickIdUrl = 'affiliate/generate-click'
export default {
  name: 'OfferItem',
  props: ['offer', 'affiliateid'],
  data () {
    return {
      name: this.offer.name,
      adcopy: this.offer.adcopy,
      payout: this.offer.payout,
      offerid: this.offer.offerid,
      username: this.$auth.user.username
    }
  },
  methods: {
    convertDollarsToRbx (offerPrice) {
      return Math.round(offerPrice * (65 / 1) * 0.5)
    },
    async goToOffer (offerid, username) {
      const { clickId } = await this.$axios.$post(generateClickIdUrl)
      const offerLink = `http://jump.ogtrk.net/aff_c?aff_id=${this.affiliateid}&offer_id=${offerid}&aff_sub5=${username}&aff_sub4=${clickId}`
      window.open(offerLink, '_blank')
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

  &__title {
    color: #3f3f3f;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
