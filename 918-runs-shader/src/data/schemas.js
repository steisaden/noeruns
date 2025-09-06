import { z } from 'zod'

export const RegistrationSchema = z.object({
  // Player Info
  playerName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  playerEmail: z.string().email({ message: 'Please enter a valid email.' }),
  playerGrade: z.enum(['6th', '7th', '8th', '9th', '10th', '11th', '12th']),

  // Parent/Guardian Info
  parentName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  parentEmail: z.string().email({ message: 'Please enter a valid email.' }),
  parentPhone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, { message: 'Phone must be in (555) 555-5555 format.' }),

  // Legal & Health
  emergencyContact: z.string().min(2, { message: 'Emergency contact cannot be empty.' }),
  waiverAccepted: z.boolean().refine((val) => val === true, { message: 'You must accept the waiver to continue.' }),

  // Growth & Motivation
  improvementGoals: z.array(z.string()).optional(),

  // Session Info
  sessionId: z.string().uuid(),
})
