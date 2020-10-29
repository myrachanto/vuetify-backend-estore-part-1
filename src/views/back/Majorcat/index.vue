<template>
<back>
  <v-container>
    
<DataViewer :source="source" :headers="headers" :filters="filters" :create="create" :title="title" :show="show" :operators="operators"/>
  </v-container>

</back>
</template>
<script>
import back from '../../../layouts/back'
import DataViewer from '../../../components/DataViewer'
export default {
      name: 'CustomerIndex',
    components:{
        DataViewer,
        back,
        
    },
      data(){
          return{
              title:'Major category',
              source: '/api/majorcategory',
              create: '/majorcat/create',
              show: '/majorcat/',
              headers:[
                { text: 'Id', value: 'ID' },
                { text: 'Name', value: 'name' },
                { text: 'Title', value: 'title' },
                { text: 'Description', value: 'description' },
                { text: 'Actions', value: 'actions', sortable: false },
              ],
              filters:[
                  'ID', 'name', 'title', 'description'
              ],
              operators:['like']
              // operators:['equal_to','not_equal_to','less_than','greater_than','greater_than_or_equall_to','less_than_or_equal_to','in','not_in','like','between']
          }
      },
}
</script>

<style>

</style>