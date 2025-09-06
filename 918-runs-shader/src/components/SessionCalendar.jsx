import { useEffect, useState } from 'react'
import GlassCard from './common/GlassCard'
import styles from './SessionCalendar.module.css'

export default function SessionCalendar({ onSelect }) {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/src/data/sessions.json')
        const json = await res.json()
        setSessions(json)
      } catch (e) {
        console.error('Failed to load sessions.json', e)
      }
    }
    load()
  }, [])

  return (
    <section className="section">
      <div className="container">
        <h2>Upcoming Sessions</h2>
        <div className={styles.grid}>
          {sessions.map((s) => (
            <GlassCard key={s.sessionId} className={styles.card}>
              <div className={styles.when}>{new Date(s.date).toLocaleString()}</div>
              <div className={styles.where}>{s.location}</div>
              <div className={styles.meta}>
                {s.registeredCount}/{s.maxCapacity} registered
              </div>
              <button onClick={() => onSelect?.(s.sessionId)}>Choose Session</button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
