import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RegistrationSchema } from '../data/schemas'
import MagneticButton from './common/MagneticButton'
import styles from './RegisterForm.module.css'

export default function RegisterForm({ sessionId }) {
  const [serverMessage, setServerMessage] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      playerName: '',
      playerEmail: '',
      playerGrade: '9th',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      emergencyContact: '',
      waiverAccepted: false,
      improvementGoals: '',
      sessionId: sessionId || '',
    },
  })

  const onSubmit = async (raw) => {
    setServerMessage(null)

    // Convert improvementGoals comma-separated string to array
    const data = {
      ...raw,
      improvementGoals: raw.improvementGoals
        ? String(raw.improvementGoals)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      sessionId: raw.sessionId || sessionId || crypto.randomUUID(),
    }

    const parsed = RegistrationSchema.safeParse(data)
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const name = issue.path[0]
        setError(name, { type: 'manual', message: issue.message })
      })
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      const json = await res.json()
      setServerMessage(json.message || (json.success ? 'Success!' : 'Something went wrong'))
    } catch (e) {
      setServerMessage('Network error. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h2>Register for Sunday Session</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.grid}>
            <label className={styles.field}>
              <span>Player Name</span>
              <input type="text" {...register('playerName')} />
              {errors.playerName && <em>{errors.playerName.message}</em>}
            </label>
            <label className={styles.field}>
              <span>Player Email</span>
              <input type="email" {...register('playerEmail')} />
              {errors.playerEmail && <em>{errors.playerEmail.message}</em>}
            </label>
            <label className={styles.field}>
              <span>Grade</span>
              <select {...register('playerGrade')}>
                {['6th','7th','8th','9th','10th','11th','12th'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              {errors.playerGrade && <em>{errors.playerGrade.message}</em>}
            </label>
            <label className={styles.field}>
              <span>Parent Name</span>
              <input type="text" {...register('parentName')} />
              {errors.parentName && <em>{errors.parentName.message}</em>}
            </label>
            <label className={styles.field}>
              <span>Parent Email</span>
              <input type="email" {...register('parentEmail')} />
              {errors.parentEmail && <em>{errors.parentEmail.message}</em>}
            </label>
            <label className={styles.field}>
              <span>Parent Phone (555) 555-5555</span>
              <input type="tel" placeholder="(555) 555-5555" {...register('parentPhone')} />
              {errors.parentPhone && <em>{errors.parentPhone.message}</em>}
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Emergency Contact</span>
              <input type="text" {...register('emergencyContact')} />
              {errors.emergencyContact && <em>{errors.emergencyContact.message}</em>}
            </label>
            <label className={`${styles.field} ${styles.full}`}>
              <span>Improvement Goals (comma separated)</span>
              <input type="text" placeholder="Left-hand finishing, Defensive footwork" {...register('improvementGoals')} />
              {errors.improvementGoals && <em>{errors.improvementGoals.message}</em>}
            </label>
            <label className={`${styles.checkbox} ${styles.full}`}>
              <input type="checkbox" {...register('waiverAccepted')} />
              <span>I accept the waiver</span>
            </label>
            <input type="hidden" {...register('sessionId')} />
          </div>

          <MagneticButton type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Register'}
          </MagneticButton>
        </form>
        {serverMessage && <p role="status" style={{ marginTop: '1rem' }}>{serverMessage}</p>}
      </div>
    </section>
  )
}
