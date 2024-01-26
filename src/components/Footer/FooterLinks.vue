<script setup>
const links = [
  {
    name: 'GitHub',
    url: 'https://github.com/itsTPM/foxford-tools',
  },
  {
    name: 'Website',
    url: 'https://fox.itstpm.tech',
  },
];
</script>

<template>
  <div>
    <ul>
      <li v-for="link in links" :key="link.name">
        <a :href="link.url" target="_blank">{{ link.name }}</a>
      </li>
    </ul>
  </div>
</template>
