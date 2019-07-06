<template>
  <q-page class="" padding>
    <div style="width:100%;" class="q-mt-md">
      <q-btn to="/add-order" color="purple" label="New Order" />
    </div>

    <div style="width: 100%" class="q-mt-md">
      <q-list bordered separator>

        <q-item class="text-accent" style="font-weight: 600;">
          <q-item-section class="hide-id" style="width: 50px">ID</q-item-section>
          <q-item-section class="q-mr-md">Title</q-item-section>
          <q-item-section class="hide-lang q-mr-md">Language</q-item-section>
          <q-item-section class="hide-budget q-mr-md">Budget</q-item-section>
          <q-item-section class="hide-due q-mr-md">Due Date</q-item-section>
          <q-item-section class="hide-sender q-mr-md">Sender</q-item-section>
          <q-item-section class="q-mr-md">Delivery</q-item-section>
          <q-item-section class="hide-pay q-mr-md">Payment</q-item-section>
          <q-item-section>Edit</q-item-section>
          <q-item-section class="hide-del">Delete</q-item-section>
        </q-item>


        <div class="flex flex-center" v-if="orders.length===0" >
          <q-spinner-puff
            color="accent"
            size="5.5em"
          />
        </div>

        <q-item v-for="order in orders" :key="order.id" style="">
          <q-item-section class="hide-id" style="width: 50px">{{order.id}}</q-item-section>
          <q-item-section class="q-mr-md">{{order.title}}</q-item-section>
          <q-item-section class="hide-lang q-mr-md">{{order.language}}</q-item-section>
          <q-item-section class="hide-budget q-mr-md">{{order.budget}}</q-item-section>
          <q-item-section class="hide-due q-mr-md">{{order.duedate}}</q-item-section>
          <q-item-section class="hide-sender q-mr-md">{{senders[parseInt(order.sender)-2].sender}}</q-item-section>
          <q-item-section class="q-mr-md">

            <q-btn
                    v-if="order.delivered===1"
                    color="positive"
                    size="xs"
                    label="Delivered"
            />

            <q-btn
                    v-else
                    color="negative"
                    size="xs"
                    label="Pending"
                    @click.native="orderDelivered(order.id,current)"
            />

          </q-item-section>
          <q-item-section class="hide-pay q-mr-md">

            <q-btn
                    v-if="order.paid===1"
                    color="positive"
                    size="xs"
                    label="Paid"
            />

            <q-btn
                    v-else
                    color="negative"
                    size="xs"
                    label="Pending"
                    @click.native="orderPaid(order.id,current)"
            />

          </q-item-section>
          <q-item-section class="text-primary" padding>

            <q-btn :to="editOrder+order.id" size="10px" flat dense round icon="edit" />

          </q-item-section>
          <q-item-section class="hide-del text-negative">

            <q-btn @click.native="deleteOrder(order.id,current)" size="12px" flat dense round icon="delete_forever" />

          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="q-mt-sm">
      <q-pagination
              v-model="current"
              :max="4"
              :direction-links="true"
              @click.native="getOrders(current)"
      >
      </q-pagination>

    </div>
  </q-page>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        orders:[],
        paginations:'',
        current:1,
        editOrder:'/edit-order?id=',
        senders:[]
      }
    },
    mounted(){
      this.getOrders(1);
      this.getSenders();
    },
    methods:{
      getSenders(){
        this.$axios
          .get('http://localhost:8000/get-senders')
          .then(
            res => {
              this.senders = res.data.senders;
            }
          ).catch(
          error=>(console.log(error))
        )
      },
      getPages(){
        this.$axios
          .get('http://localhost:8000')
          .then(
            result => {
                this.paginations=parseInt(result.data.Orders.last_page);
            }
          ).catch(
          error=>(console.log(error))
        )
      },
      getOrders(pg){
        this.getPages();

        while(this.orders.length>0){
          this.orders.pop();
        }

        this.$axios
          .get('http://localhost:8000?page='+pg)
          .then(
            res => {
               this.orders = res.data.Orders.data;
            }
          ).catch(
          error=>(console.log(error))
        )
      },
      orderPaid(id,pg){
        this.$q.dialog({
          title: 'Confirm',
          message: "Has the order been paid?",
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$axios
            .get('http://localhost:8000/OrderPaid/'+id)
            .then(
              res => {
                this.getOrders(pg);
                this.showNotif(res.data.response,'green-10','check_circle_outline');
              }
            ).catch(error=>(console.log(error))
          )
        }).onOk(() => {
          //
        }).onCancel(() => {
          //
        }).onDismiss(() => {
          //
        });

      },
      orderDelivered(id,pg){
        this.$q.dialog({
          title: 'Confirm',
          message: "Has order been delivered?",
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$axios
            .get('http://localhost:8000/deliverOrder/'+id)
            .then(
              res => {
                this.getOrders(pg);
                this.showNotif(res.data.response,'green-10','check_circle_outline');
              }
            ).catch(error=>(console.log(error))
          )
        }).onOk(() => {
          //
        }).onCancel(() => {
          //
        }).onDismiss(() => {
          //
        });
      },
      deleteOrder(id,pg){
        this.$q.dialog({
          title: 'Confirm',
          message: "Do you really wish to delete?",
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$axios
            .get('http://localhost:8000/deleteOrder/'+id)
            .then(
              res => {
                this.getOrders(pg);
                this.showNotif(res.data.response,'green-10','check_circle_outline');
              }
            ).catch(error=>(console.log(error))
          )
        }).onOk(() => {
          //
        }).onCancel(() => {
          //
        }).onDismiss(() => {
          //
        });
      },
      showNotif(msg,color,icon) {
        this.$q.notify({
          message: msg,
          //position:'right',
          color: color,
          icon: icon
        })
      }
    }
  }

</script>

<style>
  .enlarge{
    font-size: 18px;
  }
  @media screen and (max-width: 999px){
    .hide-id{
      display:none;
    }
  }
  @media screen and (max-width: 899px){
    .hide-lang{
      display:none;
    }
  }
  @media screen and (max-width: 639px){
    .hide-del{
      display:none;
    }
  }
  @media screen and (max-width: 600px) {
    .hide-due{
      display:none;
    }
    .hide-sender{
      display:none;
    }
  }
  @media screen and (max-width: 419px) {
    .hide-pay{
      display:none;
    }
    .hide-budget{
      display:none;
    }
  }
</style>


