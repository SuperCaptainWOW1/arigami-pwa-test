<template lang="pug">
.cont
  ui-button(@click="arigamiStartWidget('c6eedd21-3077-4ecb-8533-2bdb0d659bb3')") 3D просмотр
  span.browser {{ browser }}
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const route = useRoute()

    let arigamiController
    const arigamiStartWidget = async function (productCardToken) {
      if (!arigamiController) {
        arigamiController = window.arigami.init('modal', {})
      }
      arigamiController.updateOptions({ productCardToken })
      arigamiController.start()
    }

    if (route.query?.openWidget) {
      arigamiStartWidget('c6eedd21-3077-4ecb-8533-2bdb0d659bb3')
    }

    navigator.showBrowser = (() => {
      const { userAgent } = navigator
      let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
      let temp

      if (/trident/i.test(match[1])) {
        temp = /\brv[ :]+(\d+)/g.exec(userAgent) || []

        return `IE ${temp[1] || ''}`
      }

      if (match[1] === 'Chrome') {
        temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/)

        if (temp !== null) {
          return temp.slice(1).join(' ').replace('OPR', 'Opera')
        }

        temp = userAgent.match(/\b(Edg)\/(\d+)/)

        if (temp !== null) {
          return temp.slice(1).join(' ').replace('Edg', 'Edge (Chromium)')
        }
      }

      match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?']
      temp = userAgent.match(/version\/(\d+)/i)

      if (temp !== null) {
        match.splice(1, 1, temp[1])
      }

      return match.join(' ')
    })()

    const browser = computed(() => navigator?.showBrowser)

    return { arigamiStartWidget, browser }
  }
}
</script>

<style lang="sass" scoped>
.browser
  color: red
  margin-top: 30px
  display: block
</style>
