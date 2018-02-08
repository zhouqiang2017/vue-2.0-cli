<template>
  <form v-on:submit.prevent="addTodo(newTodo)">
    <div class="from-group">
      <input type="text"
             v-model="newTodo.text"
             class="form-control"
             placeholder="Add a new todo">
    </div>
    <br>
    <div class="form-group">
      <button class="btn btn-success btn-block" type="submit">Add Todos</button>
    </div>
  </form>
</template>
<script>
export default {
  computed:{
        newTodo(){
            return this.$store.state.newTodo
        }
  },
  methods:{
        addTodo(newTodo){
            this.$store.dispatch('addTodo', newTodo)
        },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
