import { z } from 'zod'
import axios from 'axios'

const SubscribeSchema = z.object({
  email: z.string().email(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string()).optional(),
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  const validation = SubscribeSchema.safeParse(req.body)
  if (!validation.success) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid data', errors: validation.error.issues })
  }

  const { email, tags = ['918Runs'], metadata = {} } = validation.data

  try {
    await axios.post(
      'https://api.buttondown.email/v1/subscribers',
      { email, tags, metadata },
      { headers: { Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}` } }
    )

    return res.status(200).json({ success: true, message: 'Subscribed! Check your inbox.' })
  } catch (error) {
    console.error('Subscribe API Error:', error?.response?.data || error?.message || error)
    const status = error?.response?.status || 500
    const msg =
      status === 409
        ? 'You are already subscribed.'
        : 'An internal error occurred.'
    return res.status(status).json({ success: false, message: msg })
  }
}
