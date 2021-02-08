<template>
  <div>
    <section class="section p-0">
      <div class="container">
        <div class="column pb-0">
          <div class="section-title">
            <h1 class="title title__36 text_black mb-3 has-text-weight-thin">
              Invite your friends,<br />
              <span class="title__subtitle has-text-weight-thin">{{ username }}</span>
            </h1>
          </div>
          <div class="section pb-0">
            <div class="columns">
              <div class="column is-three-fifths is-offset-one-fifth">
                <div class="dollar_box">
                  <div class="dollar_box__img">
                    <img src="~/assets/img/dollar.png" alt="" />
                  </div>
                  <h1 class="title title__30 text_white has-text-weight-ex-bold mb-3">Refer and Earn</h1>
                  <p class="subtext text_white">Earn 5% of every Robux your invited friends earn</p>
                </div>
              </div>
            </div>
          </div>
          <div class="section pb-0">
            <div class="columns">
              <div class="column px-5">
                <div class="column_box referel">
                  <div class="copy_url">
                    <img src="~/assets/img/icon.png" class="small_img" alt="" />
                    <input v-model="referralLink" class="input is-large" type="text" readonly="readonly" />
                    <button class="primary_btn" @click="copyToClipboard">Copy</button>
                  </div>
                  <div class="referel-inner">
                    <img class="overlay" src="~/assets/img/transparent-left.png" alt="" />

                    <h6 class="title title__30 mb-3">Referral code 📣</h6>
                    <p>Also refer using the social links below</p>
                    <div class="padding_top_30">
                      <ul class="social_img_icon">
                        <li>
                          <nuxt-link to="https://www.facebook.com/">
                            <img src="~/assets/img/facebook-icon.png" alt="" />
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="https://twitter.com/">
                            <img src="~/assets/img/twitter-icon.png" alt="" />
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="https://www.reddit.com/">
                            <img src="~/assets/img/print.png" alt="" />
                          </nuxt-link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="columns">
          <div class="column is-two-thirds" style="height:400px">
            <div class="card">
              <div class="card-content">
                <p class="title is-4">
                  Let Your Friends Earn Robux For You
                </p>
                <p class="subtitle is-6 pt-3">
                  You earn 5% every time your friends earn Robux with RbxCloud. You get robux for every app they
                  download, survey they complete, and Videos they watch. Sign them up now using Your referral link
                  before somebody else does!
                </p>
                <div class="control has-icons-left">
                  <span class="icon is-left is-success">
                    <i class="fas fa-link" />
                  </span>
                </div>
                <div class="pt-2">
                  <span>Click on link to copy</span>
                </div>
              </div>
            </div>
          </div>
          <div class="column" style="height:400px">
            <div class="card">
              <div class="card-content">
                <p class="title is-4">
                  Share with your friends
                </p>
                <div class="is-flex is-flex-direction-column is-align-items-center">
                  <button
                    class="button is-medium is-success mx-6 is-rounded is-fullwidth has-icons-left is-justify-content-space-between"
                    style="background-color:rgb(59, 89, 152)"
                  >
                    <span class="icon is-left">
                      <i class="fab fa-facebook-f" />
                    </span>
                    <span>Facebook</span>
                    <span /></button
                  ><button
                    class="button is-medium is-success mx-6 is-rounded mt-2 is-fullwidth has-icons-left is-justify-content-space-between"
                    style="background-color:rgb(66, 156, 214)"
                  >
                    <span class="icon is-left">
                      <i class="fab fa-twitter" />
                    </span>
                    <span>Twitter</span>
                    <span />
                  </button>
                  <button
                    class="button is-medium is-success mx-6 is-rounded mt-2 is-fullwidth has-icons-left is-justify-content-space-between"
                    style="background-color:rgb(255, 69, 0)"
                  >
                    <span class="icon is-left">
                      <i class="fab fa-reddit" />
                    </span>
                    <span>Reddit</span>
                    <span />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        </div>
      </div>
    </section>
    <div class="section social">
      <Social />
    </div>
    <Footer />
  </div>
