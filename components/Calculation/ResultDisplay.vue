<template>
  <div class="header" v-tooltip.bottom="{ value: interestTips }">
    ผลคำนวณเงินกู้ (กรณีกู้ได้ 100%)
    <i class="icon pi pi-exclamation-circle"></i>
  </div>
  <div class="card">
    <div class="text-row">
      <div class="text">วงเงินกู้</div>
      <div class="value-box">
        <div class="text-amount">{{ loanAmount > 0 ? loanAmount : "" }}</div>
        <div class="text-suffix">บาท</div>
      </div>
    </div>
    <div class="text-row">
      <div class="text">รายได้ขั้นต่ำต่อเดือน</div>
      <div class="value-box">
        <div class="text-amount">
          {{ monthlyBaseIncome ? monthlyBaseIncome.toFixed(0) : "" }}
        </div>
        <div class="text-suffix">บาท</div>
      </div>
    </div>
    <Divider class="divider" />
    <div class="text-row">
      <div class="text">ยอดผ่อนต่อเดือน</div>
      <div class="value-box">
        <div class="text-total-amount">
          {{ monthlyInstallment ? monthlyInstallment.toFixed(0) : "" }}
        </div>
        <div class="text-suffix">บาท</div>
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
</script>

<style lang="scss" scoped>
.card {
  min-width: 300px;
  min-height: 200px;
  background: #fcfcfd;
  border-radius: 16px;
  border: 1px solid #d0d0d0;
  padding: 20px 15px;
  position: relative;
}

.header {
  margin: 10px 0;
  font-size: 14px;
}

.icon {
  margin-left: 5px;
  font-size: 13px;
}

.text-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 15px;
}

.value-box {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 15px;
}

.text-amount {
  font-size: 32px;
  font-weight: bold;
}

.text-total-amount {
  font-size: 32px;
  font-weight: bold;
  background: linear-gradient(135deg, #24ce75, #169bfd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text,
.text-suffix {
  font-size: 16px;
  color: #545454;
}

.divider {
  background: #9d9d9d;
}
</style>
