# TechnoHome Website Project

This is a renovation and home services landing page for TechnoHome, based in Thessaloniki.

## Project Structure

- **Core**: React 18 (CDN), TailwindCSS (CDN)
- **Language**: Content in Greek (EL), Development in English/Russian communication.
- **Assets**: Managed in `trickle/assets`
- **Database**:
  - `review`: Stores customer reviews (name, rating, comment, date).
- **Components**:
  - `Navbar`: Responsive navigation (now hides on scroll down).
  - `Hero`: Main banner with animated background.
  - `About`: Company information.
  - `Services`: Clickable cards grid of services.
  - `Gallery`: Grid of project images from Unsplash.
  - `Reviews`: Live reviews system with submission form connected to Trickle DB.
  - `Contact`: Form and contact details.
  - `Footer`: Links and copyright.

## Maintenance

- Update `trickle/assets` when changing images.
- Keep the `README.md` updated with major structural changes.