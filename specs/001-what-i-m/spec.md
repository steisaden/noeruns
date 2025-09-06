# Feature Specification: 918 Runs: Registration and Motivation Platform

**Feature Branch**: `001-what-i-m`  
**Created**: 2025-09-06  
**Status**: Draft  
**Input**: User description: "# WHAT I’m Building A single-page, mobile-first web platform for **918 Runs**, a Tulsa-based girls’ basketball training program. It’s a **registration + motivation engine**: players (grades 6-12) sign up for Sunday sessions, upload highlight clips, and receive **personalized newsletters** that match the skills they said they want to improve. The entire stack is open-source and deploys free: GitHub Pages for the front end, Render for the tiny Node layer, no paid databases. # WHY I’m Building It 1. **Replace the Instagram DM chaos** – coaches currently juggle RSVPs, waivers, and video clips in DMs; one link ends the mess. 2. **Capture data the program never had** – parent contacts, emergency info, and *self-declared goals* are now structured and searchable. 3. **Automate encouragement** – the newsletter tool turns each girl’s goals (“better left-hand finish”, “lock-down defense”) into automatic weekly challenges, quotes, and drill videos. 4. **Showcase growth** – the masonry gallery lets players see themselves improving week-to-week, fueling retention and word-of-mouth. 5. **Zero budget, zero vendor lock-in** – built with Warp + MCPs, themed strictly to the logo colors, and hosted for free so every dollar stays on the court, not in SaaS fees."

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
A basketball player (grades 6-12) can easily sign up for training sessions, share their highlight videos, and get personalized tips to improve their game, while coaches can manage the program without the hassle of DMs.

### Acceptance Scenarios
1. **Given** a player is on the 918 Runs website, **When** they fill out the registration form for a Sunday session, **Then** they are confirmed for that session and the coach is notified.
2. **Given** a player is logged in, **When** they upload a video file, **Then** the video is added to their profile and appears in the public gallery.
3. **Given** a player has set their improvement goals, **When** the weekly newsletter is sent, **Then** it contains challenges, quotes, and videos relevant to their goals.
4. **Given** a coach is logged in, **When** they view the roster, **Then** they see all registered players' contact and emergency information.

### Edge Cases
- What happens when a player tries to register for a session that is full?
- How does the system handle video uploads that fail or are in an unsupported format?
- What happens if a player has no specific goals set? What does their newsletter contain?
- What if the external sources for drill videos are unavailable?

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST allow players (grades 6-12) to register for upcoming Sunday training sessions.
- **FR-002**: System MUST allow registered players to upload video highlight clips.
- **FR-003**: System MUST allow players to specify skills they want to improve.
- **FR-004**: System MUST automatically generate and send personalized weekly newsletters based on player-specified goals.
- **FR-005**: System MUST display uploaded highlight clips in a public, masonry-style gallery.
- **FR-006**: System MUST provide a way for coaches to view and manage player registration data, including parent and emergency contact information.
- **FR-007**: The platform MUST be mobile-first.
- **FR-008**: System MUST operate with no ongoing hosting or database costs.
- **FR-009**: System MUST authenticate users via [NEEDS CLARIFICATION: Auth method not specified - email/password, social login, or something simpler for minors?].
- **FR-010**: System MUST source content (quotes, drill videos) for newsletters from [NEEDS CLARIFICATION: Source for motivational/training content not specified].

### Key Entities *(include if feature involves data)*
- **Player**: Represents a participant in the program. Attributes: name, grade, parent contact info, emergency contact info, self-declared goals.
- **Session**: Represents a single Sunday training event. Attributes: date, location, registered players.
- **HighlightClip**: Represents a video uploaded by a player. Attributes: player, video URL, upload date.
- **Newsletter**: Represents the weekly personalized email. Attributes: player, generated content, date sent.

---

## Review & Acceptance Checklist

### Content Quality
- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Requirements are testable and unambiguous  
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified