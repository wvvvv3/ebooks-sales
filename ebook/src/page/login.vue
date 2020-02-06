<template>
  <div>
    登录
    <Radio :checked.sync="single">Radio</Radio>
  </div>
</template>

<script>
export default {
  data () {
    return {
      single: false
    }
  }
}
</script>
