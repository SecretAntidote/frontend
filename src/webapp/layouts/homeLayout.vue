<template>
  <div>
    <!-- Navbar -->
    <nav
      class="navbar px-5 is-flex is-align-items-center"
      style="height: 75px; border-bottom: 1px solid #bdbdbd"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="logout" @click.prevent="logout">
          <img src="~assets/img/logout.svg" alt="log out" />
        </a>
        <a class="navbar-item" href="#">
          <img src="~assets/img/logo.png" width="100" height="28" />
        </a>

        <a role="button" class="navbar-burger" @click.prevent="showSideBar">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div class="navbar-menu is-hidden-touch">
        <div class="is-flex mx-auto">
          <nuxt-link
            to="/earn"
            class="navbar-item is-flex is-align-items-center is-capitalized"
            :class="$route.fullPath == '/earn' ? 'is-active' : 'custom-link'"
          >
            <span class="is-active__text">earn robux</span>
          </nuxt-link>
          <nuxt-link
            to="/withdraw"
            class="navbar-item is-flex is-align-items-center is-capitalized"
            :class="$route.fullPath == '/withdraw' ? 'is-active' : 'custom-link'"
          >
            <span class="custom-link__text">Withdraw</span>
          </nuxt-link>
          <nuxt-link
            to="/invites"
            class="navbar-item is-flex is-align-items-center is-capitalized"
            :class="$route.fullPath == '/invites' ? 'is-active' : 'custom-link'"
          >
            <span class="custom-link__text">invite friends</span>
          </nuxt-link>
          <nuxt-link
            to="/promos"
            class="navbar-item is-flex is-align-items-center is-capitalized"
            :class="$route.fullPath == '/promos' ? 'is-active' : 'custom-link'"
          >
            <span class="custom-link__text">promo </span>
          </nuxt-link>
          <nuxt-link
            to="/help"
            class="navbar-item is-flex is-align-items-center is-capitalized"
            :class="$route.fullPath == '/help' ? 'is-active' : 'custom-link'"
          >
            <span class="custom-link__text">help</span>
          </nuxt-link>
        </div>

        <div class="navbar-item">
          <div class="buttons">
            <a class="logout-link is-flex is-align-items-center primary_btn" @click="logout">
              <!-- <i class="fas fa-sign-out-alt is-size-4 mr-4" /> -->
              Log out
            </a>
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
      <nuxt-link to="/promos" class="column sidebar-link" style="margin-bottom: 140%">
        <i class="fas fa-user ml-4 mr-5 is-size-5" aria-hidden="true" />
        <span class="sidebar-link__text">promo </span>
      </nuxt-link>
      <nuxt-link to="/help" class="column sidebar-link">
        <i class="fas fa-question-circle ml-4 mr-5 is-size-5" aria-hidden="true" />
        <span class="sidebar-link__text">help</span>
      </nuxt-link>
      <div class="column sidebar-logout-link" @click="logout">
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
  data() {
    return {
      left: '-100%'
    }
  },
  methods: {
    showSideBar() {
      this.left = '0'
    },
    hideSideBar() {
      this.left = '-100%'
    },
    logout() {
      this.$auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
$thetransition: all 0.4s cubic-bezier(1, 0.25, 0, 0.75) 0s;
.logout {
  display: none;
}
.mx-auto {
  margin-right: auto;
  margin-left: auto;
}

.custom-link {
  position: relative;
  padding: 1.85rem 2.2rem;
  color: #000;
  &__text {
    font-size: 18px;
  }
}

.is-active {
  padding: 1.85rem 2.2rem;
  color: #ff92a3 !important;
  //border-bottom: 3px solid #16cd69;
  &__text {
    font-size: 18px;
  }
}
.navbar-item.is-active:after {
  content: '';
  width: 5px;
  height: 5px;
  background: #ff92a3;
  position: absolute;
  border-radius: 100%;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
}
.navbar-item:hover,
.navbar-item:focus,
.navbar-item:active {
  background-color: transparent !important;
  color: #ff92a3 !important;
}
// .logout-link {
//   padding: 0;
//   // color: #fd4c4c;
// }

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

@media screen and (max-width: 550px) {
  .navbar {
    &-brand {
      flex-flow: row-reverse;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      a {
        margin: 0 !important;
        display: block;
      }
    }
  }
}
</style>
