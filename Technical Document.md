# 🎓 College Connect — Web App

**Target Release:** Version 1.0  
**Document Status:** Draft  
**Document Owner:**  
**Designer:**  
**Developers:**  
**Q&A Contact:**  

---

## 📘 Project Background

The goal of **College Connect** is to create a **college social media web application** that enables students to easily **connect, communicate, and engage** with campus clubs and organizations.  
Many students struggle to stay updated on events or discover new organizations that match their interests.  
This platform aims to solve that by offering a centralized space where students can:

- Follow and interact with clubs  
- View announcements and upcoming events  
- Post updates, images, and discussions  
- Customize profiles to showcase involvement  

---

## ✅ Requirements

| # | User Story Title | User Story Description | Priority | Notes |
|---|------------------|------------------------|-----------|--------|
| 1 | **Login Page** | Users can log in | 1 | — |
| 2 | **Register Page** | Users can register | 2 | Must verify college email domain |
| 3 | **Posts Page** | Users can post | 4 | Posts may include text, images, and links |
| 4 | **Set Up Database** | User info is stored in the database | 3 | Database setup required before posting |
| 5 | **User Profile** | Users have profiles | 5 | Display profile picture, bio, and joined clubs |
| 6 | — | — | — | — |
| 7 | — | — | — | — |
| 8 | — | — | — | — |

---

## 🧭 User Interaction Flow

Register/Login →
User signs in using college credentials.

Homepage →
Displays posts and events from followed clubs.

Browse Clubs →
Users explore and follow clubs of interest.

Club Page →
Shows club details, members, and posts.

Event Interaction →
Students RSVP or comment on events.

Profile →
Users update info, view posts, and manage followed clubs.


---

## ❓ Questions & Outcomes

| Question | Outcome |
|-----------|----------|
| Should users be able to message each other directly? | Possibly in Version 2.0; initial release focuses on club interaction. |
| Will there be a moderation system for posts or comments? | Yes — club admins and global moderators can delete inappropriate content. |
| Should event reminders sync with Google or Outlook calendars? | Possibly in a later version. |

---

## 🚫 Not Doing (Version 1.0)

| Not Doing | Reason |
|------------|---------|
| Direct messaging between users | Deferred to a future version; focus on group interaction first. |
| Paid or premium club features | All clubs have equal access in Version 1.0. |

---

## 🏁 Sprint Plan

| Sprint | Activities | Comments / Notes |
|---------|-------------|------------------|
| **Sprint 1** | Design wireframes, plan database schema | Define user flows, confirm college branding |
| **Sprint 2** | Develop authentication (login/register) and integrate database | Test user registration and login validation |
| **Sprint 3** | Implement club and post functionality | Add CRUD operations for clubs and posts |
| **Sprint 4** | Add event calendar and club admin dashboard | Test event creation and user RSVP |

---

## 📄 Summary

Version 1.0 of **College Connect** focuses on building the foundation for student-club engagement:

- Secure login and registration  
- User and club profiles  
- Posting system  
- Event interaction and basic moderation  

Future versions aim to expand with messaging, mobile support, and calendar integrations.
