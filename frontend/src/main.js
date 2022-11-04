import { createApp } from 'vue'
import App from './App.vue'
import "./styles/Global.scss";
import "./styles/NavBar.scss";
import "./styles/Post.scss";
import router from './router'


createApp(App).use(router).mount('#app')