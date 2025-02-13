# Coupon Rules System

## Main logic

The idea is to have coupon verification logic based on rules saved in the database.
The coupon itself is not considered here in its form, it must simply be a vector
allowing you to identify the rule to be checked. So, it can be a QR code, an email to click,
an image with hidden elements, as long as it carries information allowing you to know which rule
must be verified (using its ID). The idea is that the attempt to validate the coupon
causes a search for the associated rule, and returns an appropriate response (valid or not).
Firstly, the ID is passed as a parameter of a request in a visible way, but we can
totally imagine encoding it via a JWT, encrypting it to add security.

### Rules

The rules are managed in the database with elements such as the name, its type (managed by an ENUM),
and its parameters managed by a column in JSON. Each type will be associated with a specific JSON format
(for example, the FECHO type must have a specific JSON object). In addition, a rule may depend
other rules, which will make it possible to validate several elements before sending back
an answer.

### Admin

Administrative rules prevent consultation (and later modification or addition) of rules
by means of authentication by JWT and with the assignment of an admin role.

## Launching the app

The application is partly containerized for the backend and the database. It will first be necessary
copy the environment files and possibly change their content:

```
cp .env.local .env
cp ./back/.env.local ./back/.env
```

Then, launch the docker containers:

```
docker compose up -d
```

Once the containers are launched and ready, you must apply the migrations by entering the "back" service and running:

```
npm run migration:run
```

## Testing the app

Simply open the index.html provided in the ./front folder and follow the instructions

## Example of JSON Parameters Structure

The `parameters` field stores conditions in JSON format for the rules. Here is an example structure for the FECHO rule:

```json
{
  "parameters": {
    "FECHO": {
      "city": "Lyon",
      "condition": "sunny",
      "temperature_above": 25
    }
  }
}
```

## Tasks

- [x] Define JSON rule structure
- [x] Implement Admin role middleware
- [x] Simplistic frontend for testing purposes
- [ ] Only a user with admin role can read and modify the rules
