<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-bar class="q-electron-drag bg-purple-10 text-white">
        <q-btn dense flat icon="fab fa-apple" />
        <div class="text-weight-bold">
          My Accounts
        </div>

        <q-space />

        <q-btn dense flat round icon="lens" size="8.5px" color="green" @click.native="maximize" />
        <q-btn dense flat round icon="lens" size="8.5px" color="yellow" @click.native="minimize" />
        <q-btn dense flat round icon="lens" size="8.5px" color="red" @click.native="closeApp" />
      </q-bar>
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
  mounted() {
  },
  methods: {
    minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        }
        else {
          win.maximize()
        }
      }
    },

    closeApp () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    },
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
  .force-overflow
  {
    min-height: 450px;
  }
  #style-7::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    border-radius: 10px;
  }

  #style-7::-webkit-scrollbar
  {
    width: 10px;
    background-color: #F5F5F5;
  }

  #style-7::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    background-image: -webkit-gradient(linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(122,153,217)),
    color-stop(0.72, rgb(73,125,189)),
    color-stop(0.86, rgb(28,58,148)));
  }
  .scrollbar
  {
    width: 100%;
    overflow-y: scroll;
  }
</style>
