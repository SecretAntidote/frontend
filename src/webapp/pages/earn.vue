<template>
  <div>
    <section>
      <div class="container">
        <div class="column mb-5">
          <h1 class="title title__36 has-text-weight-600 mb-3">
            Have a nice day,<br />
            <span class="title__subtitle">{{ username }}</span>
          </h1>
        </div>
        <Statistics />
        <div class="column section">
          <div class="section-title">
            <h1 class="title title__30 has-text-weight-600 mb-3">Offerwalls</h1>
            <p class="subtext">
              Click Open Offerwall and start <br />
              completing free offers to earn Robux!
            </p>
          </div>
        </div>
        <div class="is-hidden-mobile mb-5 is-multiline is-flex">
          <div class="column is-4">
            <div class="product mx-5" @click="openUrl(`https://wall.adgaterewards.com/n6qTqw/${username}`)">
              <div class="product__img adGate">
                <img src="~assets/img/adgate.png" />
              </div>
              <div class="product__box">
                <h6 class="product__title mb-3">AdGatemedia</h6>
                <p>Complete free offers to earn free Robux <br>(~ 30 minutes)</p>
                <div class="mt-4">
                  <button class="primary_btn primary_btn__lg">Open OfferWall</button>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div
              class="product product__red mx-5"
              @click="openUrl(`https://api.adgem.com/v1/wall?appid=3549&playerid=${username}`)"
            >
              <div class="product__img adGem">
                <img src="~assets/img/adgem.png" />
              </div>
              <div class="product__box">
                <h6 class="product__title mb-3">AdGem</h6>
                <p>Complete free offers to earn free Robux <br>(~ 30 minutes)</p>
                <div class="mt-4">
                  <button class="primary_btn primary_btn__lg">Open OfferWall</button>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="product product__blue mx-5" @click="openUrl('/offerwall')">
              <div class="product__img ogads">
                <img src="~assets/img/ogads.png" />
              </div>
              <div class="product__box">
                <h6 class="product__title mb-3">Ogads</h6>
                <p>Complete free offers to earn free Robux <br>(~ 5 minutes)</p>
                <div class="mt-4">
                  <button class="primary_btn primary_btn__lg">Open OfferWall</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-hidden-mobile is-centered mt-5">
          <div class="column is-4">
            <div class="product mx-5" @click="openUrl(`https://www.offertoro.com/ifr/show/26401/${username}/11343`)">
              <div class="product__img offerToro">
                <img src="~assets/img/offertoro.png" />
              </div>
              <div class="product__box">
                <h6 class="product__title mb-3">OfferToro</h6>
                <p>Complete free offers to earn free Robux <br>(~ 5 minutes)</p>
                <div class="mt-4">
                  <button class="primary_btn primary_btn__lg">Open OfferWall</button>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div
              class="product mx-5"
              @click="openUrl(`https://www.ayetstudios.com/offers/web_offerwall/2850?external_identifier=${username}`)"
            >
              <div class="product__img ayetstudios">
                <img src="~assets/img/ayetstudios.png" />
              </div>
              <div class="product__box">
                <h6 class="product__title mb-3">Ayetstudio</h6>
                <p>Complete free offers to earn free Robux <br>(~ 30 minutes)</p>
                <div class="mt-4">
                  <button class="primary_btn primary_btn__lg">Open OfferWall</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container is-hidden-tablet slider">
          <!-- Slider -->
          <splide :options="options">
            <splide-slide>
              <div class="product mx-5" @click="openUrl(`https://wall.adgaterewards.com/n6qTqw/${username}`)">
                <div class="product__img adGate">
                  <img src="~assets/img/adgate.png" />
                </div>
                <div class="product__box">
                  <h6 class="product__title mb-3">AdGatemedia</h6>
                  <p>Complete free offers to earn free Robux <br>(~ 30 minutes)</p>
                  <div class="mt-4">
                    <button class="primary_btn primary_btn__lg">Open OfferWall</button>
                  </div>
                </div>
              </div>
            </splide-slide>
            <splide-slide>
              <div
                class="product product__red mx-5"
                @click="openUrl(`https://api.adgem.com/v1/wall?appid=3549&playerid=${username}`)"
              >
                <div class="product__img adGem">
                  <img src="~assets/img/adgem.png" />
                </div>
                <div class="product__box">
                  <h6 class="product__title mb-3">AdGem</h6>
                  <p>Complete free offers to earn free Robux <br>(~ 30 minutes)</p>
                  <div class="mt-4">
                    <button class="primary_btn primary_btn__lg">Open OfferWall</button>
                  </div>
                </div>
              </div>
            </splide-slide>
            <splide-slide>
              <div class="product product__blue mx-5" @click="openUrl('/offerwall')">
                <div class="product__img ogads">
                  <img src="~assets/img/ogads.png" />
                </div>
                <div class="product__box">
                  <h6 class="product__title mb-3">Ogads</h6>
                  <p>Complete free offers to earn free Robux <br>(~ 5 minutes)</p>
                  <div class="mt-4">
                    <button class="primary_btn primary_btn__lg">Open OfferWall</button>
                  </div>
                </div>
              </div>
            </splide-slide>
            <splide-slide>
              <div class="product mx-5" @click="openUrl(`https://www.offertoro.com/ifr/show/26401/${username}/11343`)">
                <div class="product__img offerToro">
                  <img src="~assets/img/offertoro.png" />
                </div>
                <div class="product__box">
                  <h6 class="product__title mb-3">OfferToro</h6>
                  <p>Complete free offers to earn free Robux <br>(~ 5 minutes)</p>
                  <div class="mt-4">
                    <button class="primary_btn primary_btn__lg">Open OfferWall</button>
                  </div>
                </div>
              </div>
            </splide-slide>
            <splide-slide>
              <div
                class="product mx-5"
                @click="
                  openUrl(`https://www.ayetstudios.com/offers/web_offerwall/2850?external_identifier=${username}`)
                "
              >
                <div class="product__img ayetstudios">
                  <img src="~assets/img/ayetstudios.png" />
                </div>
                <div class="product__box">
                  <h6 class="product__title mb-3">ayetstudios</h6>
                  <p>Complete free offers to earn free Robux <br>(~ 30 minutes)</p>
                  <div class="mt-4">
                    <button class="primary_btn primary_btn__lg">Open OfferWall</button>
                  </div>
                </div>
              </div>
            </splide-slide>
          </splide>
        </div>
        <div class="social">
          <Social />
        </div>
      </div>
    </section>
    <Footer />
  </div>
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
      username: this.$auth.user.username,
      options: {
        pagination: false,
        rewind: true,
        perPage: 1,
        gap: '15px',
        start: 1,
        padding: {
          right: '25px',
          left: '25px'
        }
      }
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
  },
  layout: 'homeLayout'
}
</script>

