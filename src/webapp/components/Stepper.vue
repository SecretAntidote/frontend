<template>
  <div>
    <ul class="steps">
      <li class="steps-segment" :class="step == 1 ? 'is-active' : ''">
        <span class="steps-marker">1</span>
      </li>
      <li class="steps-segment" :class="step == 2 ? 'is-active' : ''">
        <span class="steps-marker">2</span>
      </li>
      <li class="steps-segment " :class="step == 3 ? 'is-active' : ''">
        <span class="steps-marker">3</span>
      </li>
    </ul>
    <div class="content pt-6" style="height: 300px">
      <div v-if="step == 1">
        <div class="is-flex is-flex-direction-column is-justify-content-space-center is-align-items-center">
          <h6 class="title is-6">
            Select RBX Amount to withdraw
          </h6>
          <div class="dropdown" :class="isDropdownClicked ? 'is-active' : ''">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2" @click="isDropdownClicked = !isDropdownClicked">
                <span>Select RBX</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true" />
                </span>
              </button>
            </div>
            <div id="dropdown-menu2" class="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  5 Robux
                </div>
                <div class="dropdown-item">
                  10 Robux
                </div>
                <div class="dropdown-item">
                  20 Robux
                </div>
                <div class="dropdown-item">
                  30 Robux
                </div>
                <div class="dropdown-item">
                  50 Robux
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="step == 2">
        <div class="is-flex is-flex-direction-column is-justify-content-space-center is-align-items-center">
          <p style="text-align:center; font-weight: bold;">Click the "Open Group" button then join the group in roblox.<br>
We will send you the Rbx through the group so make sure you join using the Username you provided earlier</p>
          <button class="button is-medium is-fullwidth is-success mx-6 mt-6">
            Join the group
          </button>
        </div>
      </div>
      <div v-else-if="step == 3">
        <div class="is-flex is-flex-direction-column is-justify-content-space-center is-align-items-center">
          <button class="button is-medium is-success mx-6 mt-6" @click="confirmWithdraw">
            Confirm Withdraw
          </button>
          <h6 style="color:green; text-align:center;" v-if="isConfirmed" class="subtitle is-6 pt-6">
            Withdrawn was done with success! <br>Your Robux should be in your account in the next 5 minutes.
          </h6>
        </div>
      </div>
      <div />
    </div>
  </div>
</template>

<script>

export default {
  props: ['step'],
  data () {
    return {
      isDropdownClicked: false,
      isConfirmed: false
    }
  },
  methods: {
    confirmWithdraw () {
      this.isConfirmed = true
    }
  }
}
</script>
