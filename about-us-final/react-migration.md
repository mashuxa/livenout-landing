# About Us — React / Next.js migration handoff

Baseline: `about-us-final/index.html`, version 98 (commit def61b5e362e84deb09d74d9a8002dd8b111dbe7).
Reference: https://mashuxa.github.io/livenout-landing/about-us-final/?v=98
Dictionary: `about-us-final/translations.json` (ru, en, pl, uk, be; 235 keys per locale).
This is a migration plan, not an implemented React application. Keep the published HTML preview unchanged until a rendered React version passes regression checks.

## 1. Architecture

Use the existing App Router About Us route and locale segment in the production repository. Reuse its layout, Header, Footer, localization system, UI primitives, actual Tailwind theme and typography. Do not duplicate the application shell. Server-render all section copy, including all FAQ answers and initial demo states. Do not mark the page or all sections as client components.

Suggested feature directory (adapt paths and import aliases to the production repository):

```text
features/about/
  components/
    AboutPage.tsx                       RSC: composition only
    sections/
      HeroSection.tsx                   RSC
      DiscoverySection.tsx              RSC
      OrganizerGallerySection.tsx       RSC
      MoodSection.tsx                   RSC
      LessScrollingSection.tsx           RSC
      CreateMeetupSection.tsx            RSC
      EventLanguagesSection.tsx          RSC
      MeetupJourneySection.tsx           RSC
      FindCompanySection.tsx             RSC
      EventSubscriptionsSection.tsx      RSC
      ForOrganizersSection.tsx           RSC
      FeatureLinksSection.tsx            RSC
      AboutFaqSection.tsx                RSC
      FinalCtaSection.tsx                RSC
    interactive/
      SmartSearchDemo.client.tsx
      HeroBenefits.client.tsx
      FavoriteCalendarDemo.client.tsx
      OrganizerPhotoCarousel.client.tsx
      MoodPickerDemo.client.tsx
      DemandAnimation.client.tsx
      EventLanguageDemo.client.tsx
      EventChatPreview.client.tsx
      CompanyMatchingDemo.client.tsx
      SectionNavigation.client.tsx       preview only unless product-approved
    shared/
      Section.tsx                       container, section id, heading relationship
      SectionHeading.tsx                optional eyebrow, title, description
      PhotoTile.tsx                     responsive picture, optional label
      EventPreviewCard.tsx              reuse existing EventCard when appropriate
      DemoPanel.tsx                     honest example label, shared panel surface
      FeatureLink.tsx                   reuse existing link / button primitives
      BenefitItem.tsx                   icon, title, short description
      VikingIllustration.tsx            SVG component, separate asset
      FootballIllustration.tsx          SVG component, separate asset
    motion/
      ViewportMotion.client.tsx          small optional boundary for entrance effects
      useViewportVisibility.ts          IntersectionObserver, header offset
      useReducedMotion.ts                reuse existing hook if available
      useDemandAnimation.ts              WAAPI ball/CTA/mascot choreography
  data/
    about-config.ts                     typed links, galleries, feature definitions
    demo-data.ts                        explicitly illustrative fixtures, never live data
    about-sections.ts                   single ordered list of section IDs
  i18n/
    about.messages.json                 import existing translations.json
    types.ts                            typed locale and message tree
  styles/
    about-motion.module.css             only complex keyframes/geometry not suited to utilities
```

The suffix .client is a convention, not a Next.js requirement; add "use client" in client entry modules only. Static subcomponents imported within a client entry become part of its client graph; prefer passing server-rendered children where useful. Keep dictionaries server-side; pass only the serializable strings required by an interactive component. A client island must render its initial state deterministically on the server and hydrate without mismatch.

## 2. Section order and ownership

