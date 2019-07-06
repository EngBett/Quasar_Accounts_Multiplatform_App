<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="bg-accent text-white">
      <q-toolbar>
        <q-toolbar-title>
          My Accounts
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-footer bordered class="bg-white text-accent">
      <div class="q-gutter-y-md" style="max-width: 100%;">
        <q-tabs
                narrow-indicator
                dense
                align="justify"
                class="text-accent"
        >
          <q-route-tab
                  v-for="nav in navs"
                  :key="nav.label"
                  :to="nav.to"
                  :icon="nav.icon"
                  :label="nav.label"
          />

        </q-tabs>
      </div>

    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="200"
      :breakpoint="767"
      bordered
      content-class="bg-deep-purple-10"
    >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>

        <q-item
                v-for="nav in navs"
                :key="nav.label"
                clickable
                exact
                :to="nav.to">

                    <q-item-section avatar>
                      <q-icon :name="nav.icon" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{nav.label}}</q-item-label>
                    </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { scroll } from 'quasar'


export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs:[
        {
          icon:'assignment',
          to:'/',
          label:'Orders'
        },
           {
          icon:'payment',
          to:'/income',
          label:'Income'
        },
        {
          icon:'perm_identity',
          to:'/senders',
          label:'Senders'
        },
        {
          icon:'receipt',
          to:'/invoice',
          label:'Invoice'
        }

      ]
    }
  },
  mounted(){
  },
  methods: {
    openURL

  }
}
</script>

<style>
  @media screen and (min-width: 768px){
    .q-footer{
      display: none;
    }
      .q-table__middle{
          margin: 10px;
      }
  }
</style>
