<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">Kalkulator VAT</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">

      <div>
        <label class="block text-gray-700 mb-1">Nazwa produktu</label>
        <input type="text" v-model="productName" class="w-full border rounded px-3 py-2 mt-1" required />
      </div>

      <div>
        <label class="block text-gray-700">Kwota netto</label>
        <input type="number" v-model.number="netAmount" class="w-full border rounded px-3 py-2 mt-1" step="0.01" required />
      </div>

      <div>
        <label class="block text-gray-700">Stawka VAT</label>
        <select v-model="vatRate" class="w-full border rounded px-3 py-2 mt-1">
          <option value="23">23%</option>
          <option value="22">22%</option>
          <option value="8">8%</option>
          <option value="7">7%</option>
          <option value="5">5%</option>
          <option value="3">3%</option>
          <option value="0">0%</option>
          <option value="zw">zw.</option>
          <option value="np">np.</option>
          <option value="oo">o.o.</option>
        </select>
      </div>

      <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold shadow-md transition">
        Oblicz
      </button>
    </form>

    <div v-if="toastMessage" class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { usePriceCalculator } from '~/composables/usePriceCalculator';

const emit = defineEmits<{
  (e: 'onAdded'): void;
}>();

const productName = ref('');
const netAmount = ref<number | null>(null);
const vatRate = ref<string>('23'); // string, bo value w select jest string
const toastMessage = ref('');

const { calculate } = usePriceCalculator();

async function handleSubmit() {
  if (!productName.value || netAmount.value === null || vatRate.value === '') {
    toastMessage.value = 'Proszę wypełnić wszystkie pola';
    setTimeout(() => (toastMessage.value = ''), 3000);
    return;
  }

  // Obliczenia VAT
  const vatPercent = ['zw', 'np', 'oo'].includes(vatRate.value) ? 0 : parseFloat(vatRate.value);
  const { taxAmount, grossAmount } = calculate(netAmount.value, vatPercent);

  try {
    await $fetch('/api/submissions', {
      method: 'POST',
      body: {
        productName: productName.value,
        netAmount: netAmount.value,
        vatRate: vatRate.value,
        taxAmount,
        grossAmount
      }
    });

    toastMessage.value = `Cena produktu ${productName.value} wynosi: ${grossAmount.toFixed(2)} zł brutto, kwota podatku to ${taxAmount.toFixed(2)} zł.`;

    productName.value = '';
    netAmount.value = null;
    vatRate.value = '23';

    setTimeout(() => (toastMessage.value = ''), 5000);
    emit('onAdded');
  } catch (err) {
    console.error(err);
    toastMessage.value = 'Błąd zapisu do bazy';
    setTimeout(() => (toastMessage.value = ''), 5000);
  }
}
</script>
