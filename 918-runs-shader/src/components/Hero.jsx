import { useEffect, useRef, useState } from 'react'
import { Metaballs } from '@paper-design/shaders-react'
import styles from './Hero.module.css'

export default function Hero() {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setVisible(entry.isIntersecting)
      },
      { root: null, threshold: 0.1 }
    )
    io.observe(containerRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <section className={`section ${styles.hero}`} ref={containerRef}>
      <div className={styles.canvasWrap} aria-hidden={reducedMotion ? 'true' : 'false'}>
        {!reducedMotion && visible && (
          <Metaballs
            colorBack={'var(--cream)'}
            colors={['var(--red)', 'var(--navy)']}
            count={6}
            size={0.75}
            speed={0.4}
            scale={1.2}
            style={{ width: '100%', height: '60vh' }}
          />
        )}
        {reducedMotion && <div className={styles.fallback} />}
      </div>
      <div className={`container ${styles.content}`}>
        <h1 className={styles.headline}>
          <span className={styles.reveal}>Level Up Every Sunday.</span>
        </h1>
        <p className={styles.sub}>918 Runs — Tulsa girls’ basketball training</p>
      </div>
    </section>
  )
}
