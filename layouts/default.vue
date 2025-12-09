<template>
  <div class="min-h-screen bg-gray-100">

    <nav class="bg-white shadow p-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-lg font-semibold text-blue-600">
        Kalkulator VAT
      </NuxtLink>

      <div class="space-x-4">
        <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">
          Formularz
        </NuxtLink>

        <NuxtLink to="/submissions" class="text-gray-700 hover:text-blue-600">
          Zobacz listę zapisów
        </NuxtLink>
      </div>
    </nav>

    <main class="p-6">
      <slot />
    </main>

  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
