import { useState } from 'react'
import MagneticButton from './common/MagneticButton'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [optIn, setOptIn] = useState(false)
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setStatus(null)
    if (!optIn) {
      setStatus('Please confirm email opt-in to subscribe.')
      return
    }
    try {
      setSubmitting(true)
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tags: ['918Runs', 'Player'] }),
      })
      const json = await res.json()
      setStatus(json.message || (json.success ? 'Subscribed!' : 'Something went wrong.'))
    } catch (e) {
      setStatus('Network error. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>Get Weekly Challenges</h2>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.5rem', justifyItems: 'center' }}>
          <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                border: '1px solid color-mix(in srgb, var(--navy), transparent 80%)',
                borderRadius: 10,
                padding: '0.6rem 0.8rem',
              }}
            />
            <MagneticButton type="submit" disabled={submitting}>
              {submitting ? 'Subscribing…' : 'Subscribe'}
            </MagneticButton>
          </div>
          <label style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', fontSize: 14 }}>
            <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} />
            <span>
              I agree to receive weekly emails and understand I can unsubscribe anytime via the link in
              each email.
            </span>
          </label>
        </form>
        {status && <p style={{ marginTop: '0.75rem' }}>{status}</p>}
      </div>
    </section>
  )
}
