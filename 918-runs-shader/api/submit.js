import { RegistrationSchema } from '../src/data/schemas.js'
import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  const validation = RegistrationSchema.safeParse(req.body)

  if (!validation.success) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid data', errors: validation.error.issues })
  }

  const { parentEmail, playerName, improvementGoals = [] } = validation.data

  try {
    // Add subscriber to Buttondown
    await axios.post(
      'https://api.buttondown.email/v1/subscribers',
      {
        email: parentEmail, // Use parent's email for primary contact
        metadata: {
          playerName: playerName,
          goals: Array.isArray(improvementGoals) ? improvementGoals.join(', ') : '',
        },
        tags: ['918Runs'],
      },
      {
        headers: { Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}` },
      }
    )

    // Zero-DB: log the registration
    console.log('Successful registration:', validation.data)

    return res.status(200).json({ success: true, message: 'Registration successful!' })
  } catch (error) {
    console.error('API Error:', error?.response?.data || error?.message || error)
    return res.status(500).json({ success: false, message: 'An internal error occurred.' })
  }
}
