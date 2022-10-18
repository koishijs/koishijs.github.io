<template>
  <div class="starter-container page">
    <div class="top" />
    <div class="content">
      <content />
    </div>
    <div class="chooser">
      <div class="chooser-usage">
        <div class="chooser-header">
          <span>我使用 Koishi……</span>
        </div>
        <div class="chooser-select">
          <div class="chooser-select-item" :data-selected="chooserUsage === 'non-dev'"
            @click="chooserUsage = 'non-dev'">&gt; 用于搭建机器人服务。</div>
          <div class="chooser-select-item" :data-selected="chooserUsage === 'dev'" @click="chooserUsage = 'dev'">&gt;
            用于开发。 </div>
        </div>
      </div>
      <div v-if="chooserUsage === 'non-dev'">
        <div class="chooser-env">
          <div class="chooser-header">
            <span>我的运行环境是……</span>
          </div>
          <div class="chooser-select">
            <div class="chooser-select-item" :data-selected="chooserUsage" @click="chooserUsage = true">&gt; Windows。
            </div>
            <div class="chooser-select-item" :data-selected="!chooserUsage" @click="chooserUsage = false">&gt; macOS。
            </div>
            <div class="chooser-select-item" :data-selected="!chooserUsage" @click="chooserUsage = false">&gt; Linux。
            </div>
            <div class="chooser-select-item" :data-selected="!chooserUsage" @click="chooserUsage = false">&gt; Android。
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="chooser-env">
          <div class="chooser-header">
            <span>我希望 Koishi 作为……</span>
          </div>
          <div class="chooser-select">
            <div class="chooser-select-item" :data-selected="chooserUsage" @click="chooserUsage = true">> 一个独立的项目。
            </div>
            <div class="chooser-select-item" :data-selected="!chooserUsage" @click="chooserUsage = false">> 其他 Node
              项目的依赖。 </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const chooserUsage = ref('non-dev')
</script>

<style lang="scss" scoped>
.top {
  height: 20vh;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
}

.chooser {
  max-width: 820px;
  margin: 0 auto;

  &-header {
    background-color: var(--c-bg-home);
    padding: 12px 36px;
    font-size: 1.2rem;
  }

  &-select {
    display: flex;
    justify-content: space-between;

    @media (max-width: 719px) {
      & {
        flex-direction: column;
      }
    }

    &-item {
      flex: 1;
      padding: 24px 36px;
      font-size: 1.2rem;
      font-weight: bold;

      background-color: var(--c-bg-dark);

      transition: background-color 0.1s ease;

      &:hover,
      &[data-selected="true"] {
        background-color: var(--c-primary);
      }
    }
  }
}
</style>
