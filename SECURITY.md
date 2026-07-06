# Security Notes

## HTTP headers
The app now applies basic security headers via middleware for all routes.

## Protected data updates
To update the JSON content securely, set the following environment variable before running the app:

```bash
DATA_EDIT_KEY=your-secret-key
```

Then send a POST request to `/api/update-data` with the `x-admin-key` header set to the same value.
