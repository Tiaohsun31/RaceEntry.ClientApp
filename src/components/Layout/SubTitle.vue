<script>
  export default {
    props: ["Title"],
  };
</script>

<template>
  <div class="titleBox">
    <svg
      id="focusline-dots"
      data-name="focusline-dots"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <title>focusline-dots</title>
      <circle class="cls-1" cx="6.4" cy="6.4" r="6.4" />
      <circle class="cls-1" cx="43.6" cy="6.4" r="6.4" />
      <circle class="cls-1" cx="6.4" cy="43.6" r="6.4" />
      <circle class="cls-1" cx="43.6" cy="43.6" r="6.4" />
    </svg>
    <span>{{ Title }}</span>
    <svg
      id="focusline-dots"
      data-name="focusline-dots"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <title>focusline-dots</title>
      <circle class="cls-1" cx="6.4" cy="6.4" r="6.4" />
      <circle class="cls-1" cx="43.6" cy="6.4" r="6.4" />
      <circle class="cls-1" cx="6.4" cy="43.6" r="6.4" />
      <circle class="cls-1" cx="43.6" cy="43.6" r="6.4" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/scss/mixin";
  @import "@/scss/variable";
  @import "@/scss/common";

  .titleBox {
    width: 100%;
    @include flex;
    margin: 75px 0 35px;

    span {
      color: $mainhovercolor;
      font-weight: bold;
      font-size: 20px;
      margin:0 15px ;
    }
    svg {
      width: 15px;
      .cls-1 {
        fill: $lightfontcolor;
      }
    }
  }
</style>
