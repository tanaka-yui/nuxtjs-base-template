<template>
  <section>
    home
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

interface DataTypes {
  home: string
}

@Component({
  middleware: ['authenticated']
})
export default class DeviceForm extends Vue {
  public data(): DataTypes {
    return {
      home: 'home画面'
    }
  }
}
</script>
