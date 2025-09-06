import useCloudinaryGallery from '../hooks/useCloudinaryGallery'
import styles from './Gallery.module.css'

export default function Gallery() {
  const { items } = useCloudinaryGallery()
  return (
    <section className="section">
      <div className="container">
        <h2>Highlights</h2>
        <div className={styles.masonry}>
          {items.map((it) => (
            <a
              key={it.id}
              href={it.url}
              className={styles.item}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={it.thumbnailUrl} alt={it.playerName || 'Highlight'} loading="lazy" width="400" height="300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
