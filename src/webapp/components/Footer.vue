<template>
  <footer class="page-footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <p class="page-footer__text mb-0">&copy;2021 - <span>RbxWallet</span></p>
          <p class="is-size-7 .has-text-weight-thin" style="color: #a0a0a0">
            We are not affiliated with any of the games or companies shown on this website. Use of any logos or
            trademarks are for reference purposes only. By utilizing the website, you agree to be bound by the terms of
            service.
          </p>
        </div>
        <div class="column">
          <div class="has-text-right-desktop">
            <ul class="link">
              <li>
                <nuxt-link to="/" class="is-size-7 text_black"> Privacy Policy </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/" class="is-size-7 text_black"> Terms of Service </nuxt-link>
              </li>
            </ul>
          </div>
          <!-- <p class="is-size-6 has-text-right-desktop">Privacy Policy - Terms of Service</p> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  border-top: 1px solid #d0d0d0;
  padding: 30px 15px;
  margin-top: 53px;
}
.page-footer__text {
  color: #666666;
}
@media screen and (max-width: 550px) {
  .link {
    display: flex;
    li {
      margin-left: 10px;
      a {
        color: #666 !important;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
