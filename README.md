# playgroundApp

# Idea

I would like to create a playground app that lists playgrounds in helsinki. You can view them on a map or in a list.
All features on the playground should be listed.
Future enhancements: a 3D model of the playground.
It should be possible to upload images.
Users should be able to move around without logging in and view the playgrounds at their leisure.
Users should be able to submit ratings
there should be an age rating for the respective play equipment or the entire playground
seating, sun protection and rain protection should also be included.
the playgrounds should be integrated into a database
the design should/can correspond to that of the city of helsinke so that they can easily implement it in their own pages later.
is the design publicly available?

## 1. Wahl der Technologie

Da es sich um eine moderne Web-App handelt, empfehle ich React mit TypeScript. Warum?

✅ React:

    Weit verbreitet und einfach zu warten
    Gute Performance für Karten & interaktive Elemente
    Leicht mit bestehenden Stadt-Webseiten zu integrieren

✅ TypeScript:

    Statische Typisierung → weniger Fehler
    Bessere Wartbarkeit, besonders für große Projekte

## 2. Frameworks & Bibliotheken

    React mit TailwindCSS für ein modernes UI
    Nest.js
    Supabase und PostGis

## 3. Datenbank & Backend

sollte können:

- API-Endpunkte bereitstellen (z. B. /api/playgrounds, /api/reviews)
- Authentifizierung (User / Token-Handling)
- Validierung & Autorisierung (z. B. „nur Ersteller darf löschen“)
- Bilder-Upload & Storage
- Kommunikation mit PostgreSQL
- Geodaten-Abfragen (PostGIS)

  PostgreSQL mit PostGIS
  Perfekt für Standort-Daten & Geodaten
  NestJS + Prisma + Supabase (PostgreSQL)

## 4. Features & Umsetzung

    Kartenansicht + Liste der Spielplätze
        Leaflet.js oder Mapbox
        Spielplätze aus Datenbank abrufen & anzeigen

    Detaillierte Spielplatzinfos (Spielgeräte, Altersempfehlung, Sitzplätze, Wetter-Schutz, Bewertungen)
        Datenbankstruktur mit Spielplätze, Features, Bewertungen
        Bewertungssystem (Sterne + Text)

    Bilder-Upload für Spielplätze
        Cloudinary oder Firebase Storage für Bildspeicherung

    Bewertungen & Alterseinschätzung
        Nutzer ohne Anmeldung → LocalStorage oder IP-basierte Einschränkung
        Später evtl. OAuth (Google Login) für Benutzerkonten

    Design im Stil der Stadt Helsinki
        Helsinki hat ein öffentliches Design-System:
        👉 Helsinki City Design System
        Farben, UI-Elemente und Komponenten können direkt übernommen werden

        https://hds.hel.fi/

## 5. Zukunft: 3D Modell des Spielplatzes

    Three.js für Web-3D-Modelle
    Cesium.js (falls du es mit echten Geo-Daten verbinden willst)
    Alternative: Photogrammetrie mit OpenDroneMap

## 6. Fazit & Empfehlung

    Frontend: React mit Next.js + TypeScript
    Backend: Node.js + Express oder Supabase
    Datenbank: PostgreSQL mit PostGIS
    Karte: Leaflet.js oder Mapbox
    Design: Helsinki Design System
    Hosting: Vercel (Frontend) + Supabase oder Railway (Backend)
