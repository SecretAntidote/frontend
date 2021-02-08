<template>
  <section class="section">
    <div class="container">
      <Statistics />
      <div class="column mb-5">
        <h1 class="is-uppercase has-text-weight-bold subtitle mb-3">
          SHARE WITH FRIENDS
        </h1>
        <div class="columns">
          <div class="column is-two-thirds" style="height:400px">
            <div class="card">
              <div class="card-content">
                <p class="title is-4">
                  Let Your Friends Earn Robux For You
                </p>
                <p class="subtitle is-6 pt-3">
                  You earn 5% every time your friends earn Robux with RbxCloud. You get robux for every app they download, survey they complete, and Videos they watch. Sign them up now using Your referral link before somebody else does!
                </p>
                <div class="control has-icons-left">
                  <input
                    v-model="referralLink"
                    class="input is-large"
                    type="text"
                    readonly="readonly"
                    @click="copyToClipboard"
                  />
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
                  <button class="button is-medium is-success mx-6 is-rounded is-fullwidth has-icons-left is-justify-content-space-between" style="background-color:rgb(59, 89, 152)">
                    <span class="icon is-left">
                      <i class="fab fa-facebook-f" />
                    </span>
                    <span>Facebook</span>
                    <span />
                  </button><button class="button is-medium is-success mx-6 is-rounded mt-2 is-fullwidth has-icons-left is-justify-content-space-between" style="background-color:rgb(66, 156, 214)">
                    <span class="icon is-left">
                      <i class="fab fa-twitter" />
                    </span>
                    <span>Twitter</span>
                    <span />
                  </button>
                  <button class="button is-medium is-success mx-6 is-rounded mt-2 is-fullwidth has-icons-left is-justify-content-space-between" style="background-color:rgb(255, 69, 0)">
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
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Invites',
  layout: 'homeLayout',
  data () {
    return {
      referralLink: `${process.env.host}?ref=${this.$auth.user.username}`
    }
  },
  methods: {
    copyToClipboard () {
      navigator.clipboard.writeText(this.referralLink)
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  background: #f5f7fd;
  height: 100vh;
}
</style>
