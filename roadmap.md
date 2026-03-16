# Roadmap: Production-Ready AI UX/UI Portfolio

## Status: Sprint 2 (Integrations & SEO)

### Sprint 1: Stability & Security (Completed)
- [x] **Global Toast Notifications**: Implement `react-hot-toast` in all forms (Contact, Admin, Client Portal).
- [x] **Firestore Rules Audit**: Add `.size()` limits to all string fields to prevent DoS attacks.
- [x] **Error Handling Refinement**: Ensure all AI service calls have robust try/catch blocks and user-facing feedback.
- [x] **[SPIKE] Auth Security**: Review session persistence and admin access verification (Added email_verified check).

### Sprint 2: Integrations & SEO
- [ ] **Dynamic Sitemap**: Update `scripts/generate-sitemap.ts` to fetch projects and blog posts from Firestore.
- [ ] **[SPIKE] GSC API**: Research and prototype Google Search Console API integration for real-time SEO monitoring.
- [ ] **Analytics**: Integrate GA4 or Plausible for privacy-focused tracking.
- [ ] **Newsletter**: Connect lead magnets to a real email marketing service (e.g., Mailchimp).

### Sprint 3: Polish & Launch
- [ ] **Image Optimization**: Implement WebP/AVIF support and lazy loading for all portfolio assets.
- [ ] **Compliance**: Finalize Privacy Policy, Terms of Service, and a functional Cookie Consent banner.
- [ ] **Performance**: Optimize bundle size and achieve Lighthouse scores > 90.
- [ ] **Final Polish**: Refine Framer Motion transitions and micro-interactions.

---

## Definition of "Done"
1. **Security**: No `allow read: if true` without authentication (unless public). All writes validated for size and type.
2. **Stability**: No unhandled exceptions; all errors caught by `ErrorBoundary` or reported via `toast`.
3. **SEO**: Dynamic metadata for every project and blog post.
4. **UX**: Smooth transitions, accessible UI (WCAG 2.1 AA), and clear feedback for every user action.
