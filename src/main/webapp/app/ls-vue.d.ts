import Vue from 'vue';

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface VueConstructor {
    ls: any;
  }
}
