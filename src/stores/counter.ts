import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// 声明并定义 store
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  // 返回的数据和方法
  return { count, doubleCount, increment }
},
  {//@ts-ignore
    persist: {
      enabled: true,
      strategies: [{ key: 'Components', storage: localStorage, }],
    },
  });