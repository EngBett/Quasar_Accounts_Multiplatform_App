<template>
  <q-page class="q-ml-md q-mr-md">
    <div class="q-ml-md q-mt-md" style="max-width: 100%;">

      <div class="text-h6 text-accent q-ml-md q-mt-md" style="width: 100%;">
        New Sender
      </div>

      <q-input v-model="sender" label="Enter New Sender Name" style="max-width: 400px;" />

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
        sender:null
      }
    },

    mounted(){

    },

    methods: {
      submitForm(){
        if(
                this.sender!==null
        )
        {
          const formData = {
            'sender':this.sender
          };

          this.$axios
                  .post('http://localhost:8000/store-sender',formData)
                  .then(
                          res => {
                            this.showNotif(res.data.response,'green-10','done','bottom');
                            this.sender=null;

                            setTimeout(function () {
                              window.location.href='#/senders';
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
      showNotif(msg,color,icon,pos) {
        this.$q.notify({
          message: msg,
          position:pos,
          color: color,
          icon: icon
        })
      },
      Alert(msg){
        this.$q.dialog({
          title: 'Alert',
          message: msg,
          persistent: true
        }).onOk(() => {
          //
        }).onDismiss(() => {
          //
        });
      }
    }
  }
</script>
