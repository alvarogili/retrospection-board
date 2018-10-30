<template>
  <div>
    <el-row>
      <el-button type="primary" @click="openPopup"><b>Add Column</b></el-button>
    </el-row>
  </div>
</template>

<script>

import store from '@/store'

export default {
  name: 'addColumnBoard',
  methods: {
    addNewColumn(columnName) {
      console.log('add column')
      console.log(this.$store.state.retroBoard.columns)
      this.$store.dispatch('addColmun',columnName)
      console.log(this.$store.state.retroBoard.columns)
    },

    openPopup() {
      this.$prompt('Insert the name of the new column', 'New column', {
        confirmButtonText: 'Create',
        cancelButtonText: 'Cancel',
      }).then(({ columnName }) => {
        this.$message({
          type: 'success',
          message: 'Column '+columnName+' created'
        }),
        this.addNewColumn(columnName);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'New column canceled.'
        });       
      });
    }
  }
}

</script>
