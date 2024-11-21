const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LoginPage.vue") },
      { path: "/movies", component: () => import("pages/MoviesPage.vue") },
    ],
  },
];

export default routes;
