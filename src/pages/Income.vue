<template>
    <q-page class="q-ml-lg q-mt-lg q-mr-lg">

        <div class="flex-center q-pa-md row items-start q-gutter-md">
            <q-card
                    class="my-card text-white"
                    style="background: radial-gradient(circle, #00c853 0%, #1B5E20 100%)"
            >
                <q-card-section>
                    <div class="text-h6">Current Income</div>
                    <div class="text-subtitle2"></div>
                </q-card-section>

                <q-card-section class="text-center">
                    Ksh. {{income}}
                </q-card-section>
            </q-card>
        </div>

        <div class="flex-center q-pa-md row items-start q-gutter-md">
            <q-card
                    class="my-card text-white"
                    style="background: radial-gradient(circle, #ffa726 0%, #c74c00 100%)"
            >
                <q-card-section>
                    <div class="text-h6">Pending Income</div>
                    <div class="text-subtitle2"></div>
                </q-card-section>

                <q-card-section class="text-center">
                    Ksh. {{pending}}
                </q-card-section>
            </q-card>
        </div>

    </q-page>
</template>

<style>
</style>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                income: '',
                pending: ''
            }
        },
        mounted() {
            this.getIncome();
        },
        methods: {
            getIncome() {
                this.$axios
                    .get('http://localhost:8000/income')
                    .then(
                        res => {
                            this.income=res.data.income;
                            this.pending=res.data.pending;
                        }
                    ).catch(
                    error => (console.log(error))
                )
            },
        }
    }
</script>