<style lang="scss" scoped>
$thetransition: all 0.4s cubic-bezier(1, 0.25, 0, 0.75) 0s;

.box {
  border-radius: 0;
}

.top-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 75%;
  }
  &__text {
    font-size: 24px;
  }

  &__sub-text {
    font-size: 14px;
    color: rgb(191, 191, 191);
  }

  &__red {
    background: linear-gradient(180deg, #f68059, #fb6432 142.14%);
    box-shadow: 0 2px 18px rgba(246, 128, 89, 0.4);
  }

  &__yellow {
    background: linear-gradient(180deg, #ffbf3a, #fb9536 142.14%);
    box-shadow: 0 2px 15px rgba(255, 191, 58, 0.4);
  }

  &__blue {
    background: linear-gradient(180deg, #459bff, #5f45ff 142.14%);
    box-shadow: 0 2px 18px rgba(69, 155, 255, 0.4);
  }

  &__green {
    background: linear-gradient(180deg, #11cd69, #34bf49 142.14%);
    box-shadow: 0 2px 25px rgba(17, 205, 105, 0.4);
  }
}

.product {
  transition: $thetransition;
  border-radius: 30px 30px 0px 30px;
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  padding: 0;
  text-align: center;
  background-color: #f3f7fe;
  &:hover {
    transform: translateY(-10px);
    cursor: pointer;
  }
  &__red {
    background-color: #f7f5fa;
  }
  &__blue {
    background-color: #edf9ff;
  }
  &__img {
    width: 100%;
    height: 100px;
  }
  &__title {
    font-size: 20px;
    font-weight: 500;
  }
  &__box {
    padding: 30px 30px;
  }
}

.adGate {
  width: 100%;
  background: rgb(47, 128, 237);
}

.adGem {
  background: rgb(115, 89, 165);
}
.ogads {
  background: rgb(26, 182, 255);
}

.adscend {
  background: rgb(14, 157, 207);
}

.offerToro {
  background: rgb(42, 48, 60);
}

.ayetstudios {
  background: rgb(242, 148, 0);
}
.secction.social {
  max-width: 90%;
  margin: 0 auto;
}

.follow-card {
  box-shadow: rgba(47, 128, 237, 0.22) 0px 13px 22px;
  border-radius: 4px;
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;
  background: #fff;
  &__h {
    font-size: 22px;
    font-weight: 600;
    line-height: 33px;
  }
  &__sub-h {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: center;
  }
  &__btn {
    background: #16cd69;
    border: 0;
    padding: 1.2rem 5rem;
    border-radius: 20px;
  }
}

.page-footer {
  &__text {
    font-size: 14px;
    color: #a0a0a0;
  }
}
@media only screen and (max-width: 777px) {
  .product,
  .follow-card {
    margin: 1.3rem 0 !important;
  }
}
@media only screen and (min-width: 1300px) {
  .title {
    font-size: 25px;
  }
  .subtext {
    font-size: 19px;
  }
  // .container {
  //   margin-left: 150px;
  // }
  .column:nth-child(1) {
    max-width: 90%;
  }
  .columns {
    max-width: 90%;
    margin: 0 auto;
  }
}
@media only screen and (min-width: 1900px) {
  .title {
    font-size: 25px;
  }
  .subtext {
    font-size: 19px;
  }
  .container {
    margin-left: 15rem;
  }
  .column:nth-child(1) {
    max-width: 100%;
  }
  .columns {
    max-width: 100%;
  }
}

@media screen and (max-width: 550px) {
  .section-title {
    h1 {
      margin-bottom: 0 !important;
    }
    p {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
