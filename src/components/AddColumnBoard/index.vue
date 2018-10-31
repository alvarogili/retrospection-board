<template>
  <div>
    <div class="location-add-table-button">
      <el-button type="primary" @click="openPopup"><b>Add Column</b></el-button>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'AddColumnBoard',
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
      this.$prompt('Insert the name of the new column', 'New column', {
        confirmButtonText: 'Create',
        cancelButtonText: 'Cancel'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: 'Column ' + value + ' created'
        })
        console.log(value)
        this.addNewColumn(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'New column canceled.'
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
}
</style>
