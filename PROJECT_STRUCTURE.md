# 🏗️ Project Structure & Architecture Guide

**Project Name:** Sungo React - Solar Energy Landing Page  
**Technology Stack:** React 18 + TypeScript + Vite + SCSS + Swiper + React Router  
**Build Tool:** Vite 6.1.0  
**Package Manager:** npm 10.9.2

---

## 📋 Table of Contents

1. [Directory Structure](#directory-structure)
2. [Core Directories](#core-directories)
3. [Component Architecture](#component-architecture)
4. [Page Structure](#page-structure)
5. [Routing System](#routing-system)
6. [Data Management](#data-management)
7. [Styling System](#styling-system)
8. [Build & Deployment](#build--deployment)

---

## 📁 Directory Structure

```
sungo/
├── public/                      # Static assets
│   ├── favicon.svg
│   └── img/                     # All project images
│       ├── about/, achievement-icon/, brand/, etc.
│       └── [various images for sections]
│
├── src/                         # Main application code
│   ├── assets/                  # Project styles and fonts
│   │   ├── css/                 # Compiled CSS files
│   │   ├── scss/                # SCSS source files
│   │   └── webfonts/            # Custom fonts
│   │
│   ├── components/              # React components
│   │   ├── headers/             # Header components (1, 2, 3, 4 variants)
│   │   ├── sections/            # Content sections
│   │   │   ├── about/           # About section variants
│   │   │   ├── achievements/    # Achievement section
│   │   │   ├── blogs/           # Blog section variants
│   │   │   ├── contact/         # Contact form & related
│   │   │   ├── heros/           # Hero section variants
│   │   │   ├── projects/        # Project showcase variants
│   │   │   ├── services/        # Service section variants
│   │   │   ├── teames/          # Team section variants
│   │   │   ├── testimonials/    # Testimonial section
│   │   │   ├── faq/             # FAQ section
│   │   │   ├── partners/        # Partners section
│   │   │   ├── marques/         # Marquee animations
│   │   │   ├── calculator/      # Credit calculator
│   │   │   ├── footer.tsx       # Footer component
│   │   │   ├── pageTitle.tsx    # Page title/breadcrumb
│   │   │   └── [other sections]
│   │   │
│   │   └── ui/                  # Reusable UI components
│   │       ├── buttons, cards, etc.
│   │       └── sectionTitle.tsx # Reusable title component
│   │
│   ├── db/                      # Data files
│   │   ├── blogPostsOneData.ts
│   │   ├── projectsOneData.ts
│   │   ├── serviceOneData.ts
│   │   ├── teamMembersOneData.ts
│   │   ├── testimonialFourData.ts
│   │   └── [other data files]
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAnimation.tsx     # WOW.js animation trigger
│   │   └── useSticky.tsx        # Sticky header logic
│   │
│   ├── layout/                  # Layout components
│   │   ├── root.tsx             # Default layout (Header + Content + Footer)
│   │   ├── layoutTwo.tsx        # Variant 2 layout
│   │   ├── layoutThree.tsx      # Variant 3 layout
│   │   └── layoutFour.tsx       # Variant 4 layout
│   │
│   ├── lib/                     # Utility libraries
│   │   └── icons.tsx            # Icon definitions
│   │
│   ├── pages/                   # Page components (routes)
│   │   ├── home.tsx             # Home page (default)
│   │   ├── home-one-single.tsx  # Home variant 1
│   │   ├── home-two.tsx         # Home variant 2
│   │   ├── home-three.tsx       # Home variant 3
│   │   ├── home-four.tsx        # Home variant 4
│   │   ├── about.tsx            # About page
│   │   ├── service.tsx          # Services listing
│   │   ├── service-carousel.tsx # Services carousel view
│   │   ├── service-details.tsx  # Service detail page
│   │   ├── project.tsx          # Projects listing
│   │   ├── project-carousel.tsx # Projects carousel
│   │   ├── project-details.tsx  # Project detail page
│   │   ├── blog.tsx             # Blog listing
│   │   ├── blog-standard.tsx    # Blog standard layout
│   │   ├── blog-details.tsx     # Blog post detail
│   │   ├── team.tsx             # Team listing
│   │   ├── team-carousel.tsx    # Team carousel
│   │   ├── team-details.tsx     # Team member detail
│   │   ├── contact.tsx          # Contact page
│   │   ├── faq.tsx              # FAQ page
│   │   └── 404.tsx              # 404 error page
│   │
│   ├── route/                   # Routing configuration
│   │   └── router.tsx           # React Router configuration
│   │
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # React entry point
│   ├── vite-env.d.ts            # Vite type definitions
│   └── swiper.d.ts              # Swiper type definitions
│
├── server/                      # Backend server (Node.js)
│   ├── src/
│   │   ├── index.ts             # Server entry point
│   │   └── routes/              # API routes
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   ├── package.json
│   └── tsconfig.json
│
├── .github/
│   └── workflows/
│       └── release.yml          # GitHub Actions release workflow
│
├── Configuration Files
├── eslint.config.js             # ESLint configuration
├── vite.config.ts               # Vite build configuration
├── tsconfig.json                # TypeScript root config
├── tsconfig.app.json            # TypeScript app config
├── tsconfig.node.json           # TypeScript node config
├── package.json                 # Project dependencies & scripts
├── package-lock.json            # Dependency lock file
├── vercel.json                  # Vercel deployment config
├── index.html                   # HTML entry point
├── README.md                    # Project readme
└── .gitignore, .env, etc.       # Configuration files

```

---

## 🎯 Core Directories

### **`src/`** - Main Application Code

The heart of the React application. Contains all TypeScript/TSX components, pages, and business logic.

### **`public/`** - Static Assets

Contains all static files served as-is:

- **`img/`** - All images organized by section (hero, about, project, etc.)
- **`favicon.svg`** - Browser tab icon

### **`src/components/`** - Reusable Components

#### **`headers/`** - Navigation Components

- `headerOne.tsx`, `headerTwo.tsx`, `headerThree.tsx`, `headerFour.tsx`
- Multiple header variants for different homepage designs

#### **`sections/`** - Content Section Components

Organized by feature/section type:

| Folder          | Purpose                             |
| --------------- | ----------------------------------- |
| `about/`        | About section (variants 1-4)        |
| `achievements/` | Achievement/stats section           |
| `blogs/`        | Blog showcase (variants 1-4)        |
| `contact/`      | Contact form & contact sections     |
| `heros/`        | Hero/banner sections (variants 1-4) |
| `projects/`     | Project showcase (variants 1-5)     |
| `services/`     | Service cards (variants 1-4)        |
| `teames/`       | Team section (variants 1-4)         |
| `testimonials/` | Client testimonials                 |
| `partners/`     | Partner logos section               |
| `marques/`      | Marquee text animations             |
| `calculator/`   | Credit calculator component         |
| `faq/`          | FAQ accordion                       |

**Key Components:**

- `footer.tsx` - Site footer (shared across all pages)
- `pageTitle.tsx` - Page header with breadcrumbs

#### **`ui/`** - Reusable UI Elements

- `sectionTitle.tsx` - Composable section title component
- Buttons, cards, and other base UI components

### **`src/layout/`** - Page Layouts

Wrapper components that provide consistent structure (Header + Content + Footer):

| File              | Layout Type                   |
| ----------------- | ----------------------------- |
| `root.tsx`        | Default layout with HeaderOne |
| `layoutTwo.tsx`   | Layout with HeaderTwo         |
| `layoutThree.tsx` | Layout with HeaderThree       |
| `layoutFour.tsx`  | Layout with HeaderFour        |

### **`src/pages/`** - Page Components (Routes)

Each file represents a unique page/route:

#### **Home Variants**

- `home.tsx` - Main homepage with all sections
- `home-one-single.tsx` - Single-column home variant 1
- `home-two.tsx` & `home-two-single.tsx` - Home variant 2
- `home-three.tsx` & `home-three-single.tsx` - Home variant 3
- `home-four.tsx` & `home-four-single.tsx` - Home variant 4

#### **Content Pages**

- `about.tsx` - About company page
- `service.tsx` - Services listing grid
- `service-carousel.tsx` - Services carousel view
- `service-details.tsx` - Individual service detail
- `project.tsx` - Projects grid
- `project-carousel.tsx` - Projects carousel
- `project-details.tsx` - Individual project detail
- `team.tsx` - Team members grid
- `team-carousel.tsx` - Team carousel
- `team-details.tsx` - Team member profile
- `blog.tsx` - Blog posts listing
- `blog-standard.tsx` - Blog with standard layout
- `blog-details.tsx` - Individual blog post
- `contact.tsx` - Contact form page
- `faq.tsx` - FAQ page
- `404.tsx` - 404 error page

### **`src/db/`** - Data Files

Static JSON-like data arrays for content:

| File                     | Contains                   |
| ------------------------ | -------------------------- |
| `blogPostsOneData.ts`    | Blog posts for variant 1   |
| `projectsOneData.ts`     | Projects for variant 1     |
| `serviceOneData.ts`      | Services for variant 1     |
| `teamMembersOneData.ts`  | Team members for variant 1 |
| `testimonialFourData.ts` | Testimonials for variant 4 |
| `menuData.ts`            | Navigation menu items      |
| `pricingData.ts`         | Pricing tier data          |
| `faqData.ts`             | FAQ questions & answers    |
| `workProcessData.ts`     | Work process steps         |

### **`src/route/`** - Routing Configuration

- `router.tsx` - React Router configuration with all routes, layouts, and pages

### **`src/hooks/`** - Custom React Hooks

| Hook               | Purpose                             |
| ------------------ | ----------------------------------- |
| `useAnimation.tsx` | Triggers WOW.js animations on mount |
| `useSticky.tsx`    | Handles sticky header behavior      |

### **`src/assets/`** - Styling & Fonts

#### **`scss/`** - Style Files

- `main.scss` - Entry point that imports all styles
- `_variables.scss` - Color, spacing, font variables
- `_mixins.scss` - Reusable SCSS mixins
- `_typography.scss` - Font imports and typography
- Component-specific files: `_header.scss`, `_footer.scss`, `_buttons.scss`, etc.
- Uses modern `@use` syntax instead of deprecated `@import`

#### **`css/`** - Compiled CSS

Generated from SCSS during build

#### **`webfonts/`** - Custom Fonts

Font Awesome and other custom fonts

---

## 🎨 Component Architecture

### **Naming Convention**

- **Components**: PascalCase (e.g., `AboutOne.tsx`, `ProjectCard.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAnimation.tsx`)
- **SCSS modules**: lowercase with underscore (e.g., `_about.scss`)

### **Component Variants Pattern**

The project uses a **variant-based architecture**:

- Most features have 1-4 variants (One, Two, Three, Four)
- Example: `HeroOne`, `HeroTwo`, `HeroThree`, `HeroFour`
- Variants are used on different homepages and layouts
- Data is separated: `heroOneData.ts`, `heroTwoData.ts`, etc.

### **Composable Components**

- `SectionTitle` - Flexible title component
- `ProjectCard` - Reusable project display card
- `PageTitle` - Reusable page header with breadcrumbs

---

## 📄 Page Structure

### **Typical Page Composition**

```tsx
// pages/about.tsx
import PageTitle from "@/components/sections/pageTitle";
import AboutTwo from "@/components/sections/about/aboutTwo";
import ProjectsTwo from "@/components/sections/projects/projectsTwo";

const About = () => {
  return (
    <>
      <PageTitle title="About Us" currentPage="About Us" />
      <AboutTwo />
      <ProjectsTwo />
      {/* ... more sections ... */}
    </>
  );
};
```

**Key Pattern:**

1. Import section components
2. Render `PageTitle` for breadcrumb
3. Stack section components vertically
4. Layout wrapper (root, layoutTwo, etc.) provides Header + Footer

---

## 🛣️ Routing System

### **Route Configuration** (`src/route/router.tsx`)

React Router v6 with multiple layouts:

```
ROOT LAYOUT (Header1 + Content + Footer)
├── / → Home
├── /home-one-single → Home variant 1
├── /about → About page
├── /service → Services listing
├── /project → Projects listing
├── /blog → Blog listing
├── /contact → Contact page
└── /404 → Error page

LAYOUT2 (Header2 + Content + Footer)
├── /home-two → Home variant 2
├── /home-two-single → Single column home 2
└── [other routes]

LAYOUT3 (Header3 + Content + Footer)
├── /home-three → Home variant 3
└── [other routes]

LAYOUT4 (Header4 + Content + Footer)
├── /home-four → Home variant 4
└── [other routes]
```

### **Dynamic Routes**

- `/service-details` → Individual service pages
- `/project-details` → Individual project pages
- `/blog-details` → Individual blog posts
- `/team-details` → Team member profiles

---

## 💾 Data Management

### **Static Data Files** (`src/db/`)

All content is stored as TypeScript arrays:

```ts
// src/db/projectsOneData.ts
export const projectsOneData = [
  {
    id: 1,
    title: "Project Title",
    image: "/img/project/image.png",
    category: "Design",
    link: "/project-details",
  },
  // ... more items
];
```

### **Data Usage in Components**

```tsx
import { projectsOneData } from "@/db/projectsOneData";

const ProjectsOne = () => {
  return (
    <Swiper>
      {projectsOneData.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Swiper>
  );
};
```

### **Variant-Specific Data**

- `One` components use `*OneData.ts`
- `Two` components use `*TwoData.ts`
- `Three` components use `*ThreeData.ts`
- `Four` components use `*FourData.ts`

---

## 🎨 Styling System

### **SCSS Architecture** (`src/assets/scss/`)

#### **Entry Point**

- `main.scss` - Imports all styles in correct order

#### **Core Files**

- `_variables.scss` - CSS custom properties (colors, spacing, fonts)
- `_mixins.scss` - Reusable mixins (media queries, animations)
- `_typography.scss` - Font imports and text styles

#### **Component Styles**

Organized by component:

```
_header.scss          → Header styling
_footer.scss          → Footer styling
_hero.scss            → Hero sections
_about.scss           → About sections
_service.scss         → Services styling
_project.scss         → Projects styling
_buttons.scss         → Button styles
_calculator.scss      → Calculator component
_contact.scss         → Contact form
_faq.scss             → FAQ accordion
... and more
```

### **Modern `@use` Syntax**

All SCSS files use modern `@use` instead of deprecated `@import`:

```scss
// Modern (current)
@use "_variables" as *;
@use "_mixins" as *;

// Deprecated (old)
@import "_variables";
@import "_mixins";
```

### **CSS Classes**

Uses BEM-like naming convention:

- `.section-padding` - Common padding utility
- `.container` - Bootstrap grid container
- `.wow.slideUp` - WOW.js animation classes
- `.theme-btn` - Primary button style
- `.section-bg` - Section background utility

---

## 🚀 Build & Deployment

### **Build Scripts** (`package.json`)

| Script            | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server (hot reload)   |
| `npm run build`   | Production build (TypeScript + Vite) |
| `npm run lint`    | Run ESLint code quality checks       |
| `npm run preview` | Preview production build locally     |

### **Build Command**

```bash
tsc --noEmit && vite build
```

1. `tsc --noEmit` - TypeScript type checking without emitting JS
2. `vite build` - Vite production build with minification

### **Vite Configuration** (`vite.config.ts`)

- React + TypeScript support
- SCSS/CSS preprocessing
- Asset optimization
- Output directory: `dist/`

### **Deployment** (`vercel.json`)

- Platform: Vercel
- Build command: `npm run build`
- Output directory: `dist/`
- Rewrites: All routes redirect to `/` (SPA routing)

### **TypeScript Configuration**

- `tsconfig.json` - Root config
- `tsconfig.app.json` - App compilation settings
- `tsconfig.node.json` - Build tool compilation

---

## 🔄 Data Flow Example

```
Route: /about
  ↓
React Router selects RootLayout
  ↓
RootLayout renders HeaderOne + About page + Footer
  ↓
About.tsx imports and renders:
  - PageTitle (breadcrumb)
  - AboutTwo (about content)
  - ProjectsTwo (featured projects)
    ↓
    ProjectsTwo imports projectsTwoData
    ↓
    Maps through data, rendering ProjectCard components
    ↓
    Styled with CSS from SCSS files
```

---

## 📦 Key Dependencies

| Package            | Purpose                  |
| ------------------ | ------------------------ |
| `react`            | UI library               |
| `react-dom`        | React rendering          |
| `react-router-dom` | Client-side routing      |
| `swiper`           | Touch-friendly carousels |
| `bootstrap`        | CSS framework            |
| `sass`             | SCSS compilation         |
| `typescript`       | Type safety              |
| `vite`             | Build tool               |
| `eslint`           | Code quality             |

---

## 🚨 Important Notes

### **Multiple Homepage Variants**

This project supports 4 different homepage layouts:

- Each has its own Hero, Services, About, Projects, Team sections
- Data is variant-specific (OneData, TwoData, etc.)
- Layouts are separate (root, layoutTwo, layoutThree, layoutFour)

### **Swiper Integration**

Carousels use the Swiper library with:

- Touch/mouse drag support
- Autoplay animations
- Responsive breakpoints
- Navigation/pagination controls

### **Animation System**

- WOW.js for scroll-based animations
- Custom animations in SCSS
- `useAnimation` hook triggers animations on mount

### **Styling Standards**

- Mobile-first responsive design
- Utility classes from Bootstrap
- Custom SCSS variables for theming
- BEM-like CSS class naming

---

## 🔗 Quick Navigation

- **Add new page**: Create file in `src/pages/`, add route in `router.tsx`
- **Add new section**: Create component in `src/components/sections/`, add data file in `src/db/`
- **Add new variant**: Create `*Two.tsx`, `*TwoData.ts`, add to page composition
- **Update styles**: Modify SCSS files in `src/assets/scss/`
- **Add icons**: Define in `src/lib/icons.tsx`
- **Create layout**: New file in `src/layout/`, use different header variant

---

**Last Updated:** March 2026  
**Build Status:** ✅ Production Ready
