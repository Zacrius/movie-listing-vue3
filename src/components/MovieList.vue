<script setup lang="ts">
import { onMounted } from "vue";
import { useMovies } from "@/composables/useMovies";

const { movies, loading, error, fetchMovies, currentPage, totalPages } =
  useMovies();

onMounted(() => {
  fetchMovies(""); // initial load
});

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return;
  fetchMovies("", page);
}

function jumpToPage(offset: number) {
  const targetPage = currentPage.value + offset;
  if (targetPage < 1 || targetPage > totalPages.value) return;
  fetchMovies("", targetPage);
}
</script>

<template>
  <section class="movie-list">
    <h2>🎬 Movie Listing</h2>

    <div v-if="loading">Loading movies...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="movies.length === 0">No movies found.</div>
    <div v-else class="movie-table">
      <!-- Header -->
      <div class="movie-table__header">
        <div>Movie Title</div>
        <div>Year</div>
        <div>IMDB ID</div>
      </div>

      <!-- Rows -->
      <div v-for="movie in movies" :key="movie.imdbID" class="movie-table__row">
        <div class="movie-title">{{ movie.Title }}</div>
        <div class="movie-year">{{ movie.Year }}</div>
        <div class="movie-id">{{ movie.imdbID }}</div>
      </div>
    </div>

    <div class="pagination">
      <button
        class="pagination__btn"
        @click="jumpToPage(-10)"
        :disabled="currentPage <= 10"
      >
        &laquo;
      </button>
      <button
        class="pagination__btn"
        :disabled="currentPage === 1 || loading"
        @click="goToPage(currentPage - 1)"
      >
        < Prev
      </button>

      <div class="pagination__info">
        Page {{ currentPage }} of {{ totalPages }}
      </div>

      <button
        class="pagination__btn"
        :disabled="currentPage === totalPages || loading"
        @click="goToPage(currentPage + 1)"
      >
        Next >
      </button>
      <button
        class="pagination__btn"
        @click="jumpToPage(10)"
        :disabled="currentPage + 10 > totalPages"
      >
        &raquo;
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.movie-list {
  max-width: 600px;
  margin: 2rem auto;
  ul {
    list-style: none;
    padding: 0;
    li {
      padding: 0.75rem;
      border-bottom: 1px solid #ddd;
    }
  }
  .error {
    color: red;
  }
}
// Movie table style
.movie-table {
  display: grid;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #ddd;
  background: #fff;
  color: #666;
  text-align: center;

  /* Header */
  &__header {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    background: #f5f5f5;
    font-weight: 600;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #ddd;
  }

  /* Rows */
  &__row {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #eee;
    transition: background 0.2s ease;

    &:hover {
      background: #fafafa;
    }

    &:last-child {
      border-bottom: none;
    }

    .movie-title {
      font-weight: 500;
    }

    .movie-year,
    .movie-id {
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;

  &__btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease;

    &:hover:not(:disabled) {
      background: #1e4fd8;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  &__info {
    font-weight: 500;
    color: #444;
  }
}

/* 📱 Responsive layout */
@media (max-width: 600px) {
  .movie-table {
    border: none;

    &__header {
      display: none;
    }

    &__row {
      display: flex;
      flex-direction: column;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 0.75rem;
      margin-bottom: 0.75rem;
      padding: 1rem;

      .movie-title {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }

      .movie-year,
      .movie-id {
        font-size: 0.85rem;
        color: #888;
      }
    }
  }

  .pagination {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
