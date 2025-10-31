import { ref } from "vue";
import type { Movie, MovieApiResponse } from "@/types/movie";

export function useMovies() {
  const movies = ref<Movie[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalPages = ref(1);

  async function fetchMovies(title = "", page: number = 1) {
    try {
      loading.value = true;
      error.value = null;

      const response = await fetch(
        `https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${page}`
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: MovieApiResponse = await response.json();

      movies.value = data.data;
      currentPage.value = data.page;
      totalPages.value = data.total_pages;
    } catch (err: any) {
      error.value = err.message || "Failed to load movies";
    } finally {
      loading.value = false;
    }
  }

  return {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    fetchMovies,
  };
}
