<template>
  <div>
    <PriceCalculatorForm @onAdded="fetchData" />

    <h2 class="text-xl mt-8 mb-4">Lista zapisanych produktów</h2>
    <ul class="space-y-2">
      <li v-for="sub in submissions" :key="sub.id" class="p-2 bg-white rounded shadow flex justify-between">
        <span>{{ sub.productName }}</span>
        <span>{{ sub.grossAmount.toFixed(2) }} zł</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import PriceCalculatorForm from "~/components/PriceCalculatorForm.vue";

const submissions = ref<any[]>([]);

async function fetchData() {
  try {
    submissions.value = await $fetch("/api/submissions");
  } catch (err) {
    console.error(err);
  }
}

onMounted(fetchData);
</script>