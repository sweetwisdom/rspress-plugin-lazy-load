import { useEffect } from 'react'
import { useLocation } from 'rspress/runtime'

interface LazyLoadProps {
  rootMargin?: string
  threshold?: number | number[]
}

export default function LazyLoad({ rootMargin = '200px', threshold = 0.01 }: LazyLoadProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            // 获取原始地址
            const src = img.getAttribute('data-src')
            if (src) {
              img.src = src
              img.removeAttribute('data-src')
            }
            // 停止观察已加载的图片
            observer.unobserve(img)
          }
        })
      },
      { rootMargin, threshold }
    )

    const images = document.querySelectorAll('img')
    images.forEach(img => {
      // 如果图片还没有加载且没有被处理过
      if (img.src && !img.hasAttribute('data-src') && !img.complete) {
        // 将当前的 src 转移到 data-src，并设置一个占位图（可选）
        // 注意：在 Rspress 这种 SSR/SSG 框架中，为了防止首屏闪烁，
        // 建议在 Markdown 编译阶段处理 src，或者在这里仅对非首屏图片处理。
        // 这里演示通用逻辑：
        const currentSrc = img.src
        img.setAttribute('data-src', currentSrc)
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' // 透明占位图
        observer.observe(img)
      } else if (img.hasAttribute('data-src')) {
        observer.observe(img)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [pathname, rootMargin, threshold])

  return null
}
