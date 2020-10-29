<template>
<v-container>
  <v-row>
<v-col offset-sm="1" cols="11">
    <v-toolbar
    >
<v-toolbar-title>{{title}}</v-toolbar-title>
<v-spacer></v-spacer>

      <v-btn :to="create">
        Create
      </v-btn>

      <v-btn >
        Pdf
      </v-btn>

      <v-btn >
        Excel
      </v-btn>
    </v-toolbar>
    <template>
  <v-expansion-panels>
    <v-expansion-panel
    >
      <v-expansion-panel-header>
        filter
      </v-expansion-panel-header>
      <v-expansion-panel-content>
      <v-row>
        <v-col
          cols="12"
          md="2">
           <v-select
          :items="filters"
          label="Search column"
          v-model="params.search_column"
          outlined
        ></v-select>
        </v-col>
        <v-col
          cols="12"
          md="4">
           <v-select
          :items="operators"
          label="Search Operator"
          v-model="params.search_operator"
          outlined
        ></v-select>
        </v-col>
        <v-col
          cols="12"
          md="2"
        >
          <v-text-field
            v-model="params.search_query_1"
            label="Search query"
            required
            @keyup.enter="GetData"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="2" v-if="params.search_operator === 'between'">
          <v-text-field
            v-model="params.search_query_2"
            label="Search query 2"
            @keyup.enter="GetData"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="2"
        >
         <v-btn class="ma-2" 
      depressed
      color="success"
      @click="GetData"
    >
      Search
    </v-btn>
         <v-btn class="ma-2" 
      depressed
      color="primary"
      @click="resetFilter"
    >
      Reset
    </v-btn>
        </v-col>
      </v-row></v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </template>

          <v-data-table
            :headers="headers"
            :items="items"
            item-key="name"
            class="elevation-1 display-2"
            style="font-size:10rem"
          :footer-props="{
              'items-per-page-options': [5,10, 20, 30, 40, 50]
            }"
          :items-per-page="10"
          >
          <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="View(item.ID)"
              >
                mdi-eye
              </v-icon>
              <v-icon
                small
                @click="Edit(item.ID)"
              >
                mdi-pencil
              </v-icon>
            </template>
            
          </v-data-table>
</v-col>
  </v-row></v-container>
</template>
<script>
 import axios from '../axios'
  export default {
    
    props: ['source', 'headers', 'filters', 'create', 'title','show','operators'],
    data(){
        return{
            items:[],
            showFilter: false,
            params:{ 
                column: 'ID',
                direction: 'desc',
                itemsPerPage:10,
                page:1,
                search_column: 'id',
                search_operator: 'like',
                search_query_1:'all',
                search_query_2: ''
            },
               
        }
    },
    created(){
          this.GetData()
       },
    methods:{
        resetFilter(){
            this.params.column = 'ID',
            this.params.direction = 'desc',
            this.params.itemsPerPage=10,
            this.params.page=1,
            this.params.search_column= 'id',
            this.params.search_operator= 'greater_than',
            this.params.search_query_1=0,
            this.params.search_query_2=''
            this.GetData()
        },
       async GetData(){
        try{
          let p = this.params
            // console.log(token)
           const {data} = await axios.get(`${this.source}?column=${p.column}&direction=${p.direction}&per_page=${p.itemsPerPage}&page=${p.page}&search_column=${p.search_column}&search_operator=${p.search_operator}&search_query_1=${p.search_query_1}&search_query_2=${p.search_query_2}`)
            this.items = data  

            // console.log(data)
        }catch(err){
           console.log(err)
        }
    },  
    
    View(id){

      this.$router.push(`${this.show}show/${id }`)
    } ,

    Edit(id){
      this.$router.push(`${this.show}${id}/edit`)
    } ,
    }
  }
</script>
<style>

</style>