# API Reference

## Authentication

### POST `/api/auth/login`

Authenticate a user.

**Request body:**
```json
{
  "email": "employee@ecosphere.com",
  "password": "employee123"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "abc123",
    "email": "employee@ecosphere.com",
    "name": "Emily Employee",
    "role": "employee",
    "department": "Finance",
    "createdAt": "2025-07-12T..."
  }
}
```

Sets `sessionToken` HTTP cookie (7-day expiry).

**Errors:** `400` missing fields, `401` invalid credentials

---

### POST `/api/auth/signup`

Register a new account.

**Request body:**
```json
{
  "email": "user@company.com",
  "password": "secure123",
  "name": "Daniel Rajput",
  "role": "employee",
  "department": "Finance"
}
```

**Response (200):** Same shape as login.

**Errors:** `400` validation failure, `409` email already registered

---

## Server Actions

Located in `lib/actions/handlers.ts`:

| Action | Parameters | Description |
|--------|------------|-------------|
| `addActivity` | FormData (title, description, category) | Create CSR activity |
| `acceptChallenge` | challengeId | Accept a challenge |
| `redeemReward` | rewardId, xpCost | Redeem reward |
| `joinTeamQuest` | questId | Join team quest |
| `unlockAchievement` | achievementId | Unlock achievement |

All actions return `{ success: boolean, message: string }`.

---

## Client Auth Context

```typescript
const { user, login, signup, logout, updateProfile, switchRole } = useAuth()
```

| Method | Description |
|--------|-------------|
| `login(email, password)` | Authenticate and persist session |
| `signup(email, password, name, role, department?)` | Register and sign in |
| `logout()` | Clear session |
| `updateProfile({ name, department })` | Update user profile |
| `switchRole(role)` | Change active role (demo) |

---

## Future REST API (Planned)

When backend is integrated:

```
GET    /api/v1/dashboard
GET    /api/v1/departments/:id/scores
GET    /api/v1/csr-activities
POST   /api/v1/csr-activities
GET    /api/v1/challenges
POST   /api/v1/challenges/:id/participate
GET    /api/v1/reports?module=&department=&dateRange=
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for integration guidance.
