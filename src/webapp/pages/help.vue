<template>
  <section>
    <div class="container">
      <Statistics />

      <div class="help-page mt-5 pt-2">
        <h2 class="is-size-5 title">HELP</h2>

        <!-- card -->
        <div class="card mb-3" :class="{'card-expanded': card.expanded}" v-for="(card, index) in cards" :key="index">
          <header class="card-header" @click="expanCard(card)">
            <p class="card-header-title has-text-weight-semibold">
              {{ card.title }}
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i
                  class="fas"
                  :class="{'fa-angle-down': !card.expanded, 'fa-angle-up': card.expanded}"
                  aria-hidden="true"
                ></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content p-4" v-html="card.description"></div>
          </div>
        </div>
        <!-- end card -->
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Statistics from '@/components/Statistics'
export default {
  name: 'Earn',
  layout: 'homeLayout',
  components: {
    Statistics
  },
  data() {
    return {
      cards: [
        {
          title: 'Is this site legit?',
          description:
            '<p>Yes, we have already paid more than 1000 R$ to our user. We do not ask for any sensitive information from you except for your Roblox name so we can send you your R$</p>',
          expanded: false
        },
        {
          title: 'How to earn robux?',
          description:
            '<p>You earn robux by completing offers and installing apps, then you withdraw them to your roblox account.</p>',
          expanded: false
        },
        {
          title: 'I submitted a Withdraw Order, when can i get my robux?',
          description:
            '<p>Usually you will receive your robux within the next couple of hours. but sometimes it may take up to 24 hours cause we have to restock.</p>',
          expanded: false
        },
        {
          title: 'I completed an offer but did not earn points',
          description:
            '<p>RbxWallet is the most reliable service to earn free robux! we provide multiple options to our users by letting them complete offers, watch videos, install apps and invite friends to get robux!</p>',
          expanded: false
        },
        {
          title: 'Can i earn Rbx without completing surveys or offers?',
          description:
            '<p>Absolutely! if you dont see any offers, you can invite your friends to use our website using your referral link. and you will earn robux whenever someone signs up using your link! We also provide daily giveaway and promo code to claim free R$</p>',
          expanded: false
        }
      ]
    }
  },
  methods: {
    expanCard(card) {
      if (card.expanded) {
        card.expanded = false
      } else {
        this.cards.forEach(card => {
          card.expanded = false
        })
        card.expanded = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  background: white;
  height: 100vh;
}
.help-page {
  .title {
    color: #a0a0a0;
  }
  .card {
    cursor: pointer;
    box-shadow: 0 0 5px rgba(gray, 0.1);
    background: #fcfcfc;
    .card-header {
      box-shadow: none;
      &-title {
        font-size: 14px;
      }
      &-icon {
        font-size: 30px;
        color: rgba(0, 0, 0, 0.54);
      }
    }
    .card-content {
      font-size: 14px;
      max-height: 0;
      overflow: hidden;
      padding: 0;
    }

    &.card-expanded {
      .card-content {
        max-height: 1000px;
        transition: max-height 1.3s linear;
      }
    }
  }
}
</style>
