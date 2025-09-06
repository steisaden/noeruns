# Phase 1: Data Model

Based on the feature specification and the chosen tech stack (`react-hook-form` + `Zod`), this document defines the data structures for the application. These Zod schemas will serve as the single source of truth for data validation on the client and server.

## Key Entities

### 1. Registration
Represents the data captured from a player during the session sign-up process. This is the primary payload for the `api/submit` serverless function.

**Zod Schema:**
```javascript
import { z } from 'zod';

export const RegistrationSchema = z.object({
  // Player Info
  playerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  playerEmail: z.string().email({ message: "Please enter a valid email." }),
  playerGrade: z.enum(["6th", "7th", "8th", "9th", "10th", "11th", "12th"]),
  
  // Parent/Guardian Info
  parentName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  parentEmail: z.string().email({ message: "Please enter a valid email." }),
  parentPhone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, { message: "Phone must be in (555) 555-5555 format." }),

  // Legal & Health
  emergencyContact: z.string().min(2, { message: "Emergency contact cannot be empty." }),
  waiverAccepted: z.boolean().refine(val => val === true, { message: "You must accept the waiver to continue." }),

  // Growth & Motivation
  improvementGoals: z.array(z.string()).optional(), // e.g., ["Left-hand finishing", "Defensive footwork"]
  
  // Session Info
  sessionId: z.string().uuid(), // The ID of the Sunday session they are registering for
});
```

### 2. Session
Represents a single, bookable Sunday training session. This data would likely be hard-coded or managed in a simple JSON file within the repository, as there is no CMS.

**Example Structure (JSON):**
```json
[
  {
    "sessionId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "date": "2025-10-05T14:00:00.000Z",
    "location": "Tulsa Union High School Gym",
    "maxCapacity": 20,
    "registeredCount": 15
  }
]
```

### 3. Highlight Clip
Represents a video uploaded by a player. The primary data will be managed by Cloudinary. Our application will only need to store the public URL provided by Cloudinary.

**Example Structure (as returned from `useCloudinaryGallery` hook):**
```javascript
{
  "id": "a1b2c3d4", // Cloudinary public ID
  "url": "https://res.cloudinary.com/demo/video/upload/f_auto,q_auto,w_800/highlight_reel.mp4",
  "thumbnailUrl": "https://res.cloudinary.com/demo/video/upload/f_auto,q_auto,w_400/highlight_reel.jpg",
  "playerName": "Jane Doe", // Optional metadata
  "uploadDate": "2025-09-15T10:30:00.000Z"
}
```

### 4. Newsletter Subscription
Represents the data sent to the Buttondown API. This is a subset of the `Registration` data.

**Buttondown API Payload:**
```javascript
{
  "email": "player-or-parent-email@example.com",
  "metadata": {
    "playerName": "Jane Doe",
    "grade": "9th",
    "goals": "Left-hand finishing, Defensive footwork"
  },
  "tags": ["918Runs", "Player"]
}
```
This structure ensures that when the newsletter is created in Buttondown, we have the necessary personalized information available as merge fields.
