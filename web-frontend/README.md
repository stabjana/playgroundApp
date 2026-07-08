# This is the frontend for my playground app

# Idea

I would like to create a playground app that lists playgrounds in Helsinki. Users should be able to view them either on a map or in a list.

All features available at each playground should be listed.

Future enhancements include a 3D model of each playground.

It should be possible to upload images.

Users should be able to browse and explore playgrounds without logging in.

Users should be able to submit ratings.

There should be an age recommendation for individual play equipment as well as for the entire playground.

Information about seating, sun protection, and rain shelters should also be included.

The playgrounds should be stored in a database.

The design should align with the City of Helsinki's design so that it can easily be integrated into their official pages later.

Is the design system publicly available?

## 1. Technology Choice

Since this is a modern web application, I recommend using React with TypeScript. Why?

### React

- Widely adopted and easy to maintain
- Excellent performance for maps and interactive components
- Easy to integrate with existing city websites

### TypeScript

- Static typing leads to fewer errors
- Better maintainability, especially for larger projects

## 2. Frameworks & Libraries

- React with Tailwind CSS for a modern UI
- NestJS
- Supabase and PostGIS

## 3. Database & Backend

The backend should provide:

- API endpoints (e.g. `/api/playgrounds` and `/api/reviews`)
- Authentication (user and token handling)
- Validation and authorization (e.g. "only the creator can delete")
- Image uploads and storage
- Communication with PostgreSQL
- Geospatial queries using PostGIS

Recommended stack:

- PostgreSQL with PostGIS
- Ideal for location-based and geospatial data
- NestJS + Prisma + Supabase (PostgreSQL)

## 4. Features & Implementation

### Map View + Playground List

- Leaflet.js or Mapbox
- Retrieve playgrounds from the database and display them on the map

### Detailed Playground Information

- Play equipment
- Recommended age groups
- Seating
- Weather protection
- User ratings
- Database structure for playgrounds, features, and reviews
- Rating system (stars + text)

### Image Uploads

- Cloudinary or Firebase Storage for image storage

### Ratings & Age Recommendations

- Anonymous users: LocalStorage or IP-based restrictions
- Later: OAuth (Google Login) for user accounts

### City of Helsinki Design

The City of Helsinki provides a public design system.

- Colors, UI elements, and components can be reused directly.

https://hds.hel.fi/

## 5. Future: 3D Playground Models

- Three.js for web-based 3D models
- CesiumJS (if you want to integrate real geospatial data)
- Alternative: Photogrammetry with OpenDroneMap

## 6. Conclusion & Recommendation

- **Frontend:** React with Next.js + TypeScript
- **Backend:** Node.js + Express or Supabase
- **Database:** PostgreSQL with PostGIS
- **Maps:** Leaflet.js or Mapbox
- **Design:** Helsinki Design System
- **Hosting:** Vercel (Frontend) + Supabase or Railway (Backend)
