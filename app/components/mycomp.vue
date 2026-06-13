<template>
  <div class="w-full h-screen bg-[#0d0d0d] flex flex-col font-sans text-white overflow-hidden">
    
    <header class="w-full h-12 bg-[#1a1a1a] flex items-center px-5 select-none shrink-0">
      <h1 class="text-xs font-bold tracking-widest text-neutral-300">PROTOTYPE GPT</h1>
    </header>

    <main class="flex-1 p-6 md:p-8 flex flex-col space-y-6 overflow-y-auto">
      
      <div v-if="messages.length === 0" class="flex-1 flex items-center justify-center text-neutral-500 text-sm italic">
        Welcome to PrototypeGPT
      </div>

      <div 
        v-for="(msg, index) in messages" 
        :key="index"
        :class="msg.role === 'user' ? 'self-end max-w-[65%] p-5 bg-[#333333] rounded-[2rem] rounded-tr-none' : 'self-start max-w-[70%] p-2 text-white'"
      >
        <p class="text-sm md:text-[15px]  leading-relaxed tracking-wide">
          {{ msg.text }}
        </p>
      </div>

    </main>

    <footer class="p-6 md:p-8 pt-2 bg-[#0d0d0d] shrink-0">
      <form @submit.prevent="handleSubmit" class="flex items-center gap-4 max-w-none">
        
        <input 
          v-model="inputBuffer"
          type="text" 
          placeholder="Write your prompt here..." 
          class="flex-1 h-12 bg-[#333333] border-none rounded-xl px-5 text-sm md:text-base text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
        />

        <button 
          type="submit" 
          class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-neutral-200 active:scale-95 transition-all shadow-md shrink-0 shadow-white/5"
        >
          <img src="/send-icon.png" height="35" width="35" alt="Send" />
        </button>

      </form>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// CONFIGURATION TOGGLE
// Set to true for local development, false for production deployment
const isLocalhost = ref(false)

const API_BASE_URL = computed(() => {
  return isLocalhost.value 
    ? 'http://localhost:8000' 
    : 'https://martinsuasnavar-prototype-gpt-server.hf.space' 
})

const inputBuffer = ref('')
const messages = ref([])

// Helper function that simulates the typewriter animation effect
const typeWriterEffect = (fullText, targetMessageRef, speedMs = 30) => {
  return new Promise((resolve) => {
    let currentIdx = 0
    
    const interval = setInterval(() => {
      if (currentIdx < fullText.length) {
        targetMessageRef.text += fullText.charAt(currentIdx)
        currentIdx++
      } else {
        clearInterval(interval)
        resolve()
      }
    }, speedMs)
  })
}

const handleSubmit = async () => {
  const promptText = inputBuffer.value.strip ? inputBuffer.value.strip() : inputBuffer.value.trim()
  if (!promptText) return
  
  messages.value.push({ role: 'user', text: promptText })
  inputBuffer.value = '' 

  try {
    // Dynamic routing path calculation
    const endpoint = `${API_BASE_URL.value}/api/chat`
    
    const data = await $fetch(endpoint, {
      method: 'POST',
      body: { prompt: promptText }
    })
    
    const assistantMessage = ref({ role: 'assistant', text: '' })
    messages.value.push(assistantMessage.value)
    
    await typeWriterEffect(data.reply, assistantMessage.value, 25)

  } catch (error) {
    console.error("Failed connecting to Python AI:", error)
    messages.value.push({ role: 'assistant', text: "Error: Unable to read tokens from server. Server may be unoperative at this moment." })
  }
}
</script>