| Existing anchor (preserve) | Section component | Responsibility / child |
|---|---|---|
| hero | HeroSection | Value proposition, search CTA, three photo tiles, benefits, SmartSearchDemo and HeroBenefits |
| discovery | DiscoverySection | Leisure / saved-event calendar, FavoriteCalendarDemo |
| gallery | OrganizerGallerySection | Real or clearly identified example photos, full-bleed OrganizerPhotoCarousel |
| mood | MoodSection | Three moods and example recommendations, MoodPickerDemo |
| less-scrolling | LessScrollingSection | Three benefits; no technical labels, no empty video placeholder |
| demand | CreateMeetupSection | Create meetup, three steps, CTA, DemandAnimation (ball then viking) |
| languages | EventLanguagesSection | Language-of-event explanation and EventLanguageDemo |
| journey | MeetupJourneySection | Solo-friendly, event chat, participation sequence, EventChatPreview |
| roulette | FindCompanySection | Group matching concept, CompanyMatchingDemo; CTA label “Подобрать событие” |
| subscriptions | EventSubscriptionsSection | Notification example and preferences; static layout |
| organizers | ForOrganizersSection | 0 zł positioning, organizer CTA, six organizer benefits |
| try-features | FeatureLinksSection | Nine real destinations, first “Куда пойти сегодня” |
| faq | AboutFaqSection | Eleven answers, semantic details/summary; four initially visible + seven additional |
| final-cta | FinalCtaSection | Step out. Liven up!, primary event CTA and outline Become Organizer CTA |

Keep original IDs for hash links and regressions. FAQ uses native details/summary; no JS needed solely to toggle. Reuse existing product navigation, link routing, language switch, theme and authentication flows rather than recreating the preview header/footer.

## 3. Page composition contract

```tsx
// Server Component; adapt locale resolution to the existing application.
import { HeroSection } from "./sections/HeroSection";
import { DiscoverySection } from "./sections/DiscoverySection";
import { OrganizerGallerySection } from "./sections/OrganizerGallerySection";
import { MoodSection } from "./sections/MoodSection";
import { LessScrollingSection } from "./sections/LessScrollingSection";
import { CreateMeetupSection } from "./sections/CreateMeetupSection";
import { EventLanguagesSection } from "./sections/EventLanguagesSection";
import { MeetupJourneySection } from "./sections/MeetupJourneySection";
import { FindCompanySection } from "./sections/FindCompanySection";
import { EventSubscriptionsSection } from "./sections/EventSubscriptionsSection";
import { ForOrganizersSection } from "./sections/ForOrganizersSection";
import { FeatureLinksSection } from "./sections/FeatureLinksSection";
import { AboutFaqSection } from "./sections/AboutFaqSection";
import { FinalCtaSection } from "./sections/FinalCtaSection";
import type { AboutMessages, Locale } from "../i18n/types";

export function AboutPage({ locale, messages: m }: {
  locale: Locale;
  messages: AboutMessages;
}) {
  return (
    <>
      <HeroSection locale={locale} messages={m} />
      <DiscoverySection locale={locale} messages={m} />
      <OrganizerGallerySection locale={locale} messages={m} />
      <MoodSection locale={locale} messages={m} />
      <LessScrollingSection messages={m} />
      <CreateMeetupSection locale={locale} messages={m} />
      <EventLanguagesSection messages={m} />
      <MeetupJourneySection locale={locale} messages={m} />
      <FindCompanySection locale={locale} messages={m} />
      <EventSubscriptionsSection messages={m} />
      <ForOrganizersSection locale={locale} messages={m} />
      <FeatureLinksSection locale={locale} messages={m} />
      <AboutFaqSection messages={m} />
      <FinalCtaSection locale={locale} messages={m} />
    </>
  );
}
```

This example assumes the parent layout already owns the main landmark; otherwise use one main with id="main", not nested mains. Section signatures may be narrowed to the exact message groups used. Never pass the entire dictionary to a client island.

## 4. Tailwind CSS — mandatory

