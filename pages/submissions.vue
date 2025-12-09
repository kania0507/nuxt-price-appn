<template>
  <div>
    <h1>Wszystkie zgłoszenia</h1>
    <ul>
      <li v-for="sub in submissions" :key="sub.id">
        {{ sub.productName }} - {{ sub.grossAmount }} zł - {{ sub.createdAt }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const submissions = ref([]);

async function fetchData() {
  try {
    const data = await $fetch("/api/submissions");
    submissions.value = data;
  } catch (err) {
    console.error(err);
  }
}

onMounted(fetchData);
</script>
