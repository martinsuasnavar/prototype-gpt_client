<template>
  <main class="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-8">
    
    <ContentDoc v-slot="{ doc }">
      <article class="max-w-none prose prose-invert">
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>

    <template #empty>
      <div class="flex flex-col items-center justify-center min-h-[50vh] text-neutral-500">
        <p class="text-base italic">No document content found at this route template layout.</p>
      </div>
    </template>

  </main>
</template>

<script setup>
// Nuxt Content v3 handles the route matching automatically behind the scenes via the filename token!
</script>