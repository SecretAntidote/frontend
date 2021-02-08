<template>
  <section class="section">
        <div class="container">
      <Statistics />
    </div>
    <div  class="container">
      <div class="column mb-5">
        <h1 class="is-uppercase has-text-weight-bold subtitle mb-3">
          WITHDRAW ROBUX
        </h1>
        <div class="card">
          <div class="card-content">
            <Stepper :step="step" />
            <div class="is-flex is-justify-content-space-between">
              <button class="button" :disabled="step == 1" @click="step--">
                PREVIOUS
              </button>
              <button class="button" :disabled="step == 3" @click="step++">
                NEXT
              </button>
            </div>
          </div>
        </div>
        <h1 class="is-uppercase has-text-weight-bold subtitle mb-3 pt-6">
          WITHDRAW HISTORY
        </h1>
        <div class="card" style="height: 200px">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th><abbr title="ID">ID</abbr></th>
                <th><abbr title="Username">Username</abbr></th>
                <th><abbr title="Amount">Amount</abbr></th>
                <th><abbr title="Date">Date</abbr></th>
                <th><abbr title="Status">Status</abbr></th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Stepper from '@/components/Stepper'
export default {
  name: 'Withdraw',
  layout: 'homeLayout',
  components: {
    Stepper
  },
  data () {
    return {
      step: 1

    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  background: #f5f7fd;
  height: 100%;
}

abbr {
  text-decoration: none;
}
</style>
