<template>
  <q-page class="q-ml-md q-mr-md">
    <div class="text-h6 text-accent q-ml-md q-mt-md" style="width: 100%;">
      Edit Order
    </div>

    <div class="q-ml-md q-mt-md" style="max-width: 100%;">

      <q-input v-model="order_title" label="Enter the Order Title" style="max-width: 400px;" />

      <q-input v-model="order_language" label="Language (e.g. python)" style="max-width: 400px;"/>

      <q-input v-model="order_budget" label="Budget (Ksh)" type="number" style="max-width: 400px;"/>

      <q-select v-model="order_sender" :options="senders" label="Select Sender" style="max-width: 400px;"/>

      <div class="q-mt-md text-accent" style="font-size: 18px">
        Select Due date
      </div>

      <div class="row items-start">
        <q-date v-model="due_date" mask="YYYY-MM-DD HH:mm" class="q-mr-md" color="purple" />
        <q-time v-model="due_time" mask="YYYY-MM-DD HH:mm" color="purple" />
      </div>

      <div class="q-mt-md q-mb-lg">
        <q-btn color="purple" @click.native="submitForm" label="Submit" />
      </div>

    </div>
  </q-page>
</template>

<style>
</style>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        order_title:null,
        order_language:null,
        order_budget:null,
        order_sender:null,
        senders:[],
        due_date:null,
        due_time:null
      }
    },

    mounted(){
      this.getSenders();
      this.getOrder();
    },
    methods:{
      submitForm(){
        if(
          this.order_title!==null&&
          this.order_language!==null&&
          this.order_budget!==null&&
          this.order_sender!==null&&
          this.due_date!==null&&
          this.due_time!==null
        )
        {
          const formData = {
            'title':this.order_title,
            'language':this.order_language,
            'budget':this.order_budget,
            'duedate':this.due_date,
            'sender':this.order_sender.split('-')[0]
          };

          this.$axios
            .post('http://localhost:8000/updateOrder/'+this.getOrderId(),formData)
            .then(
              res => {
                this.showNotif(res.data.response,'green-10','done','bottom');

                setTimeout(function () {
                  window.location.href='#/';
                },3000);
              }
            ).catch(
            error=>{
              this.showNotif(error.Error,'red','warning','bottom');
            }
          )

        }else {
          this.showNotif("Please fill all the fields",'red','warning','top');
        }

      },
      getOrderId(){
        return window.location.href.split('?id=')[1];
      },
      getOrder(){
        this.$axios
          .get('http://localhost:8000/getOrder/'+this.getOrderId())
          .then(
            res => {
              this.order_title = res.data.order.title;
              this.order_language = res.data.order.language;
              this.order_budget = res.data.order.budget;
              this.order_sender = res.data.order.sender;
              this.due_date = res.data.order.duedate.slice(0, res.data.order.duedate.length-3);
              this.due_time = res.data.order.duedate.slice(res.data.order.duedate.length-8,res.data.order.duedate.length);
            }
          ).catch(
          error=>(console.log(error))
        )
      },
      getSenders(){
        this.$axios
          .get('http://localhost:8000/get-senders')
          .then(
            res => {
              for (let i = 0; i < res.data.senders.length; i++) {
                this.senders.push(res.data.senders[i].id+"-"+res.data.senders[i].sender);
              }
            }
          ).catch(
          error=>(console.log(error))
        )
      },
      showNotif(msg,color,icon,pos) {
        this.$q.notify({
          message: msg,
          position:pos,
          color: color,
          icon: icon
        })
      },
    }
  }
</script>
