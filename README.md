## Getting Started

1. Run `docker-compose up --build -d` to spin up database.
2. Install dependencies: `npm ci`.
3. Start the application: `npm run dev`.
4. Seed the data:
   1. Call the endpoint *POST/* `http://localhost:3000/vaccine-seed`.
   2. Or use postman collection in the _postman_ folder

## Testing

1. `npm run test`

``` integrationperformancetest
 PASS  test/vaccine/vaccine.integration.test.ts (5.29 s)
  Vaccine
    ✓ no params (43 ms)
    ✓ querying full distance (21 ms)
    ✓ querying full distance with range 10 (17 ms)
    ✓ querying w13 to w20 distance (17 ms)
    ✓ querying out of match (18 ms)
```
