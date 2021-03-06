

//componente de tarea indiviual
Vue.component('tarea',{
 
    props:['tarea'],
    template:` <li :class="classes"> 
    <div class="view">

    <input type="checkbox" class="toggle" v-model="tarea.complete" />


    <label  v-text="tarea.title" v-on:dblclick="edit()" ></label>
    <button class="destroy" @click="remove()" > </button >
    </div>
 
    <input class="edit"  v-model="tarea.title"
     @keyup.enter="finEditar()"  
     @blur="finEditar()"
    @keyup.esc="cancelarEdicion()"  
      />

    </li>`,
    data: function(){
        return{
            editando:false,
            guardarAntesEditar:''
        }

    },
    methods:{
        //Editar tarea
        edit:  function(){

           this.guardarAntesEditar= this.tarea.title;
           this.editando=true;

        },

        finEditar: function () 
        {
            
            if(! this.tarea.title){ 

                this.remove();

            }

            this.editando=false;

        },
        cancelarEdicion:function(){
            this.editando=false;
            this.tarea.title=this.guardarAntesEditar;
        },

        remove: function(){
            //tareas
      var tareas= this.$parent.tareas;
      tareas.splice(tareas.indexOf(this.tarea),1)

        }

    },
    computed:{
        classes: function(){
            return { completed: this.tarea.complete,editing: this.editando} 
        }
   
    }

});


Vue.component('tareas',{
            template:`  <section class="todoapp">  
            <header class="header">
            <h1>  Tareas</h1>
    
            <input type="text"   v-model="newTarea"  v-on:keyup.enter="addTareas" class="new-todo" placeholder="+ Nueva tarea">
            </header>
   
        <section class="todo-list">
            <ul>
            <li is="tarea" class="todo" v-for="tarea in tareas" :tarea="tarea" > </li>


       
            </ul>
            </section>
            <footer class="footer" v-show="tareas.length">
            <span class="todo-count"> Completadas: {{ tareasCompletadas  }} </span>
            <span class="todo-count">  | Por hacer:  {{ tareasIncompletas }} </span>
            </footer>
            </section>`,
            data:function(){
           return { 
           
                    newTarea:"",
                    message:"",
                     tareas:[
                         {title:"Laravel",complete:true},  
                         {title:"Node.js",complete:true},  
                         {title:"Vue.js",complete:true}
                     ]
                     
             
                

                    }   },

                    computed:{
                        //contar tareas agregadas
                        tareasCompletadas:function(){
                         return   this.tareas.filter(function(tarea){
                               return tarea.complete;
                      
                            }).length;

                           },
                           tareasIncompletas:function(){
                            return   this.tareas.filter(function(tarea){
                                  return ! tarea.complete;
                         
                               }).length;
   
                              }
                         
                      
                    },
                    methods:
                    {

                      
                          //agregar tareas
                           addTareas:function(){
                
                               if(this.newTarea.length <=1) return;
                             this.tareas.push({
                                 title:this.newTarea,
                                 complete:false
                             })  
                
                             this.newTarea="";    
                           }
                        },
                         reverse:function(){
                           this.message = this.message.split('').reverse().join('')
                           }
                          
                    
})


var app = new Vue({
    el:'#app'

 
})