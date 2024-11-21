<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-center q-mb-md">Listado de Películas</div>

    <q-item class="q-gutter-sm">
      <q-item-section>
        <q-input
          v-model="searchQuery"
          label="Buscar películas"
          outlined
          dense
          @input="fetchMovies"
          style="width: 100%"
        />
      </q-item-section>
      <q-item-section>
        <q-btn
          label="Buscar"
          color="primary"
          @click="fetchMovies"
          style="width: 100%"
        />
      </q-item-section>
    </q-item>

    <q-list bordered>
      <q-item v-for="movie in movies" :key="movie.id" class="q-mb-md">
        <q-item-section avatar>
          <img
            :src="`http://image.tmdb.org/t/p/w500${movie.poster_path}`"
            alt="Poster"
            style="width: 100px; height: 150px; object-fit: cover"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label
            ><strong>{{ movie.title }}</strong></q-item-label
          >
          <q-item-label caption>Votos: {{ movie.vote_count }}</q-item-label>
          <q-item-label caption
            >Calificación: {{ movie.vote_average }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movies: [],
      searchQuery: "",
      apiKey:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzY1ZDljOGVhZGU4NGExMGExZjM4OTgzMDA5Zjk1OSIsIm5iZiI6MTczMjE2ODY4Mi4zNTYyNzUsInN1YiI6IjY3M2ViZWQ1Y2U3MTg0MzRmMzhiZWI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x70vNLu9M4yFu9uX-MwX_-Qn1SP33gdqqE7_bCQSgKw",
    };
  },
  methods: {
    async fetchMovies() {
      const url = this.searchQuery
        ? `https://api.themoviedb.org/3/search/movie`
        : `https://api.themoviedb.org/3/discover/movie`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            Accept: "application/json",
          },
          params: {
            query: this.searchQuery,
            include_adult: false,
            include_video: false,
            language: "es-PE",
            page: 1,
            sort_by: "popularity.desc",
          },
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
  },
  mounted() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.q-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>
