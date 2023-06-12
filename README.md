# tinyhouse-airbnb-clone

TinyHouse - Airbnb Clone

# TinyHouse | Full Stack Airbnb-like house-sharing app

Real home-sharing app including authentication, data persistence, payments, and deployment based on the [newline course](https://www.newline.co/tinyhouse).

### Tech Stack

| Tech                   | Decision                                                                                                                                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React                  | React custom hooks to manage component logic                                                                                                                                                             |
| Node                   | Web server with Node and Express to serve GraphQL API and handle API requests by querying and manipulating data from MongoDB                                                                             |
| GraphQL, Apollo Server | Client tells the server exactly what it needs, and the server responds back with the typed data. Every field in the schema is type defined. It is performant as no useless data needs to be transferred. |
| MongoDB                | Configured with the project's TypeScript compiler to leverage basic types & advance types (DefinitelyTyped repository)                                                                                   |
| TypeScript             | Used on both client & server for a robust type-safe application                                                                                                                                          |
| Ant Design             | Leverage Ant Design system & React UI for presentable components                                                                                                                                         |

### High-Level Features checklist

- [x] Single Page App prototype with with GraphQL schema, mock data, Ant styling, MongoDB connection, type-definition
- [x] Fetch & display listings in barebone app (temporary for testing AP))
- [x] Delete listings in barebone app (temporary)
- [] Barebone app skeleton
- [] Sign-in, user registration (Google OAuth 2.0)
- [] Search for listings in different locations in the world (Google Geocoding API integration)
- [] Book listing for a period of time (signed in only)
- [] Stripe API setup
- [] Create listings (hosts only)
- [] Receive payments through Stripe (hosts only)
- [] See a history of created listings & bookings made on each listing
- [] See the history of listings created by other users
- [] Heroku deployment
