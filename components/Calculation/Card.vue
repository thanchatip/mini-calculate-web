<template>
  <div class="container">
    <div class="tag"></div>
    <div class="header">คำนวณสินเชื่ออสังหาฯ เบื้องต้น</div>
    <div class="sub-header">
      <div class="text">ข้อเสนอสุดพิเศษสำหรับคุณ</div>
      <i class="icon pi pi-chevron-right"></i>
    </div>
    <div class="calculation-content">
      <div class="form-container">
        <CalculationForm />
      </div>
      <div class="display-result">
        <CalculationResultDisplay />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  min-width: 700px;
  background: #fde9f3;
  border-radius: 12px;
  border: 2px solid var(--primary-color);
  padding: 20px 15px;
  position: relative;
}

.tag {
  position: absolute;
  top: 0px;
  right: 10px;
  height: 48px;
  width: 48px;
  background: var(--primary-color);
}

.header {
  font-size: 20px;
}

.sub-header {
  margin-top: 20px;
  color: var(--primary-color);
  display: flex;
  align-items: baseline;

  .text {
    text-decoration: underline;
  }
}

.icon {
  margin-left: 5px;
  font-size: 10px;
}

.calculation-content {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
</style>
