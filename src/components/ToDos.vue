<template>
  <div class="hello">
      <ul class="list-group">
        <li class="list-group-item"
            v-for="(todo,index) in todos"
            v-bind:class="{'completed' : todo.completed}">
            <router-link :to="{ name: 'todo', params: { id: todo.id }}">{{todo.text}}</router-link>
            <button class="btn  btn-xs pull-right"
                  v-bind:class="[todo.completed ? 'btn-danger' : 'btn-success']"
                  v-on:click="toggleCompletion(todo)"
          >{{todo.completed? 'Done' : 'Do'}}
          </button>
          <button class="btn btn-warning btn-xs pull-right"
                  v-on:click="del(todo,index)"
          >DEL</button>
        </li>
      </ul>
      <ToForm/>
  </div>
</template>


<script>
  import ToForm from './ToForm';
export default {
    name:'ToDos',
    computed: {
        todos() {
            return this.$store.state.todos
        }
    },
    methods:{
        del(todo, index){
            this.$store.dispatch('deleteTodo', { todo, index })

        },
        toggleCompletion(todo){
            this.$store.dispatch('completeTodo', todo)
        }
    },
    components: {
       ToForm
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .completed{
    color:aquamarine;
    text-decoration: line-through;
  }
</style>
