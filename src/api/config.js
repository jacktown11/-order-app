import axios from 'axios';

// 设置分别设置开发环境和生产环境下axios的全局baseURL默认参数
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  axios.defaults.baseURL = 'http://localhost:8080/';
} else {
  // 这时我的项目放到github上，发布后的根地址
  // axios.defaults.baseURL = 'https://jacktown11.github.io/order-app/';

  // 这是项目本地build后的地址（前面的projects是由于我把整个项目放在了本地的apache服务器htdocs根目录下的projects子目录中
  // 额外说明：开发环境下用的是vue-cli提供的本地服务器，端口是设定的8080，apache服务不起作用；本地build后，仍然需要一个本地服务器来访问，这时apache服务器就起作用了，端口是默认的80）
  axios.defaults.baseURL = 'http://127.0.0.1/projects/order-app/dist/';
}

// 生成环境下的axios的拦截器（实际上开发环境中也有代理的，在vue.config.js的devServer中配置的）
if (process.env.NODE_ENV === 'production') {
  axios.interceptors.request.use(function (config) {
    let url = config.url.replace(/api\/([^\/\?]+)/, 'mock/data.json');
    config.url = url;
    config.dataKey = RegExp.$1;
    return config;
  });
  axios.interceptors.response.use(function (res) {
    res.data = {
      errNum: 0,
      data: res.data[res.config.dataKey]
    };
    return res;
  });
}
