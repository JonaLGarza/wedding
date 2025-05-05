# Jonathan's Portfolio — React + TypeScript + Vite

A fully responsive, developer-focused portfolio built using scalable architecture, atomic design, and best-in-class tooling.  
This project showcases UI craftsmanship, robust code organization, and progressive enhancement using the modern React ecosystem.

---

## 🧠 Highlights

- ⚛️ **Built with React 19** and **TypeScript** using **Vite** for lightning-fast dev experience
- 🌙 **Dark mode** with `next-themes` and localStorage support
- 🧱 **Atomic Design System** (Atoms → Molecules → Organisms)
- 🧪 **Storybook with Chromatic CI** for visual regression testing
- 💥 **Custom Error Boundary** with animated fallback and GitHub issue linking
- 🎨 **Framer Motion** for elegant transitions and interactions
- 💅 **TailwindCSS** for fast, composable styling
- 🔁 **React Router v6+** with lazy-loaded routes & Suspense fallback
- ⚙️ Strict ESLint/Prettier rules using Airbnb base and CVA for variant support

---

## 🚀 Tech Stack

| Tool                  | Purpose                                                          |
|-----------------------|------------------------------------------------------------------|
| **React 19**          | UI library for declarative, component-driven interfaces          |
| **TypeScript**        | Strong typing & IntelliSense                                    |
| **Vite**              | Fast bundler with HMR                                            |
| **Tailwind CSS**      | Utility-first styling                                            |
| **React Router DOM**  | Routing with layout & nested routes                             |
| **Zod**               | Form validation with TypeScript inference                        |
| **React Hook Form**   | Lightweight form library with great performance                  |
| **Framer Motion**     | Animations & transitions                                         |
| **Lucide-react**      | Icon library for modern interfaces                               |
| **Storybook**         | UI component explorer with design system docs                    |
| **Chromatic**         | CI for Storybook, visual testing, and UI snapshots               |
| **ESLint & Prettier** | Code linting and formatting enforcement                          |
| **clsx & cva**        | Condition-based styling + variant support                        |

---

## 📁 Folder Structure

```
src/
├── assets/             # Static assets like images, logos, icons
├── components/         
│   ├── atoms/          # UI primitives (e.g., Button, Input, Avatar)
│   ├── molecules/      # Grouped atoms (e.g., SkillPill, FallbackMessage)
│   └── organisms/      # Complex reusable UI blocks (e.g., ResumeHeader, ErrorBoundary)
├── hooks/              # Custom hooks (e.g., useMobileMenu, useThemeToggle)
├── layout/             # Application-level layouts (e.g., MainLayout)
├── lib/                # Utilities (e.g., cn, helpers)
├── pages/              # Route-level views (e.g., Home, Contact, Projects)
├── router/             # App routing setup using React Router
├── styles/             # Tailwind global styles, animations
├── types/              # Shared TypeScript types/interfaces
├── App.tsx             # Entry point with RouterProvider + Suspense
└── main.tsx            # Vite bootstrap with theme/provider wrapping
```

---

## 📘 Component Documentation

This project includes full Storybook support with Chromatic for:

- 🧩 **Visual regression testing**
- 🧪 **Autodocs & interaction testing**
- 🧱 **Atomic design structure**
- 🧼 **Lint-safe UI development workflow**

### Run Storybook:

```bash
yarn storybook
```

### Test Snapshots with Chromatic:

```bash
yarn chromatic
```

---

## 💥 Error Handling

Includes a custom `ErrorBoundary` component that:

- Catches client-side rendering errors
- Shows an animated fallback with options:
  - 🔁 Reload page
  - 🏠 Go to homepage
  - 🐛 Open GitHub issue

✅ Also tested with Storybook via `ErrorThrowingComponent`.

---

## 🔀 Lazy Routing & Suspense

Dynamic routing is enabled via `React.lazy()` and `Suspense`:

```tsx
const Home = lazy(() => import("../pages/Home"));
const Projects = lazy(() => import("../pages/Projects"));
```

Wrapped in a `LazyWrapper` component that shows a fallback while loading:

```tsx
<Suspense fallback={<div className="text-center py-10">Loading...</div>}>
  <Outlet />
</Suspense>
```

---

## 📦 Scripts

```bash
yarn dev             # Start dev server (Vite)
yarn build           # Production build
yarn preview         # Preview the built site locally
yarn storybook       # Run Storybook
yarn chromatic       # Push Storybook to Chromatic
yarn lint            # Run ESLint
```

---

## 🌍 Deployment (GitHub Pages)

Production builds are deployed to GitHub Pages via GitHub Actions.

> `vite.config.ts` uses `base: '/porfolio/'` for correct public paths.

```ts
export default defineConfig({
  base: '/porfolio/',
  plugins: [...],
});
```

✅ Deployed at: [https://jonalgarza.github.io/porfolio](https://jonalgarza.github.io/porfolio)

---

## 🧪 Future Plans

- [ ] Vitest + React Testing Library for integration testing
- [ ] Playwright for E2E tests
- [ ] 3D experience using Three.js
- [ ] Internationalization (i18n)
- [ ] PDF resume export with Puppeteer

---

## 🙋🏻‍♂️ About Me

**Jonathan Arturo López de la Garza**  
Senior Frontend Engineer — React | TypeScript | DevOps Curious  
🧠 Always learning | 🎯 Focused on clean UX | 💻 Lives in Saltillo, MX

- 💼 [LinkedIn](https://www.linkedin.com/in/jonathanlgarza/)
- 🧠 [GitHub](https://github.com/JonaLGarza)
- 📘 [Storybook Live](https://67faeb0c6c52986ce6872a8d-ufsjvdyguk.chromatic.com/)
- 🧪 [Chromatic Library](https://www.chromatic.com/library?appId=67faeb0c6c52986ce6872a8d)

---

## 🤝 Contributions

This is a personal showcase, but you're welcome to open PRs, issues, or just leave a ⭐ if you like it!

---

🛠 Built with love, caffeine, and Tailwind magic.