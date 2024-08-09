<template>
  <div class="header" v-tooltip.bottom="{ value: interestTips }">
    ผลคำนวณเงินกู้ (กรณีกู้ได้ 100%)
    <i class="icon pi pi-exclamation-circle"></i>
  </div>
  <div class="card">
    <div class="result-box">
      <div class="text-content">
        <div class="text">วงเงินกู้</div>
        <div class="value-box">
          <div class="text-amount">{{ dataFormatter(loanAmount) }}</div>
          <div class="text-suffix">บาท</div>
        </div>
      </div>
      <div class="text-content">
        <div class="text">รายได้ขั้นต่ำต่อเดือน</div>
        <div class="value-box">
          <div class="text-amount">
            {{ dataFormatter(monthlyBaseIncome) }}
          </div>
          <div class="text-suffix">บาท</div>
        </div>
      </div>
      <Divider class="divider" />
      <div class="text-content">
        <div class="text">ยอดผ่อนต่อเดือน</div>
        <div class="value-box">
          <div class="text-total-amount">
            {{ dataFormatter(monthlyInstallment) }}
          </div>
          <div class="text-suffix">บาท</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const interestTips =
  "ตัวเลขที่แสดงจะเป็นตัวเลขเฉพาะการกู้ โดยวิธีคำนวณง่ายๆ เงินเดือน 10,000 บาท จะกู้ได้ประมาณ 650,000 บาท";

interface Props {
  loanAmount: number;
  monthlyBaseIncome: number;
  monthlyInstallment: number;
}

const props = defineProps<Props>();

function dataFormatter(value: number) {
  console.log(value);
  if (isNaN(value)) {
    return "";
  }

  if (value < 1) {
    return "";
  }

  const formattedNumber = value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,");

  return formattedNumber;
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/fluid-sizing.scss";

$laptop: 1400px;
$tablet: 992px;
$mobile: 700px;
$smallMobile: 568px;

.card {
  background: #fcfcfd;
  border-radius: 16px;
  border: 1px solid #d0d0d0;
  position: relative;
}

.result-box {
  margin: 20px 15px;
  display: flex;
  flex-direction: column;
  //gap: 10px;
}

.header {
  margin: 10px 0;
  font-size: 14px;
  cursor: pointer;
}

.icon {
  margin-left: 5px;
  font-size: 13px;
}

.text-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 15px;
  height: 32px;
}

.value-box {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 15px;
}

.text-amount {
  font-weight: bold;
  $map: (
    $laptop: 32px,
    $tablet: 30px,
    $mobile: 28px,
    $smallMobile: 28px,
  );
  @include poly-fluid-sizing("font-size", $map);
}

.text-total-amount {
  font-weight: bold;
  background: linear-gradient(135deg, #24ce75, #169bfd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  $map: (
    $laptop: 32px,
    $tablet: 30px,
    $mobile: 28px,
    $smallMobile: 28px,
  );
  @include poly-fluid-sizing("font-size", $map);
}

.text,
.text-suffix {
  font-size: 16px;
  color: #545454;
}

.divider {
  background: #9d9d9d;
  margin-top: 5px;
}

@media only screen and (max-width: $mobile) {
  .text-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 40px;
  }

  .value-box {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 15px;
  }
}
</style>