The version 98 HTML has no Tailwind import/configuration and about 99.5k characters of embedded CSS. The production implementation must use the existing project's Tailwind installation and configured semantic utilities. Inspect package.json, actual Tailwind version/config or CSS @theme, globals.css, theme provider, Button, Card, existing responsive breakpoints and class merging helper first. Do not add a competing theme, copy the temporary preview hex colors into production, install a different Tailwind version, or load a Tailwind CDN.

Translate the layout into Tailwind utilities rather than copying all CSS.

| Concern | Target utilities / primitives (verify actual theme) |
|---|---|
| Section rhythm | `py-8 lg:py-10` (64 px between mobile sections, 80 px on desktop); no full viewport forced heights |
| Container | existing Container or `mx-auto w-full max-w-6xl px-4 sm:px-6` |
| Two columns | `grid min-w-0 items-center gap-6 lg:grid-cols-2 lg:gap-10` |
| Feature links | `grid grid-cols-2 gap-3 md:grid-cols-3`; verify 320px and long translations, fall back to one column if needed |
| Card | existing Card or `rounded-2xl border border-border bg-card` |
| Lead | `text-lg leading-relaxed text-muted-foreground` |
| H1/H2 | use existing heading styles or agreed responsive typography in Brand Book 04 |
| Primary | existing Button with actual brand-gradient variant |
| Secondary | existing Button variant="outline"; final CTA has same minimum height as primary |
| Focus / motion | product focus-visible ring; motion-reduce variants; do not rely on hover for touch |
| Gallery | `flex snap-x snap-mandatory gap-2 overflow-x-auto` with keyboard / touch controls |
| Image | existing image component / Next Image, explicit ratio, sizes, dimensions, and allowed remote origins |

Illustrative shared component:

```tsx
import type { ComponentPropsWithoutRef, ReactNode } from "react";
// Use the project's class merge helper and breakpoint tokens.
export function Section({
  id, children, className = "", fullBleed = false, ...rest
}: ComponentPropsWithoutRef<"section"> & {
  id: string;
  children: ReactNode;
  fullBleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={`min-w-0 scroll-mt-24 py-8 lg:py-10 ${className}`}
      {...rest}
    >
      {fullBleed ? children : (
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          {children}
        </div>
      )}
    </section>
  );
}
```

Use a token-driven header offset instead of fixed scroll-mt-24 if the existing header exposes one. Use the existing cn helper in production. Preserve desktop/mobile and both themes. Custom CSS is allowed only for precise motion keyframes, unusual SVG geometry or masks that cannot be expressed clearly via existing utilities; keep it colocated in a CSS module. No inline global stylesheet or `dangerouslySetInnerHTML` port.

## 5. Vanilla JS migration

| Existing initializer | React owner / disposition |
|---|---|
| theme switch | Existing app theme provider and header |
| initSmartSearch | SmartSearchDemo: controlled input, deterministic fixtures, explicit example labels; production CTA opens actual search with query |
| initHeroBenefits, initHeroFloat | HeroBenefits / ViewportMotion, visibility-aware motion |
| initCalendarSave | FavoriteCalendarDemo: useState, aria-pressed, live region, no API mutation |
| initOrganizerGallery | OrganizerPhotoCarousel: scroll ref, native scrolling, prev/next, optional autoplay only in viewport and with reduced-motion guard |
| initMoodDemo | MoodPickerDemo: selected mood state, buttons and result derived from selected option |
| initLocalizedLanguages | EventLanguageDemo: filter by language code; use the page locale for chrome, preserve genuine event title and spoken languages |
| initQuizChat | EventChatPreview: visible-only message entrance, no real messaging |
| initInterestRoulette | CompanyMatchingDemo: deterministic initial group, randomization only after interaction, honest demo states |
| initDemandBall + initDemandViking | One DemandAnimation client boundary; use refs + WAAPI, explicit ball-finished state, reset/replay, cleanup |
| initViewportEntrances | reusable ViewportMotion only for actual motion wrappers |
| initSectionSnap | Use existing header offset; no forced scroll-snap / resize listener if CSS suffices |
| initAccessibleSectionNavigation | optional preview-only navigation; do not ship floating panel to production without approval |
| initLessScrollingHighlights | local effect only if still useful without the video |
| initOrganizerTagShake | optional local animation; respect reduced motion |
| initGroupChatPreview, initSubscriptionHighlights, initNotificationBell | confirm selectors absent in current markup; remove dead code instead of migrating |
| initPreviewAutoRefresh | already removed; do not reintroduce |

