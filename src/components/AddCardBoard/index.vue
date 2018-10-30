<template>
  <div>
    <br >
    hola {{ text }}
    <el-row>
      <el-button type="primary" @click="addNewCard"><b>{{ message }}</b></el-button>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'AddCardBoard',
  computed: {
    message() {
      return this.$t('retroBoard.addCard')
    },

    text() {
      return this.scene.children.id
    }
  },
  methods: {
    addNewCard() {
      this.$prompt(this.$t('retroBoard.cardDescription'), this.$t('retroBoard.addCard'), {
        confirmButtonText: this.$t('retroBoard.confirm'),
        cancelButtonText: this.$t('retroBoard.cancel'),
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*/,
        inputErrorMessage: this.$t('retroBoard.placeholder')
      }).then(({ value }) => {
        // this.$store.dispatch
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
    }
  }
}

</script>

<style scoped>
.el-row {
  text-align: center;
}
</style>
