<template>  
<back>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
                  <ValidationObserver
                    ref="observer"
                    v-slot="{}"
                  >
               <v-row class="fill-height">
                 
                 <v-col cols="12" md="12">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 teal--text text--accent-3">
                        New  category
                      </h1>
                      
                      <template >  
                                  <v-snackbar
                                  :timeout="timeout"
                                  v-model="snackbar"
                                  :value="true"
                                  absolute
                                  left
                                  shaped
                                  top
                                  dismisable
                                  color="red"
                                >
                              <h2>{{errs.error}}</h2>
                              <p>{{errs.message}}</p>
                                </v-snackbar>
                            
                          </template>
                        <v-form>
                                 <v-container>
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      md="6"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="name"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.name"
                                        :error-messages="errors"      
                                        label="Name"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="title"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.title"
                                        label="Title"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                      <v-row>
                                  <v-col
                                    class="d-flex"
                                    cols="12"
                                    sm="6"
                                  >
                                    <v-select
                                      :items="option"
                                      v-model="form.category"
                                      label="Category" 
                                      required
                                    ></v-select>
                                  </v-col>
                                  <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Price"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.price"
                                        label="Price"
                                        :error-messages="errors" 
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                   </v-row>
                                   <v-row>
                                    <v-col
                                      cols="12"
                                      md="12"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Description"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.description"
                                        label="Description"
                                        :error-messages="errors" 
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                  
                                </v-container>
                        
                      </v-form>
                      <!-- <h3 class="text-center mt-3">have an account with us </h3> -->
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn class="ma-3" dark @click="Back()">Back</v-btn>
                      <v-btn class="ma-3" color="teal accent-3" @click="save">Save</v-btn>
                    </div>
                    </v-col>
               </v-row>
                  </ValidationObserver>
              
          </v-card>
        </v-col>
      </v-row>
    </v-container>

</back>
</template>

<script>
 import axios from '../../../axios'

import back from '../../../layouts/back'
  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
 setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

export default {
  name: "login",
  components: {
      ValidationProvider,
      ValidationObserver,
      back
    },
  data(){
    return{
        form:{
            name:'',
            title:'',
            description:'',
            category:'',
            majorcategory:'',
            price:0
        },
        majorcats:[],
        errs:{},
        option:[],
        title:'Create',
        init:'api/products/view',
        redirect: '/products',
        store: 'api/products',
        method: 'post',
        snackbar:false,
        timeout:3000
    }
  },
  created(){
      this.fetchData()
  },
  methods:{
    Back(){
      this.$router.push(this.redirect)
    },
    View(id){
      this.$router.push(`${this.redirect}/show/${id }`)
    } ,
   async save(){
          try{
            console.log(this.form.ID)
            const {data} = await axios.put(`${this.store}/${this.$route.params.id}`, {
                    name: this.form.name,
                    title: this.form.title,
                    description: this.form.description,
                    category: this.form.category,
                    price: this.form.price
                })
                if(data){
                this.$router.push(this.redirect)
                }
        }catch(err){
            this.snackbar = true
            this.errs = err.response.data

        }

  },
  async fetchData(){
        try{
            const {data} = await axios.get(`${this.store}/${this.$route.params.id}`)
            

            if(data){
            this.form = data
            this.GetData()
            }
          }catch(err){
          this.snackbar = true
          //   console.log(err)
          this.errs = err.response.data
          } 
      },
      async GetData(){
        try{
            // console.log(token)
           const {data} = await axios.get(`${this.init}`)
            // this.option = data
            console.log(data)
            this.majorcats = data.majorcategory
            const op = data.map(d => {
              return d.name
            })
            this.option = op
        }catch(err){
           console.log(err)
        }
    } 
    },    
  }
</script>

<style>

</style>