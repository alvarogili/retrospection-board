<template>
  <div>
    <div class="location-add-table-button">
      <el-button type="primary" @click="openPopup"><b>{{ message }}</b></el-button>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'AddColumnBoard',
  computed: {
    message() {
      return this.$t('retroBoard.addColumn')
    }
  },
  methods: {
    ...mapActions(['addColmun']),

    addNewColumn(columnName) {
      console.log('add column')
      var size = this.$store.state.retroBoard.columns.length + 1
      var column = {
        id: size,
        name: columnName,
        cards: []
      }
      this.addColmun(column)
      console.log(this.$store.state.retroBoard.columns)
    },

    openPopup() {
      this.$prompt(this.$t('retroBoard.columnTitle'), this.$t('retroBoard.addColumn'), {
        confirmButtonText: this.$t('retroBoard.create'),
        cancelButtonText: this.$t('retroBoard.cancel')
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: this.$t('retroBoard.addColumnOK', { name: value })
        })
        console.log(value)
        this.addNewColumn(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('retroBoard.addColumnCanceled')
        })
      })
    }
  }
}

</script>

<style scoped=css>
.location-add-table-button {
  margin-left: 35px;
  margin-top: 13px;
  white-space: normal;
}
</style>
