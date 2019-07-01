<template>
    <q-page class="q-ml-md q-mr-md">
        <div style="width:100%;" class="q-mt-md">
            <q-btn to="/add-sender" color="purple" label="New Sender"/>
        </div>

        <div style="width: 100%" class="q-mt-md">
            <q-list bordered separator>

                <q-item class="text-accent" style="font-weight: 600;">
                    <q-item-section style="width: 50px">ID</q-item-section>
                    <q-item-section class="q-mr-md">Name</q-item-section>
                    <q-item-section>Edit</q-item-section>
                    <q-item-section>Delete</q-item-section>
                </q-item>


                <div class="flex flex-center" v-if="senders.length===0">
                    <q-spinner-puff
                            color="accent"
                            size="5.5em"
                    />
                </div>

                <q-item v-for="sender in senders" :key="sender.id" style="">
                    <q-item-section style="width: 50px">{{sender.id}}</q-item-section>
                    <q-item-section class="q-mr-md">{{sender.sender}}</q-item-section>

                    <q-item-section class="enlarge text-primary">

                        <q-btn class="gt-xs" :to="editSender+sender.id" size="12px" flat dense round icon="edit"/>

                    </q-item-section>
                    <q-item-section class="enlarge text-negative">

                        <q-btn class="gt-xs" @click.native="deleteSender(sender.id)" size="12px" flat dense round
                               icon="delete_forever"/>

                    </q-item-section>
                </q-item>
            </q-list>
        </div>

    </q-page>
</template>

<script>import axios from 'axios'

export default {
    data() {
        return {
            senders: [],
            editSender: '/edit-sender?id='
        }
    },
    mounted() {
        this.getSenders();
    },
    methods: {
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
        deleteSender(id) {
            this.$q.dialog({
                title: 'Confirm',
                message: "Do you really wish to delete?",
                cancel: true,
                persistent: true
            }).onOk(() => {
                this.$axios
                    .get('http://localhost:8000/delete-sender/'+ id)
                    .then(
                        res => {
                            this.getSenders();
                            this.showNotif(res.data.response, 'green-10', 'check_circle_outline');
                        }
                    ).catch(error => (console.log(error))
                )
            }).onOk(() => {
                //
            }).onCancel(() => {
                //
            }).onDismiss(() => {
                //
            });
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
