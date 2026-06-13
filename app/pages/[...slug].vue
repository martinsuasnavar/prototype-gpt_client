<script setup lang="ts">
const route = useRoute()

// 1. Fetch data for the current path
const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

// 2. If the page doesn't exist, quietly redirect them to the home page
if (!page.value) {
  await navigateTo('/')
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>