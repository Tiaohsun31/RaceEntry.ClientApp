<template>
  <!-- loading animation -->
  <section class="loading-box">
    <div class="loading-animate"></div>
    <div class="loading-content">LOADING...</div>
  </section>
</template>

<script></script>

<style lang="scss">
@import '@/scss/mixin';
@import '@/scss/variable';

$base-line-height: 24px;
$loading-color: rgb(173, 173, 173);
$off-white: rgba($loading-color, 0.4);
$spin-duration: 1s;
$pulse-duration: 750ms;


@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-box {
  width: 100%;
  padding: 20px 0 100px;
  @include flex(flex-start, center);
  flex-direction: column;

  .loading-animate {
    border-radius: 50%;
    width: $base-line-height;
    height: $base-line-height;
    border: 0.25rem solid $off-white;
    border-top-color: $loading-color;
    animation: spin $spin-duration infinite linear;
  }

  .loading-content {
    font-size: $h6;
    margin-top: 10px;
    color: $lightfontcolor;
  }
}

</style>
