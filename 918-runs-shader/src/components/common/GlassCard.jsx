import styles from './GlassCard.module.css'

export default function GlassCard({ children, className = '', ...props }) {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {children}
    </div>
  )
}
