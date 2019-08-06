<template>
    <q-page padding>

        <div class="scrollbar" id="style-7" :style="{ height: (window.height/738)*670 + 'px' }">
            <div class="force-overflow">
                <div class="text-h6 text-accent q-mt-md" style="width: 100%;">
                    Invoice
                </div>

                <div class="q-mt-md" style="width: 100%;">
                    <q-list>
                        <q-item tag="label" v-for="(sender,index) in senders" :key="index" style="max-width: 400px;" v-ripple>
                            <q-item-section avatar>
                                <q-toggle
                                        color="pink"
                                        false-value=""
                                        :true-value="sender.split('-')[0]"
                                        v-model="selected[index]"
                                        @input="getInvoice(selected[index],index)"
                                />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{sender.split('-')[1]}}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>


                <div style="width: 100%" class="q-mt-md">
                    <q-list bordered separator>

                        <q-item class="text-accent" style="font-weight: 600;">
                            <q-item-section style="width: 50px">ID</q-item-section>
                            <q-item-section>Title</q-item-section>
                            <q-item-section>Language</q-item-section>
                            <q-item-section>Price (Ksh)</q-item-section>
                        </q-item>


                        <div class="flex flex-center" v-if="invoices.length===0">
                            <q-spinner-puff
                                    color="accent"
                                    size="5.5em"
                            />
                        </div>

                        <q-item v-for="(invoice, index) in invoices" :key="invoice.id" style="">
                            <q-item-section>{{index+1}}</q-item-section>
                            <q-item-section>{{invoice.title}}</q-item-section>
                            <q-item-section>{{invoice.language}}</q-item-section>
                            <q-item-section>{{invoice.budget}}</q-item-section>
                        </q-item>

                        <q-item class="text-white bg-accent q-mb-lg" style="font-weight: 600;">
                            <q-item-section></q-item-section>
                            <q-item-section></q-item-section>
                            <q-item-section>Total</q-item-section>
                            <q-item-section>Ksh.{{getSum(prices)}}</q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </div>
        </div>



    </q-page>
</template>

<script>import axios from 'axios'

export default {
    data() {
        return {
            window: {
                width: 0,
                height: 0
            },
            invoices:[],
            prices:[],
            senders:[],
            selected:[]
        }
    },
    mounted() {
        this.getSenders();
        //this.getInvoice(2);
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },
        getSenders(){
            this.$axios
                .get('http://localhost:8000/get-senders')
                .then(
                    res => {
                        for (let i = 0; i < res.data.senders.length; i++) {
                            this.senders.push(res.data.senders[i].id+"-"+res.data.senders[i].sender);
                            this.selected.push('');
                        }

                    }
                ).catch(
                error=>(console.log(error))
            )
        },

        getSum(data){
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum+=data[i];
            }
            return sum;
        },
        getInvoice(id,i){
            if(id!==""){
                for (let j = 0; j < this.selected.length; j++) {
                    if(i!==j){
                        this.selected[j]='';
                    }
                }
                this.$axios
                    .get('http://localhost:8000/invoice/'+id)
                    .then(
                        res => {
                            this.prices=[];
                            this.invoices = res.data.invoice;
                            for (let i = 0; i < this.invoices.length; i++) {
                                this.prices.push(parseInt(this.invoices[i].budget));
                            }
                        }
                    ).catch(
                    error=>(console.log(error))
                );
            }else{
                this.invoices = [];
                this.prices=[];
            }

        },

        showNotif(msg, color, icon) {
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
    .enlarge {
        font-size: 18px;
    }
</style>
