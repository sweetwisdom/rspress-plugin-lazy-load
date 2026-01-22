# Rspress 图片懒加载插件 (Intersection Observer)

该插件使用 `Intersection Observer API` 实现对图片懒加载的精细化控制。相比原生 `loading="lazy"`，它允许你自定义加载触发的时机（如提前 200px 加载）。

## 安装

将插件代码复制到你的 Rspress 项目中。

## 使用方法

在 `rspress.config.ts` 中注册插件，并可以传入配置参数：

```ts
import { defineConfig } from 'rspress/config';
import { pluginLazyLoad } from './rspress-plugin-lazy-load';

export default defineConfig({
  plugins: [
    pluginLazyLoad({
      // 距离视口还有 200px 时开始加载
      rootMargin: '200px',
      // 只要图片出现 1% 就触发
      threshold: 0.01,
    })
  ],
});
```

## 配置项

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `rootMargin` | `string` | `'200px'` | 触发加载的边界偏移量，类似于 CSS 的 margin。 |
| `threshold` | `number \| number[]` | `0.01` | 目标元素与视口重叠程度的阈值。 |

## 原理

1. **配置传递**：利用 Rspress 的 `globalUIComponents` 支持传递 props 的特性，将用户配置传递给客户端组件。
2. **DOM 转换**：组件在挂载时，会将 `<img>` 的 `src` 转移到 `data-src` 属性中，并替换为透明占位图。
3. **观察者模式**：使用 `IntersectionObserver` 监听图片。当图片进入定义的 `rootMargin` 范围时，将 `data-src` 还原回 `src`，触发浏览器下载图片。
4. **路由适配**：通过监听 `pathname` 变化，确保在 SPA 页面跳转后，新页面的图片能被重新扫描并观察。
