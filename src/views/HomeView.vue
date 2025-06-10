<template>
  <div id="home">
    <div class="lun">
      <a-carousel
        :style="{
          width: '100%',
          height: '240px',
        }"
        :auto-play="true"
        indicator-type="line"
        show-arrow="hover"
        animation-name="card"
      >
        <a-carousel-item
          v-for="image in images"
          :key="image"
          :style="{ width: '60%' }"
        >
          <img
            :src="image"
            :style="{
              width: '100%',
            }"
          />
        </a-carousel-item>
      </a-carousel>
    </div>
    <a-row justify="space-between" style="margin-top: 10px">
      <a-col :span="10">
        <div>
          <h2>新闻动态</h2>
          <a-divider />
          <a-timeline>
            <a-timeline-item
              v-for="(item, index) in newsList"
              :key="item.id || index"
            >
              <div class="title">{{ item.title }}</div>
              <div class="content">
                <div>{{ item.author }}</div>
                <div>
                  <icon-calendar-clock size="15px" />
                  {{ formatTime(item.publish_time || item.createTime) }}
                </div>
              </div>
              <a-divider :size="1" style="border-bottom-style: dotted" />
            </a-timeline-item>
          </a-timeline>
        </div>
      </a-col>
      <a-col :span="10">
        <div>
          <h2>学术动态</h2>
          <a-divider />
          <a-timeline>
            <a-timeline-item
              v-for="(item, index) in papersList"
              :key="item.id || index"
            >
              <div class="title">{{ item.title }}</div>
              <div class="content">
                <div>{{ item.author }}</div>
                <div>
                  <icon-calendar-clock size="15px" />
                  {{ formatTime(item.createTime) }}
                </div>
              </div>
              <a-divider :size="1" style="border-bottom-style: dotted" />
            </a-timeline-item>
          </a-timeline>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { GetNewsParams, NewsItem } from "@/api/types/news";
import { getNewsList } from "@/api/services/news";
import { Message } from "@arco-design/web-vue";
import { formatTime } from "@/plugins/utils";
import { GetPapersParams, PaperItem } from "@/api/types/papers";
import { getPapers } from "@/api/services/papers";
import { images } from "@/plugins/constant";
const newsParams = ref<GetNewsParams>({
  pageSize: 5,
  pageNum: 1,
});
const newsList = ref<NewsItem[]>([]);
const loadNews = async () => {
  const res = await getNewsList(newsParams.value);
  if (res.data.code === 200) {
    newsList.value = res.data.data.items;
  } else {
    Message.error("加载新闻失败" + res.data.message);
  }
};

const papersList = ref<PaperItem[]>([]);
const searchParams = ref<GetPapersParams>({
  pageSize: 5,
  pageNum: 1,
});
const loadPapers = async () => {
  const res = await getPapers(searchParams.value);
  if (res.data.code === 200) {
    papersList.value = res.data.data.items;
  } else {
    Message.error("加载失败" + res.data.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadNews();
  loadPapers();
});
</script>

<style scoped>
#home {
  padding: 0 30px;
  .lun {
    margin: 0 auto;
  }
  .title {
    font-weight: bold;
    margin-bottom: 8px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    color: #999; /* 灰色（十六进制，常用写法） */
    font-size: 12px; /* 字号变小，可根据需求调整 */
  }
}
</style>

<style scoped>
#home {
  padding: 0 30px;
  .lun {
    margin: 0 -30px;
  }
  .title {
    font-weight: bold;
    margin-bottom: 8px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    color: #999; /* 灰色（十六进制，常用写法） */
    font-size: 12px; /* 字号变小，可根据需求调整 */
  }
}
</style>
