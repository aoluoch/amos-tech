# Amos Tech Solutions

Marketing website and secure admin for **Amos Tech Solutions** — websites, apps, software, AI workflows, automation, and creative digital services.

## Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router
- **Managed pages & forms:** Appwrite (Auth + TablesDB)
- **Content collections:** Contentful (Services, Blog, Projects, Events)

## Features

- Public site pages with Appwrite-managed copy for Home, About, Contact, Technologies, Request Quote, and shared site/footer content
- Contentful-backed Services, Blog, Projects, and Events
- Secure `/admin` area with email/password auth
- Admin page editor with realtime updates
- Categorized form inbox for Contact and Quote submissions
- 3-minute admin inactivity timeout (automatic logout)
- Favicon generated from the project logo

## Getting started

### 1. Install

```bash
npm install
```

### 2. Environment

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

Required Appwrite values:

- `VITE_APPWRITE_ENDPOINT`
- `VITE_APPWRITE_PROJECT_ID`
- `VITE_APPWRITE_DATABASE_ID`
- `VITE_APPWRITE_PAGES_TABLE_ID`
- `VITE_APPWRITE_CONTACT_TABLE_ID`
- `VITE_APPWRITE_QUOTE_TABLE_ID`

Optional Contentful values (falls back to local sample content when empty):

- `VITE_CONTENTFUL_SPACE_ID`
- `VITE_CONTENTFUL_DELIVERY_TOKEN`
- `VITE_CONTENTFUL_ENVIRONMENT`

### 3. Run

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Admin access

- Route: `/admin` (not linked in the public navbar/footer)
- Auth: Appwrite email/password
- Authorization: user must be in `VITE_ADMIN_ALLOWED_EMAILS` **and** have the Appwrite `admin` label
- Project user limit is set to `1` to block additional public signups
- Failed logins use a generic error and temporary lockout after repeated attempts
- Inactivity: signed-out automatically after **3 minutes** without activity
- Use **Pages** to edit managed site content
- Use **Messages** to review Contact and Quote submissions

## Content ownership

| Area | Source |
| --- | --- |
| Home, About, Contact, Technologies, Quote, Site/Footer/CTA | Appwrite |
| Services, Blog, Projects, Events | Contentful |
| Contact form submissions | Appwrite `contact_messages` |
| Quote form submissions | Appwrite `quote_requests` |

## Project structure

```text
src/
  components/   UI, layout, admin inbox
  data/         Contentful fallbacks + Appwrite page seeds
  hooks/        Auth and content hooks
  lib/          Appwrite + Contentful clients
  pages/        Public pages + Admin
public/         Logo, favicon, static assets
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start local Vite server |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Preview the production build |

## Notes

- Do not commit `.env` (it is gitignored).
- Keep admin passwords out of `VITE_` variables so they are never bundled into the client.
- Register production hostnames as Appwrite web platforms before deploying auth to a live domain.
# amos-tech
