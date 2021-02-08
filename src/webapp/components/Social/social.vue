<template>
  <section>
    <div
      class="social-box primary primary_radius"
      style="margin-top: 37px;"
    >
      <h1 class="title title__sm mb-3">follow us</h1>
      <p class="subtext">Join Us and Earn free Robux</p>
      <div class="social-content mt-5">
        <div class="columns pt-3">
          <div class="column">
            <div class="columns is-flex-mobile">
              <div class="column is-one-quarter is-one-quarter-mobile p-0">
                <img id="LogoImage" src="~assets/img/tiktok.png" />
              </div>
              <div class="column p-0">
                <div class="social-content-inner">
                  <h6 class="title_20 mb-2 title_dot">Tiktok</h6>
                  <p>Follow our TikTok account <br />Get Free Robux Promo codes</p>
                  <div class="pr-5 mt-3">
                    <button class="primary_btn" @click="claimSocial('tiktok')">+0.5 robux</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column px-5">
            <div class="columns is-flex-mobile">
              <div class="column is-one-quarter is-one-quarter-mobile p-0">
                <img id="LogoImage" src="~assets/img/youtube.png" />
              </div>
              <div class="column p-0">
                <div class="social-content-inner">
                  <h6 class="title_20 mb-2 title_dot">Youtube</h6>
                  <p>Follow our Youtube Channel <br />Get Free Robux Promo codes</p>
                  <div class="pr-5 mt-3">
                    <button class="primary_btn" @click="claimSocial('youtube')">+0.5 robux</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="columns is-flex-mobile">
              <div class="column is-one-quarter is-one-quarter-mobile p-0">
                <img id="LogoImage" src="~assets/img/discord.png" />
              </div>
              <div class="column p-0">
                <div class="social-content-inner">
                  <h6 class="title_20 mb-2 title_dot">Discord</h6>
                  <p>Follow our Discord Server <br />Get Free Robux Promo codes</p>
                  <div class="pr-5 mt-3">
                    <button class="primary_btn" @click="claimSocial('discord')">+0.5 robux</button>
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
  tiktok: 'https://www.tiktok.com/@rbxwallets',
  youtube: 'https://www.youtube.com/c/YourBroJoe/about',
  discord: 'https://discord.gg/6XUrPw5SSZ'
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
      } else if (social === 'discord') {
        currentUrl = SOCIAL_URL.discord
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
#LogoImage {
  padding-right: 20px;
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
  background: red;
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
