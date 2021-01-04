<template>
    <div>
        <header-tpl class="header" :connected="connected"></header-tpl>
        <h1>BEST WORDS AND DEFINITIONS HERE</h1>
    </div>
</template>

<script>
const HeaderTemplate = window.httpVueLoader('./components/Header.vue')

module.exports = {
  components: {
    'header-tpl': HeaderTemplate
  },
  props: {
    connected: { type: Boolean }
  }
}