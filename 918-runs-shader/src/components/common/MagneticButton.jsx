import { useRef } from 'react'
import styles from './MagneticButton.module.css'

export default function MagneticButton({ children, className = '', ...props }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.setProperty('--x', `${x}px`)
    el.style.setProperty('--y', `${y}px`)
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--x', `0px`)
    el.style.setProperty('--y', `0px`)
  }

  return (
    <button
      ref={ref}
      className={`${styles.magnetic} ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      <span className={styles.inner}>{children}</span>
    </button>
  )
}
