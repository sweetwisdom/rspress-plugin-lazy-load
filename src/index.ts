import type { RspressPlugin } from '@rspress/shared';
import path from 'node:path';

interface LazyLoadOptions {
  /**
   * 距离视口距离
   */
  rootMargin?: string;
  /**
   * 图片展示百分比
   */
  threshold?: number | number[];
}

export function pluginLazyLoad(options: LazyLoadOptions = {}): RspressPlugin {
  return {
    name: 'rspress-plugin-lazy-load',
    globalUIComponents: [
      [path.join(__dirname, '../static/LazyLoad.tsx'), options]
    ],
  };
}
