<template>
      <div class="columns">
        <div class="column box py-5 px-4 ml-2">
          <div class="is-flex is-align-items-center">
            <div class="top-img top-img__red">
              <img src="@/assets/img/pic-1.png" />
            </div>
            <div class="ml-5">
              <p class="has-text-weight-bold mb-0 top-img__text">
                R$: {{rbx}}
              </p>
              <p class="has-text-weight-bold mb-0 top-img__sub-text">
                {{username}}
              </p>
            </div>
          </div>
        </div>
        <div class="column box py-5 px-4 ml-2">
          <div class="is-flex is-align-items-center">
            <div class="top-img top-img__yellow">
              <img src="@/assets/img/pic-2.png" />
            </div>
            <div class="ml-5">
              <p class="has-text-weight-bold mb-0 top-img__text">
                23250
              </p>
              <p class="has-text-weight-bold mb-0 top-img__sub-text">
                Robux Stock
              </p>
            </div>
          </div>
        </div>
        <div class="column box py-5 px-4 ml-2">
          <div class="is-flex is-align-items-center">
            <div class="top-img top-img__blue">
              <img src="@/assets/img/pic-3.png" />
            </div>
            <div class="ml-5">
              <p class="has-text-weight-bold mb-0 top-img__text">
                229
              </p>
              <p class="has-text-weight-bold mb-0 top-img__sub-text">
                Online Now
              </p>
            </div>
          </div>
        </div>
        <div class="column box py-5 px-4 ml-2" style="height: 130px;">
          <div class="is-flex is-align-items-center">
            <div class="top-img top-img__green">
              <img src="@/assets/img/pic-4.png" />
            </div>
            <div class="ml-5">
              <p class="has-text-weight-bold mb-0 top-img__text">
                1486825
              </p>
              <p class="has-text-weight-bold mb-0 top-img__sub-text">
                Total R$ Paid
              </p>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'Earn',
  auth: true,
  middleware: ['auth'],
  layout: 'homeLayout',
  data () {
    return {
      username: this.$auth.user.username,
      rbx: this.$auth.user.rbx
    }
  }
}
</script>

<style lang="scss" scoped>
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
    background: linear-gradient(180deg,#f68059,#fb6432 142.14%);
    box-shadow: 0 2px 18px rgba(246,128,89,.4);
  }

  &__yellow {
    background: linear-gradient(180deg,#ffbf3a,#fb9536 142.14%);
    box-shadow: 0 2px 15px rgba(255,191,58,.4);
  }

  &__blue {
    background: linear-gradient(180deg,#459bff,#5f45ff 142.14%);
    box-shadow: 0 2px 18px rgba(69,155,255,.4);
  }

  &__green {
    background: linear-gradient(180deg,#11cd69,#34bf49 142.14%);
    box-shadow: 0 2px 25px rgba(17,205,105,.4);
  }
}
</style>
