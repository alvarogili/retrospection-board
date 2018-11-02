<template>
  <el-button :disabled="voteReady" type="success" round plain @click="vote" >
    <svg-icon icon-class="thumbs-up-regular" />
    {{ votes }}
  </el-button>
</template>

<script>
import { mapState } from 'vuex'

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
        console.log('....')
        console.log(state)
        if (state.retroBoard.columns[this.columnId].cards) {
          var votes = state.retroBoard.columns[this.columnId].cards[0].votes
          if (votes) {
            return votes.length
          }
        }
        return 0
      }
    })
  },
  methods: {
    vote() {
      this.voteReady = !this.voteReady
    }
  }
}
</script>
