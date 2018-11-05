<template>
  <el-button :class="[voteReady ? 'is-round': 'is-plain is-round' ]" type="success" @click="vote" >
    <svg-icon icon-class="thumbs-up-regular" />
    {{ votes }}
  </el-button>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CardVotes',
  props: {
    columnId: {
      required: true,
      type: Number
    },
    cardId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      voteReady: false
    }
  },
  computed: {
    ...mapState({
      votes(state) {
        const column = state.retroBoard.columns.find(c => c.id === this.columnId)
        var card = column.cards.find(c => c.id === this.cardId)
        if (card.votes) {
          return card.votes.length
        }
        return 0
      }
    }),
    background() {
      if (this.voteReady) {
        return 'plain'
      }
      return ' '
    }
  },
  methods: {
    ...mapActions(['voteCard', 'unvoteCard', 'GetUserInfo']),
    vote() {
      const column = this.$store.state.retroBoard.columns.find(c => c.id === this.columnId)
      const columnIndex = this.$store.state.retroBoard.columns.indexOf(column)
      const card = column.cards.find(c => c.id === this.cardId)
      const cardIndex = column.cards.indexOf(card)
      const userData = this.$store.state.user
      const cardVoteObject = {
        columnIndex: columnIndex,
        cardIndex: cardIndex,
        user: userData.name
      }
      if (!this.voteReady) {
        console.log('adding vote')
        this.voteCard(cardVoteObject)
      } else {
        console.log('removing vote')
        this.unvoteCard(cardVoteObject)
      }
      this.voteReady = !this.voteReady
    }
  }
}
</script>