Every observer, timer, rAF, WAAPI animation, visibility/media-query listener must be scoped and cleaned up. No page-wide document queries or global event bus for independent demos. Use state for semantic UI and refs for transient animation geometry. Preserve accessibility: real buttons, aria-pressed, aria-live, labels, focus, no auto-focus stealing. Client island content must remain readable without JavaScript.

For the football animation preserve the agreed trigger: full visible animation block, accounting for the sticky header. A block taller than the viewport must not leave meaningful content hidden; treat mobile behavior as an explicit acceptance decision, not a silent change. Reduced motion should show the final static illustration.

## 6. Localization and data

- Russian base; English, Polish, Ukrainian, Belarusian. Locale union: ru | en | pl | uk | be.
- Use project locale routing and server dictionary loader. Do not import all five language dictionaries into a client bundle.
- Current JSON is validated for parity of 235 keys, not exhaustive extraction of all hardcoded fixtures. Verify every literal, aria-label, status, date, and alt against the v98 DOM and scripts. Use Intl dates/plural rules and preserve real event names where appropriate. Separate UI language from event language. Do not use the example Japanese filter as a site locale.
- Existing footer/header messages and shared components should come from the production dictionary, not duplicated local strings.
- Move copy and typed content arrays out of JSX; don't put links, image asset IDs or analytics metadata into translation strings.
- For actual production content, verify functions exist and the source of photos is legitimate. Keep demo examples labeled.
- Use existing localized route builders. “Куда пойти сегодня” currently links to Warsaw without a date filter: implement the actual existing filter contract, not invented query parameters.
- The final CTA uses translated common.eventsCta and common.becomeOrganizer. Existing 9 feature destinations must be tested including guest/auth redirects, Back, refresh and localized links.

## 7. Acceptance

Reference UX 01–04 on Google Drive:
- https://docs.google.com/document/d/1KHXr9Qpqqjx_gbdKOWFbF7DYWVfPuSbnK3wGqfM25G4/edit
- https://docs.google.com/document/d/1cWgz3LIG0pHELEe1Lu2LXQ7PT_hn-xrdZ3Cbx2q9S5o/edit
- https://docs.google.com/document/d/1_5ZbN86B0qk1qipAFLXIpHEzjVNUv8S0nM5G2LDnBXk/edit
- https://docs.google.com/document/d/1JmYxnjSvU3bl82W-WhFjHMimZ9wZE0SvhGFv2XadIns/edit

Before implementation obtain production repository, identify actual UI/theme and route conventions. Then migrate in small batches without changing content/order; build, lint, type-check, test server HTML/hydration, all interactive demos and CTA. Capture same-state baseline vs React screenshots at 320/360/390/768/1024/1440 px, dark/light, all five locales, 200% zoom, keyboard/touch, reduced motion. Check Core Web Vitals and no horizontal page overflow. Remove technical labels and preserve no auto-refresh. Apply the 11-criterion weighted matrix and regression gate. Preview remains noindex; production indexing/metadata follow actual SEO conventions. No release approval without visual and functional evidence.

## Status

Component inventory and proposed Tailwind migration plan prepared from v98 source. No React build or Tailwind compilation performed. Production GitLab source and theme not inspected in this pass. This handoff is not a completed migration.
