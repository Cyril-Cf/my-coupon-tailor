# Coupon Rules System

## Launching the app

## JSON Parameters Structure

The `parameters` field stores conditions in JSON format. Here is an example structure:

```json
{
  "FECHO": {
    "city": "Lyon",
    "condition": "sunny",
    "temperature_above": 25
  },
  "PAIPAIR": {
    "even_day_only": true
  }
}
```

## Tasks

- [x] Define JSON rule structure
- [x] Implement Admin role middleware
- [ ] Only a user with admin role can read and modify the rules
