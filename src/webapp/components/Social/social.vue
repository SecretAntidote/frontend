<template>
  <section>
    <div class="social-box primary primary_radius">
      <h1 class="title title__sm mb-3">follow us</h1>
      <p class="subtext">Join Us and Earn free Robux</p>
      <div class="social-content mt-5">
        <div class="columns pt-3">
          <div class="column">
            <div class="columns is-flex-mobile">
              <div class="column is-one-quarter is-one-quarter-mobile p-0">
                <img src="~assets/img/instagram.png" />
              </div>
              <div class="column p-0">
                <div class="social-content-inner">
                  <h6 class="title_20 mb-2 title_dot">Instagram</h6>
                  <p>Follow our TikTok account for <br />free robux promotion codes</p>
                  <div class="pr-5 mt-3">
                    <button class="primary_btn" @click="claimSocial('instagram')">+0.5 robux</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column px-5">
            <div class="columns is-flex-mobile">
              <div class="column is-one-quarter is-one-quarter-mobile p-0">
                <img src="~assets/img/twitter.png" />
              </div>
              <div class="column p-0">
                <div class="social-content-inner">
                  <h6 class="title_20 mb-2 title_dot title_dot__blue">Twitter</h6>
                  <p>Follow Us On twitter for Daily Free Robux Promocodes And Updates</p>
                  <div class="pr-5 mt-3">
                    <button class="primary_btn" @click="claimSocial('twitter')">Follow Us</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="columns is-flex-mobile">
              <div class="column is-one-quarter is-one-quarter-mobile p-0">
                <img src="~assets/img/facebook.png" />
              </div>
              <div class="column p-0">
                <div class="social-content-inner">
                  <h6 class="title_20 mb-2 title_dot title_dot__blue">Facebook</h6>
                  <p>Follow our Facebook account <br />for free robux promotion codes</p>
                  <div class="pr-5 mt-3">
                    <button class="primary_btn" @click="claimSocial('facebook')">+0.5 robux</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
const SOCIAL_CLAIM_API = 'social/claim'
const SOCIAL_URL = {
  tiktok: 'https://tiktok.com',
  youtube: 'https://youtube.com',
  instagram: 'https://instagram.com'
}

export default {
  name: 'Earn',
  auth: true,
  middleware: ['auth'],
  data() {
    return {
      username: this.$auth.user.username
    }
  },
  methods: {
    openUrl(url) {
      window.open(url, '_blank')
    },
    async claimSocial(social) {
      let currentUrl

      if (social === 'tiktok') {
        currentUrl = SOCIAL_URL.tiktok
      } else if (social === 'instagram') {
        currentUrl = SOCIAL_URL.instagram
      } else if (social === 'youtube') {
        currentUrl = SOCIAL_URL.youtube
      }

      await this.$axios.post(SOCIAL_CLAIM_API, {social_type: social})
      window.open(currentUrl, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.primary_radius {
  padding: 60px;
}
.title_dot {
  position: relative;
  padding-left: 18px;
}
.title_dot:after {
  content: '';
  position: absolute;
  top: 10px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #ff92a3;
}
.title_dot__blue:after {
  background: #b2dbe5;
}
@media screen and (max-width: 550px) {
  .social-box.primary.primary_radius {
    background-color: #fff !important;
    padding: 0 !important;
    .social-content {
      border-radius: 20px;
      padding: 25px;
      background: #e8f3f5;
      position: relative;
    }
  }
  .social-content-inner {
    padding-bottom: 60px;
    padding-left: 10px;
    .pr-5 {
      padding: 0 !important;
    }
    button {
      position: absolute;
      width: 85%;
      transform: translateX(-50%);
      left: 50%;
    }
  }
}
</style>
