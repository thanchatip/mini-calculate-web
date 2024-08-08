<template>
  <div class="form">
    <div class="field">
      <label class="text">ราคาอสังหาฯ</label>
      <InputNumber v-model="value2" inputId="percent" fluid />
    </div>
    <div class="interest-box">
      <div class="field">
        <label class="text">อัตราดอกเบี้ย</label>
        <InputNumber v-model="value2" inputId="percent" fluid />
      </div>
      <div class="field">
        <label class="text">ระยะเวลากู้</label>
        <InputNumber v-model="value2" inputId="percent" fluid />
      </div>
    </div>
    <div class="button-group">
      <Button class="button" label="ล้างข้อมูล" icon="pi pi-refresh" link />
      <Button class="button" label="คำนวณสินเชื่อ" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text {
  display: flex;
  margin-bottom: 10px;
  font-size: 14px;
}

.interest-box {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.button {
  width: 50%;
}
</style>
