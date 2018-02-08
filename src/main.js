import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import App from './App'

// 1. 引入（路由）组件。
import ToDos from './components/ToDos'
import ToDo from './components/ToDo'


Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false

// 2. 定义路由
const routes = [
    { path: '/', component: ToDos },
    { path: '/todo/:id', component: ToDo, name:'todo' }
]
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})


const store = new Vuex.Store({
    state: {
        todos: [],
        newTodo:{ id: null,text:'',completed:false }
    },
    mutations: {
        getTodolist (state, todos) {
            state.todos = todos
        },
        complete_todo(state, todo) {
            todo.completed = !todo.completed
        },
        delete_todo(state, index){
            state.todos.splice(index, 1)
        },
        add_todo(state, todo){
            state.todos.push(todo)
        }
    },
    actions: {
        getTodos(store){
                Vue.axios.get('http://package.io/api/todos').then(response => {
                    store.commit('getTodolist', response.data);
            })
        },
        completeTodo(store, todo) {
            Vue.axios.patch('http://package.io/api/todo/'+ todo.id +'/completed').then(response=>{
                store.commit('complete_todo',todo);
            });
        },
        deleteTodo(store, { todo, index }){
            Vue.axios.delete('http://package.io/api/todo/'+ todo.id +'/delete').then(response=>{

                store.commit('delete_todo',index);
            });
        },
        addTodo(store, newTodo){
            if(newTodo.text !== '' && newTodo.text !== undefined){
                Vue.axios.post('http://package.io/api/todo/create',{text:newTodo.text}).then(response=>{
                    store.commit('add_todo', response.data)

                });
                store.state.newTodo = { id: null, text: '', completed:false };
            }else{
                layer.open({
                    content: '添加不能为空'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
            }
        }
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
    router
})