</template>
<script>
export default {
  name: 'Invites',
  layout: 'homeLayout',
  data() {
    return {
      referralLink: `${process.env.host}?ref=${this.$auth.user.username}`,
      username: this.$auth.user.username
    }
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.referralLink)
    }
  }
}
</script>
<style lang="scss" scoped>
.dollar_box {
  background: #97c1e5;
  border-radius: 30px 30px 0 30px;
  position: relative;
  padding: 45px 50px 45px 43%;
  box-shadow: 0 2px 18px rgba(69, 155, 255, 0.4);
}
.secction.social {
  max-width: 90%;
  margin: 0 auto;
}
.dollar_box img {
  max-width: 300px;
  position: absolute;
  top: -160px;
  left: -50px;
}
.social_img_icon {
  li {
    display: flex;
    a {
      display: block;
      height: 70px;
      width: 70px;
    }
  }
}
.social_img {
  position: unset;
  max-width: 100%;
}
.copy_url {
  margin: 0 auto;
  max-width: 50%;
  display: flex;
  position: absolute;
  min-width: 700px;
  top: -20px;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 60px;
  overflow: hidden;
  padding: 5px 0px 0px 10px;
  transform: translateY(-56px);
}
.copy_url input {
  border: 0;
  padding: 0;
  height: 33px;
  font-size: 20px;
  color: #666666;
}
.small_img {
  position: unset;
  width: 60px;
  margin-right: 10px;
}
.copy_url .primary_btn {
  min-width: 160px;
}
.social_img_icon img {
  position: initial;
}
.social_img_icon li {
  display: inline-block;
  margin: 0 33px;
}

.social_img_icon {
  z-index: 1;
  position: relative;
}

@media screen and (max-width: 550px) {
  h1 {
    font-size: 30px;
    line-height: 30px;
    font-weight: 700;
  }
  p {
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
  }
  .section {
    padding: 3rem 0.5rem;
    margin: 0;
    &-title {
      margin: 20px 0;
      padding-bottom: 30px;
      h1 {
        font-weight: 600 !important;
        font-size: 30px;
        line-height: 40px;
        span {
          font-size: 30px;
          font-weight: 600 !important;
        }
      }
    }
  }
  .dollar_box {
    padding: 36px;
    text-align: center;
    &__img {
      position: absolute;
      width: 123px;
      height: 123px;
      left: 50%;
      transform: translate(-9%, 10%);

      img {
        max-width: 100%;
        object-fit: contain;
      }
    }
  }
  .referel {
    background-color: #fff;
    .copy_url {
      position: relative;
      max-width: 100%;
      top: 0;
      left: 0;
      min-width: auto;
      border: 1px solid #ededed;
      padding: 0 0 0 10px;
      border-radius: 30px 30px 0px 30px !important;
      transform: translateY(0);
      .small_img {
        position: unset;
        width: 22px;
        margin-right: 10px;
        height: 26px;
      }
      input {
        font-size: 14px;
        line-height: 21px;
      }
      button {
        width: 77px;
        min-width: auto;
        height: 39px;
        left: 270px;
      }
    }
    .px-5 {
      padding: 0 !important;
    }
    &-inner {
      margin: 30px 0;
      background-color: #f5ffe5;
      padding: 20px 10px 40px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: block;
      overflow: hidden;
      position: relative;
      border-bottom-left-radius: 30px;
      .overlay {
        position: absolute;
        height: 100%;
        left: 0;
        bottom: -15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      h6 {
        font-size: 22px;
        font-weight: 400;
        line-height: 30px;
      }
      p {
        font-size: 14px;
        line-height: 21px;
        width: 190px;
        margin: auto;
      }
      .social_img_icon {
        display: flex;
        justify-content: center;
        li {
          margin: 0 10px;
          a {
            width: 30px;
            height: 30px;
            display: block;
            img {
              width: 100%;
              height: 100%;
              object-fit: fill;
            }
          }
        }
      }
    }
  }
}
</style>
