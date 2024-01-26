<template>
  <header>
    <nav>
      <RouterLink v-for="route in $router.options.routes" :key="route.path" :to="route.path">
        {{ route.meta.title }}
      </RouterLink>
    </nav>
  </header>
</template>
