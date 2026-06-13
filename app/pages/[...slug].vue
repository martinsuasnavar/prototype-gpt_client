<script setup lang="ts">
const route = useRoute()

// 1. Fetch data for the current path
const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

// 2. Break the redirect loop safely
if (!page.value) {
  if (route.path !== '/') {
    // If they are on a broken sub-path (like /xyz), bounce them to home
    await navigateTo('/')
  } else {
    // If they are on the root '/' and there's no index.md content, 
    // do NOT redirect. Let the template handle it or display a fallback.
    console.warn("No index.md found in the content collection for the root path.")
  }
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
  
  <div v-else class="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-neutral-400">
    <div class="text-center">
      <p class="text-lg font-bold">Welcome to Prototype GPT</p>
      <p class="text-sm text-neutral-500 mt-1">Create a file at <code class="text-xs bg-neutral-800 px-1 py-0.5 rounded text-neutral-300">content/index.md</code> to replace this view.</p>
    </div>
  </div>
</template>