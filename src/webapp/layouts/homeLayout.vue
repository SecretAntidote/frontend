<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar px-5 is-flex is-align-items-center" style="height: 85px;" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="~assets/img/rbx.png" width="100" height="28">
        </a>

        <a role="button" class="navbar-burger" @click.prevent="showSideBar">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div class="navbar-menu is-hidden-touch">
        <div class="is-flex mx-auto">
          <nuxt-link to="/earn" class="navbar-item is-flex is-align-items-center is-capitalized" :class="$route.fullPath == '/earn' ? 'is-active' : 'custom-link'">
            <i class="fa fa-home mr-4 is-size-4" />
            <span class="is-active__text has-text-weight-bold">earn robux</span>
          </nuxt-link>
          <nuxt-link to="/withdraw" class="navbar-item is-flex is-align-items-center is-capitalized" :class="$route.fullPath == '/withdraw' ? 'is-active' : 'custom-link'">
            <i class="fa fa-money mr-4 is-size-4" aria-hidden="true" />
            <span class="custom-link__text has-text-weight-bold">Withdraw</span>
          </nuxt-link>
          <nuxt-link to="/invites" class="navbar-item is-flex is-align-items-center is-capitalized" :class="$route.fullPath == '/invites' ? 'is-active' : 'custom-link'">
            <i class="fas fa-bullhorn mr-4 is-size-4" aria-hidden="true" />
            <span class="custom-link__text has-text-weight-bold">invite friends</span>
          </nuxt-link>
          <nuxt-link to="/promos" class="navbar-item is-flex is-align-items-center is-capitalized" :class="$route.fullPath == '/promos' ? 'is-active' : 'custom-link'">
            <i class="fas fa-user mr-4 is-size-4" aria-hidden="true" />
            <span class="custom-link__text has-text-weight-bold">promo code</span>
          </nuxt-link>
          <nuxt-link to="/help" class="navbar-item is-flex is-align-items-center is-capitalized" :class="$route.fullPath == '/help' ? 'is-active' : 'custom-link'">
            <i class="fa fa-question-circle mr-4 is-size-4" aria-hidden="true" />
            <span class="custom-link__text has-text-weight-bold">help</span>
          </nuxt-link>
        </div>

        <div>
          <div class="navbar-item">
            <div class="buttons">
              <a @click="logout" class="logout-link is-flex is-align-items-center">
                <i class="fas fa-sign-out-alt is-size-4 mr-4" />
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Sidebar -->
    <div class="sidebar box has-text-right pl-0" :style="`left: ${left}`">
      <button class="button is-success is-small has-text-right mb-5" @click.prevent="hideSideBar">
        <i class="fa fa-times is-size-6" aria-hidden="true" />
      </button>
      <nuxt-link to="/earn" class="column is-side-active">
        <i class="fa fa-home ml-4 mr-5 is-size-5" />
        <span class="is-side-active__text is-capitalized">earn robux</span>
      </nuxt-link>
      <nuxt-link to="/withdraw" class="column sidebar-link">
        <i class="fa fa-money ml-4 mr-5 is-size-5" aria-hidden="true" />
        <span class="sidebar-link__text">Withdraw</span>
      </nuxt-link>
      <nuxt-link to="/invites" class="column sidebar-link">
        <i class="fas fa-bullhorn ml-4 mr-5 is-size-5" aria-hidden="true" />
        <span class="sidebar-link__text">invite friends</span>
      </nuxt-link>
      <nuxt-link to="/promos" class="column sidebar-link" style="margin-bottom: 140%;">
        <i class="fas fa-user ml-4 mr-5 is-size-5" aria-hidden="true" />
        <span class="sidebar-link__text">promo code</span>
      </nuxt-link>
      <nuxt-link to="/help" class="column sidebar-link">
        <i class="fas fa-question-circle ml-4 mr-5 is-size-5" aria-hidden="true" />
        <span class="sidebar-link__text">help</span>
      </nuxt-link>
      <div @click="logout" class="column sidebar-logout-link">
        <i class="fas fa-sign-out-alt ml-4 mr-5 is-size-5" aria-hidden="true" />
        <span class="sidebar-logout-link__text">Logout</span>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'HomeLayout',
  data () {
    return {
      left: '-50%'
    }
  },
  methods: {
    showSideBar () {
      this.left = '0'
    },
    hideSideBar () {
      this.left = '-50%'
    },
    logout () {
      this.$auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
$thetransition: all 0.4s cubic-bezier(1, 0.25, 0, 0.75) 0s;

.mx-auto {
  margin-right: auto;
  margin-left: auto;
}

.custom-link {
  padding: 1.85rem 1rem;
  color: #a0a0a0;
  &__text {
    font-size: 14px;
  }
}

.is-active {
  padding: 1.85rem 1rem;
  color: #16cd69 !important;
  border-bottom: 3px solid #16cd69;
  &__text {
    font-size: 14px;
  }
}

.logout-link {
  padding: 1.85rem;
  color: #fd4c4c;
}

.sidebar {
  background: #fff;
  border-radius: 0;
  height: 100%;
  width: 230px;
  position: fixed;
  top: 0;
  z-index: 9999;
  transition: $thetransition;

  .is-side-active {
    display: flex;
    align-items: center;
    color: #16cd69;
    border-left: 3px solid #16cd69;
    height: 48px;
    &__text {
      font-size: 14px;
      color: #a0a0a0;
    }
  }
  .sidebar-link {
    display: flex;
    align-items: center;
    color: #c9c9c9;
    height: 48px;
    &__text {
      font-size: 14px;
      color: #a0a0a0;
    }
  }
  .sidebar-logout-link {
    display: flex;
    align-items: center;
    color: #fd4c4c;
    height: 48px;
    &__text {
      font-size: 14px;
      color: #fd4c4c;
    }
  }
}
</style>
