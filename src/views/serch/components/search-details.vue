<template>
  <div>
    <van-cell-group>
      <van-cell :title="results.title"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
