<template>
  <div>
    <br >
    <el-row>
      <el-button type="primary" @click="openPopUp"><b>{{ message }}</b></el-button>
    </el-row>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'AddCardBoard',

  props: {
    columnId: {
      required: true,
      type: Number
    }
  },
  computed: {
    message() {
      return this.$t('retroBoard.addCard')
    }
  },
  methods: {
    ...mapActions(['addCard']),
    openPopUp() {
      this.$prompt(this.$t('retroBoard.cardDescription'), this.$t('retroBoard.addCard'), {
        confirmButtonText: this.$t('retroBoard.confirm'),
        cancelButtonText: this.$t('retroBoard.cancel'),
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*/,
        inputErrorMessage: this.$t('retroBoard.placeholder')
      }).then(({ value }) => {
        console.log(value)
        this.addNewCard(value)
        this.$message({
          type: 'success',
          message: this.$t('retroBoard.addedOk')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('retroBoard.addedCancel')
        })
      })
    },
    addNewCard(cardDesc) {
      console.log('add card to column with id=' + this.columnId)
      var size = this.$store.state.retroBoard.columns[this.columnId - 1].cards.length + 1
      console.log(size)
      var newCard = {
        id: size,
        description: cardDesc,
        votes: 0
      }
      console.log(newCard)

      var cardObject = {
        columnId: this.columnId,
        card: newCard
      }
      console.log(cardObject)

      this.addCard(cardObject)
      console.log(this.$store.state.retroBoard.columns)
    }
  }
}

</script>

<style scoped>
.el-row {
  text-align: center;
}
</style>
