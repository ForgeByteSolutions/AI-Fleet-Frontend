# Profile Avatar Setup

## Adding the Profile Image

1. Save the profile avatar image you provided to: `frontend/public/profile-avatar.png`

The ProfileAvatar component will automatically:
- Load the image from the public folder
- Display the user's role below the avatar
- Show a tooltip with the user's email on hover
- Fallback to the first letter if image doesn't load

## How It Works

1. **JWT Decoding**: The login now decodes the JWT token to extract the user's role
2. **Profile Display**: Shows the actual role (Admin/Viewer) from the token
3. **Image Avatar**: Uses the profile-avatar.png image you provide
4. **Dropdown Menu**: Click the avatar to see email, role, and logout option

## JWT Token Structure

The backend JWT should include the `role` field:
```json
{
  "sub": "user_email@example.com",
  "role": "Admin",
  "iat": 1234567890
}
```

If your backend doesn't include role in the JWT, please update the backend or add a `/auth/me` endpoint.
