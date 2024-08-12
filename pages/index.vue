<template>
  <div class="page">
    <CalculationCard />
  </div>
</template>

<style lang="scss" scoped>
$laptop: 1400px;
$tablet: 992px;
$mobile: 700px;
$smallMobile: 568px;

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh;
}

@media only screen and (max-width: $mobile) {
  .page {
    padding: 0px;
    height: 100vh;
  }
}
</style>
