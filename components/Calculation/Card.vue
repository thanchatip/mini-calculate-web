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
        <div class="form">
          <div class="field">
            <label class="text">ราคาอสังหาฯ</label>
            <IconField>
              <InputNumber
                v-model="propertyCost"
                fluid
                :class="{ 'p-invalid': v$.propertyCost.$error }"
                @blur="v$.propertyCost.$touch"
                @focus="v$.propertyCost.$reset"
              />
              <InputIcon>บาท</InputIcon>
            </IconField>
            <small v-if="v$.propertyCost.$error" class="p-error">
              {{ v$.propertyCost.$errors[0]?.$message }}
            </small>
          </div>

          <div class="interest-box">
            <div class="field input-row">
              <label class="text">อัตราดอกเบี้ย</label>
              <IconField>
                <InputNumber
                  v-model="interestRatio"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                  fluid
                  :class="{ 'p-invalid': v$.interestRatio.$error }"
                  @blur="v$.interestRatio.$touch"
                  @focus="v$.interestRatio.$reset"
                />
                <InputIcon>%</InputIcon>
              </IconField>
              <small v-if="v$.interestRatio.$error" class="p-error">
                {{ v$.interestRatio.$errors[0]?.$message }}
              </small>
            </div>
            <div class="field input-row">
              <label class="text">ระยะเวลากู้</label>
              <IconField>
                <InputNumber
                  v-model="loanPeriod"
                  fluid
                  :class="{ 'p-invalid': v$.loanPeriod.$error }"
                  @blur="v$.loanPeriod.$touch"
                  @focus="v$.loanPeriod.$reset"
                />
                <InputIcon>ปี</InputIcon>
              </IconField>
              <small v-if="v$.loanPeriod.$error" class="p-error">
                {{ v$.loanPeriod.$errors[0]?.$message }}
              </small>
            </div>
          </div>
          <div class="button-group">
            <Button
              class="button"
              label="ล้างข้อมูล"
              icon="pi pi-refresh"
              link
              @click="handleClickClear"
            />
            <Button
              class="button"
              label="คำนวณสินเชื่อ"
              :disabled="isDisabledCalculateButton"
              @click="handleClickCalculate"
            />
          </div>
        </div>
      </div>
      <div class="display-result">
        <CalculationResultDisplay
          :loanAmount="loanAmount"
          :monthlyBaseIncome="monthlyBaseIncome"
          :monthlyInstallment="monthlyInstallment"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required, helpers, minValue, maxValue } from "@vuelidate/validators";

const { withMessage } = helpers;

const loanAmount = ref();
const monthlyBaseIncome = ref();
const monthlyInstallment = ref();

const propertyCost = ref();
const interestRatio = ref();
const loanPeriod = ref();

const validations = {
  propertyCost: {
    required: withMessage("กรุณากรอกราคาอสังหาฯ", required),
    maxValue: withMessage(
      "ราคาอสังหาฯ ต้องไม่เกิน 99,999,999,999 บาท",
      maxValue(99999999999)
    ),
  },
  interestRatio: {
    required: withMessage("กรุณากรอกอัตราดอกเบี้ย", required),
    minValue: withMessage("อัตราดอกเบี้ยต้องอย่างน้อย 2%", minValue(2)),
    maxValue: withMessage("อัตราดอกเบี้ยต้องไม่เกิน 99.99%", maxValue(99.99)),
  },
  loanPeriod: {
    required: withMessage("กรุณากรอกระยะเวลากู้", required),
    minValue: withMessage("ระยะเวลากู้ไม่น้อยกว่า 3 ปี", minValue(3)),
    maxValue: withMessage("ระยะเวลากู้ต้องไม่เกิน 99 ปี", maxValue(99)),
  },
};

const v$ = useVuelidate(validations, {
  propertyCost: propertyCost,
  interestRatio: interestRatio,
  loanPeriod: loanPeriod,
});

const isDisabledCalculateButton = computed(() => {
  if (v$.value.$invalid) {
    return true;
  }

  if (propertyCost.value) {
    if (interestRatio.value) {
      if (loanPeriod.value) {
        return false;
      }
    }
  }
  return true;
});

function handleClickClear() {
  v$.value.$reset();
  propertyCost.value = null;
  interestRatio.value = null;
  loanPeriod.value = null;
  loanAmount.value = null;
  monthlyBaseIncome.value = null;
  monthlyInstallment.value = null;
}

function calculateEMI(
  principal: number,
  annualInterestRate: number,
  loanPeriod: number
) {
  const months = loanPeriod * 12;
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  const emi =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, months)) /
    (Math.pow(1 + monthlyInterestRate, months) - 1);

  return emi;
}

function calculateMinimumMonthlyIncome(propertyPrice: number) {
  const basePrice = 650000; // Base price used in the formula
  const baseIncome = 10000; // Base income used in the formula
  return (propertyPrice / basePrice) * baseIncome;
}

async function handleClickCalculate() {
  const isFormValid = await v$.value.$validate();
  if (isFormValid) {
    const emi = calculateEMI(
      propertyCost.value,
      interestRatio.value,
      loanPeriod.value
    );

    const minimumMonthlyIncome = calculateMinimumMonthlyIncome(
      propertyCost.value
    );

    loanAmount.value = propertyCost.value;
    monthlyBaseIncome.value = minimumMonthlyIncome;
    monthlyInstallment.value = emi;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/fluid-sizing.scss";

$laptop: 1400px;
$tablet: 992px;
$mobile: 700px;
$smallMobile: 568px;

.container {
  background: #fde9f3;
  border-radius: 12px;
  border: 2px solid var(--primary-color);
  padding: 25px 20px;
  position: relative;
  $width-map: (
    $laptop: 770px,
    $tablet: 720px,
  );
  @include poly-fluid-sizing("width", $width-map);
}

@media only screen and (max-width: $mobile) {
  .container {
    height: 100vh;
    border-radius: 0px;
  }
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
  $map: (
    $laptop: 30px,
    $tablet: 28px,
    $mobile: 22px,
    $smallMobile: 22px,
  );
  @include poly-fluid-sizing("font-size", $map);
}

.sub-header {
  margin-top: 15px;
  color: var(--primary-color);
  display: flex;
  align-items: baseline;

  .text {
    text-decoration: underline;
    cursor: pointer;
  }
}

.icon {
  margin-left: 5px;
  font-size: 10px;
  cursor: pointer;
}

.calculation-content {
  margin-top: 5px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.text {
  display: flex;
  margin-bottom: 10px;
  $map: (
    $laptop: 16px,
    $tablet: 14px,
    $mobile: 14px,
    $smallMobile: 14px,
  );
  @include poly-fluid-sizing("font-size", $map);
}

.interest-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 15px;
}

.input-row,
.button {
  width: 50%;
}
</style>
