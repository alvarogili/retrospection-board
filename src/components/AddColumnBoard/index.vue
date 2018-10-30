<template>
  <div>
    <el-row>
      <el-button type="primary" @click="addNewColumn"><b><font size="+1" >+</font></b></el-button>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'addColumnBoard',
  methods: {
    addNewColumn() {
      console.log('add column')
      console.log(this.$store.state.retroBoard)
    }
  }
}

</script>
