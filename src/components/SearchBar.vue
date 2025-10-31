<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";

const emit = defineEmits<{
  (e: "search", query: string): void;
}>();

const query = ref("");

let debounceTimer: number | undefined;
watch(query, (newValue) => {
  clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => {
    emit("search", newValue.trim());
  }, 300);
});
</script>

<template>
  <div class="search-bar">
    <input
      v-model="query"
      type="text"
      placeholder="Search for movies by title..."
      class="search-bar__input"
    />
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;

  &__input {
    width: 100%;
    max-width: 400px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: #007aff;
      box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
    }
  }
}
</style>
