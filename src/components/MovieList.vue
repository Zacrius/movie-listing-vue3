<script setup lang="ts">
import { onMounted } from "vue";
import { useMovies } from "@/composables/useMovies";

const { movies, loading, error, fetchMovies } = useMovies();

onMounted(() => {
  fetchMovies(""); // initial load
});
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
}
</style>
