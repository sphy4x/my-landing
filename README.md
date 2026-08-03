# TechnoHome Website

Single-page renovation and home-services website for TechnoHome.gr in Thessaloniki.

## Stack

- React 18 loaded from CDN
- JSX compiled in the browser with Babel Standalone
- Custom responsive CSS in `styles.css`
- Lucide icon font
- Supabase comments/reviews integration
- GitHub Pages custom domain via `CNAME`

## Page sections

- `Navbar`: fixed responsive navigation
- `Hero`: company message, calls to action, and key service facts
- `About`: company information and quality values
- `Services`: tiles, painting, plumbing, and demolition
- `Process`: four-step project overview
- `Gallery`: three existing project images with an accessible lightbox
- `Reviews`: Supabase-backed reviews and submission form
- `Contact`: technician, phone numbers, email, and service area
- `Footer`: navigation, services, and contact details

## Maintenance

- Keep business phone numbers, email, service copy, and image URLs consistent across components.
- Update `trickle/assets` when image sources change.
- Test both desktop and mobile layouts before merging changes to `main`.
