THIS IS THE OLD PRD. THE NEW ONE IS IN THE .agent FOLDER ???

In this section, there is an image that we changed the position. Is it possible to edit the text on the image markdown

# CompanyTech Enterprise Website - Product Requirements Document

## Executive Summary

Build a professional, conversion-focused enterprise website for CompanyTech showcasing their AI-powered manufacturing digital transformation platform to CXO-level decision makers in manufacturing industries.

## Project Goals

- **Primary:** Generate 10+ qualified demo requests per month
- **Secondary:** Establish CompanyTech as thought leader in Industry 4.0
- **Tertiary:** Support sales team with professional marketing collateral

## Target Audience

### Primary Persona: Manufacturing CXO

- **Role:** CEO, COO, CTO at mid-to-large manufacturing companies
- **Pain points:** Production inefficiencies, quality issues, data silos, manual monitoring
- **Needs:** ROI-focused solutions, proven case studies, technical credibility
- **Decision criteria:** Cost savings, implementation time, vendor reliability

### Secondary Persona: IT/Digital Transformation Director

- **Role:** IT Manager, Digital Transformation Lead
- **Pain po, sentient factory slide ints:** Legacy system integration, data architecture complexity
- **Needs:** Technical architecture details, API documentation, security compliance
- **Decision criteria:** Technical feasibility, integration capabilities, scalability

## User Stories

### Must Have (MVP)

- [ ] As a CXO, I want to understand CompanyTech's value proposition in 10 seconds, so I can decide if it's relevant to my business
- [ ] As a prospect, I want to see a proven case study with concrete metrics, so I can trust the solution works
- [ ] As a visitor, I want to easily book a demo, so I can evaluate the platform
- [ ] As an IT director, I want to understand the technical architecture, so I can assess integration requirements
- [ ] As a mobile user, I want the site to work perfectly on my phone, so I can review it anywhere

### Should Have

- [ ] As a CFO, I want to calculate potential ROI, so I can build business case
- [ ] As a visitor, I want to see the platform in action via screenshots/video, so I can visualize the solution
- [ ] As a researcher, I want to access technical whitepapers, so I can do due diligence
- [ ] As a Turkish visitor, I want content in my language, so I can understand better

### Could Have

- [ ] As a return visitor, I want to read industry insights/blog, so I can stay informed
- [ ] As a partner, I want to understand partnership opportunities, so I can explore collaboration
- [ ] As an investor, I want to see company metrics and growth, so I can evaluate opportunity

## Feature Requirements

### F1: Hero Section Carousel (Critical)

**Purpose:** Capture attention and communicate value proposition through rotating hero slides showcasing different aspects of the platform

**Format:** Auto-rotating carousel with 3 slides (5-7 seconds each), manual navigation controls, pause on hover

**Brand Elements (All Slides):**

- [ ] Logo: CompanyTech with purple gradient A icon
- [ ] Tagline: "DIGITAL TRANSFORMATION FOR MANUFACTURING"
- [ ] Navigation: Solutions, Architecture, ROI-Value, Case Studies, Company
- [ ] Primary CTA: "Book a Demo" (prominent, consistent across slides)
- [ ] Secondary CTA: "Explore Solutions" or slide-specific action

**Slide 1: "Cultivating Intelligent Manufacturing"**

- [ ] Headline: "Cultivating Intelligent Manufacturing"
- [ ] Visual concept: Digital brain/neural network (cyan/purple color scheme)
- [ ] Background image: `/assets/IMG_0827-9f13a1da-4adc-4544-87ef-3625c2c68c20.png` (digital brain network)
- [ ] Focus: AI-driven manufacturing intelligence
- [ ] Animation: Subtle pulse/glow on neural network connections
- [ ] CTA: "Discover Our AI Solutions"

**Slide 2: "The Sentient Factory"**

- [ ] Headline: "The Sentient Factory."
- [ ] Subheadline: "Talk to your Data."
- [ ] Supporting text: "We bridge the gap between raw industrial data and manufacturing intelligence, delivering measurable uplift in OEE and optimizing energy BOM"
- [ ] Visual concept: Holographic industrial interface with hand interaction
- [ ] Background image: `/assets/IMG_0823-36a3a1f5-fa33-4803-99e2-de3a29070c76.png` (holographic interface)
- [ ] Focus: Data-driven insights and measurable ROI
- [ ] Key metrics highlighted: OEE improvement, Energy BOM optimization
- [ ] CTA: "Calculate Your ROI"

**Slide 3: "CWF: Chat With Your Factory"**

- [ ] Headline: "CWF: Chat With Your Factory"
- [ ] Subheadline: "From Monitoring to Conversation."
- [ ] Supporting text: "If you could speak to your infrastructure, what would it say?"
- [ ] Visual concept: Mobile app (Factory Bot) showing conversational AI interface
- [ ] Background image: `/assets/IMG_0825-a1475408-97f7-45b5-94c9-5a023791f8f8.png` (Factory Bot mobile app)
- [ ] App interface shows:
  - Real-time status queries
  - Line efficiency metrics (94.5K Stable)
  - Alerts and warnings
  - Data visualizations (throughput, temp, vibration)
  - Recommended actions
- [ ] Focus: Conversational AI, mobile-first access
- [ ] CTA: "See CWF in Action"

**Carousel Controls:**

- [ ] Dot indicators (bottom center) showing current slide
- [ ] Arrow navigation (left/right)
- [ ] Auto-advance: 6 seconds per slide
- [ ] Pause on hover
- [ ] Swipe gestures on mobile
- [ ] Keyboard navigation (arrow keys)

**Mobile Optimization:**

- [ ] Full-screen slides with vertical layout
- [ ] Headlines scale appropriately (max 2-3 lines)
- [ ] Touch/swipe enabled
- [ ] Single CTA button per slide (primary only)
- [ ] Simplified animations for performance

**Success criteria:**

- Hero carousel visible without scrolling on all devices
- Each slide viewed by >60% of visitors
- CTA buttons >3% aggregate click-through rate
- Page load time <2 seconds (with optimized images)
- Carousel doesn't cause layout shift

### F2: Platform Overview Section

**Purpose:** Explain the 4-layer platform architecture

**Requirements:**

- [ ] Title: "Complete Manufacturing Intelligence Platform"
- [ ] Visual diagram showing 4 layers:
  1. **IoT-IGNITE:** Data Capture Layer (1M+ endpoints, 300K+ gateways)
  2. **ArMES/MOM:** Manufacturing Operations Management
  3. **ArAI:** Predictive Analytics & AI
  4. **CWF:** Chat With Your Factory (Conversational AI)
- [ ] Each layer has: Icon, Name, 1-sentence description, Key benefits (2-3 bullets)
- [ ] Interactive: Click each layer to expand details
- [ ] Mobile: Stack vertically, tap to expand

**Success criteria:**

- Users spend >30 seconds in this section
- Diagram is self-explanatory without text
- All text readable on mobile

### F3: Case Study - Kale Group (Critical)

**Purpose:** Provide social proof with concrete metrics

**Requirements:**

- [ ] Title: "Transforming Europe's 4th Largest Ceramics Manufacturer"
- [ ] Company info: Kale Group, 16 factories
- [ ] Challenge: Manual monitoring, quality inconsistencies, production delays
- [ ] Solution: Full CompanyTech platform deployment across all factories
- [ ] Results (with numbers):
  - 40% reduction in quality defects
  - 35% improvement in OEE (Overall Equipment Effectiveness)
  - 60% faster issue response time
  - Real-time visibility across all 16 factories
- [ ] Quote from decision-maker (if available)
- [ ] Before/After screenshots of CWF interface
- [ ] CTA: "Read Full Case Study" → PDF download

**Success criteria:**

- Metrics are prominent and scannable
- Case study increases demo requests by 25%
- PDF download tracked in analytics

### F4: ROI Calculator (Interactive)

**Purpose:** Help prospects quantify potential value

**Requirements:**

- [ ] Input fields:
  - Number of production lines (slider: 1-50)
  - Average downtime hours per month (input: 0-500)
  - Hourly production cost (input: $0-$50,000)
  - Quality defect rate % (input: 0-20%)
- [ ] Calculation logic:
  - Downtime savings = (downtime × 0.35) × hourly_cost × 12 months
  - Quality savings = production_volume × defect_rate × 0.40 × unit_cost
  - Total annual savings = downtime + quality + efficiency gains
- [ ] Output display:
  - Estimated annual savings (large, prominent)
  - ROI timeline (months to breakeven)
  - Breakdown by category (chart)
- [ ] CTA: "Get Detailed ROI Analysis" → Lead form
- [ ] Mobile: Simplified version with 3 inputs

**Success criteria:**

- 20%+ of visitors interact with calculator
- Calculator completion → demo request conversion >15%
- Results feel credible (not inflated)

### F5: Features Grid

**Purpose:** Communicate key capabilities

**Requirements:**

- [ ] 6-8 key features:
  1. Real-time Production Monitoring
  2. Predictive Maintenance (AI-powered)
  3. Quality Control Automation
  4. Energy Consumption Optimization
  5. Conversational Factory Interface (CWF)
  6. Cross-Factory Analytics
  7. Legacy System Integration
  8. Mobile-First Access
- [ ] Each feature: Icon, Title, 2-sentence description, "Learn More" link
- [ ] Grid layout: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- [ ] Hover effect: Subtle lift and shadow

**Success criteria:**

- Features are scannable in <10 seconds
- Icons are professional and consistent
- No feature requires >2 sentences to understand

### F6: Technology Stack Section

**Purpose:** Build technical credibility

**Requirements:**

- [ ] Title: "Enterprise-Grade Technology"
- [ ] Architecture diagram showing:
  - Edge layer (IoT devices, gateways)
  - Data layer (time-series DB, data lake)
  - AI layer (ML models, analytics)
  - Application layer (web, mobile, API)
- [ ] Technology badges: Docker, Kubernetes, TensorFlow, React, etc.
- [ ] Security certifications: ISO 27001, SOC 2 (if applicable)
- [ ] Integration capabilities: REST API, MQTT, OPC-UA
- [ ] CTA: "View Technical Documentation"

**Success criteria:**

- IT decision-makers find this section useful
- Architecture diagram is clear and accurate
- Technical depth without overwhelming non-technical visitors

### F7: Testimonials

**Purpose:** Build trust through social proof

**Requirements:**

- [ ] 3-5 testimonials from:
  - Kale Group decision-maker
  - Manufacturing Director
  - IT Manager
  - COO/CEO
- [ ] Each testimonial includes:
  - Quote (2-3 sentences, specific benefits)
  - Name, Title, Company
  - Company logo
  - Photo (if available)
- [ ] Carousel format (auto-rotate every 5 seconds, manual controls)
- [ ] Mobile: Single testimonial visible, swipe to navigate

**Success criteria:**

- Testimonials feel authentic (specific, not generic)
- Include metrics where possible
- Mix of different roles/perspectives

### F8: Contact/Demo Request Form (Critical)

**Purpose:** Convert visitors into qualified leads

**Requirements:**

- [ ] Form fields:
  - Full Name\* (required)
  - Business Email\* (required, validated)
  - Company Name\* (required)
  - Job Title\* (required)
  - Phone Number (optional, but encouraged)
  - Number of Production Facilities (dropdown: 1, 2-5, 6-10, 11-20, 21+)
  - Industry (dropdown: Ceramics, Automotive, Electronics, Food & Beverage, Other)
  - Message (optional, textarea)
  - Preferred demo date (calendar picker)
- [ ] Validation:
  - Email format check
  - Required fields marked clearly
  - Error messages are helpful ("Please enter a valid business email")
  - Success message after submission
- [ ] Backend: Netlify Forms or Formspre (no custom backend needed)
- [ ] Notifications: Email to sales@CompanyTech.com.tr
- [ ] Auto-responder: Thank you email to user with next steps
- [ ] CTA button: "Book Your Demo" (not "Submit")
- [ ] Privacy: Link to privacy policy, GDPR compliance notice
- [ ] Mobile: Single column, larger input fields

**Success criteria:**

- Form completion rate >60%
- Submission error rate <5%
- Spam prevention (honeypot field)
- Mobile-friendly (touch-optimized)

### F9: Footer

**Purpose:** Navigation and legal compliance

**Requirements:**

- [ ] Company Info:
  - CompanyTech logo
  - Tagline
  - Istanbul, Turkey location
  - Social media links (LinkedIn, Twitter, YouTube)
- [ ] Quick Links:
  - About Us
  - Platform
  - Case Studies
  - Resources/Blog
  - Contact
  - Careers
- [ ] Legal:
  - Privacy Policy
  - Terms of Service
  - Cookie Policy
- [ ] Newsletter signup:
  - Email input
  - "Subscribe to Industry 4.0 Insights"
  - GDPR checkbox
- [ ] Copyright: "© 2026 CompanyTech. All rights reserved."
- [ ] Mobile: Accordion sections for link groups

**Success criteria:**

- All legal pages exist and are accessible
- Social links open in new tab
- Footer doesn't feel cluttered

## Technical Requirements

### Performance

- **MUST:** First Contentful Paint <1.5s
- **MUST:** Largest Contentful Paint <2.5s
- **MUST:** Cumulative Layout Shift <0.1
- **MUST:** Time to Interactive <3s
- **SHOULD:** Total page size <2MB
- **SHOULD:** Images in WebP format with fallbacks

### Responsive Design

- **MUST:** Mobile breakpoint: 320px-767px
- **MUST:** Tablet breakpoint: 768px-1023px
- **MUST:** Desktop breakpoint: 1024px+
- **MUST:** All touch targets minimum 44x44px
- **MUST:** Text readable without zooming (minimum 16px body)

### Browser Support

- **MUST:** Chrome/Edge (latest 2 versions)
- **MUST:** Safari (latest 2 versions)
- **MUST:** Firefox (latest 2 versions)
- **SHOULD:** Mobile Safari iOS 14+
- **SHOULD:** Chrome Android (latest)

### Accessibility (WCAG 2.1 AA)

- **MUST:** All images have alt text
- **MUST:** Color contrast ratio ≥4.5:1 for text
- **MUST:** Keyboard navigation works for all interactive elements
- **MUST:** Form inputs have proper labels
- **MUST:** Skip to main content link
- **SHOULD:** Screen reader tested
- **SHOULD:** ARIA landmarks used correctly

### SEO Requirements

- **MUST:** Unique meta title and description per page
- **MUST:** Structured data (Organization, LocalBusiness)
- **MUST:** XML sitemap
- **MUST:** robots.txt
- **MUST:** Canonical URLs
- **SHOULD:** Open Graph tags for social sharing
- **SHOULD:** Twitter Card tags
- **SHOULD:** JSON-LD structured data for Case Study

### Security

- **MUST:** HTTPS only
- **MUST:** No inline scripts (CSP headers)
- **MUST:** Form validation (client + server-side)
- **MUST:** Honeypot spam prevention
- **SHOULD:** Security headers (X-Frame-Options, X-Content-Type-Options)
- **SHOULD:** Subresource Integrity for external scripts

### Analytics & Tracking

- **MUST:** Google Analytics 4 tracking
- **MUST:** Event tracking for:
  - Demo button clicks
  - Calculator interactions
  - PDF downloads
  - Form submissions
- **SHOULD:** Hotjar or similar for heatmaps
- **SHOULD:** Conversion funnel tracking

## Content Requirements

### Tone & Voice

- **Professional but approachable:** Not overly corporate or stiff
- **Data-driven:** Use specific metrics, avoid vague claims
- **Action-oriented:** Clear CTAs, encourage next steps
- **Technical credibility:** Show expertise without jargon overload
- **Turkish-English bilingual:** Equal quality in both languages

### Copy Guidelines

- **Headlines:** 6-10 words, benefit-focused
- **Body text:** Short paragraphs (2-3 sentences), scannable
- **CTAs:** Action verbs, specific ("Book Your Demo" not "Click Here")
- **Metrics:** Use real numbers (40% improvement, 16 factories)
- **Avoid:** Marketing fluff, superlatives without proof, technical jargon for non-technical sections

### Image Requirements

- **Hero:** High-quality manufacturing floor or data visualization (1920x1080)
- **Platform diagram:** Custom illustration, brand colors
- **Case study:** Real screenshots from Kale implementation
- **Team photos:** Professional headshots if showing team
- **Icons:** Consistent style (line or solid, not mixed)
- **Format:** WebP with PNG/JPG fallback
- **Optimization:** All images compressed, responsive sizes

## Design Constraints

### Brand Identity

- **Colors:**
  - Primary: Industrial Blue (#1E3A8A)
  - Secondary: Tech Orange (#F97316)
  - Accent: Data Green (#10B981)
  - Neutrals: Gray scale (#F9FAFB to #111827)
- **Typography:**
  - Headings: Inter (700 weight)
  - Body: Source Sans Pro (400, 600 weights)
  - Code/Technical: Fira Code
- **Visual Style:**
  - Clean, modern, minimalist
  - Industrial aesthetic (subtle gears, circuits, data viz)
  - Not too corporate, not too startup-y
  - Professional photography, not stock images

### Layout Principles

- **Whitespace:** Generous spacing, not cramped
- **Hierarchy:** Clear visual hierarchy (size, weight, color)
- **Alignment:** Grid-based, consistent spacing
- **Consistency:** Reusable components, design system
- **Focus:** One primary action per section

## Non-Functional Requirements

### Scalability

- **MUST:** Support 10,000 monthly visitors without performance degradation
- **SHOULD:** CDN delivery (Vercel Edge Network)
- **SHOULD:** Image optimization pipeline

### Maintainability

- **MUST:** Code documented with comments
- **MUST:** Component-based architecture (reusable)
- **MUST:** Git version control with meaningful commits
- **SHOULD:** Storybook for component documentation
- **SHOULD:** Automated deployment pipeline

### Localization

- **MUST:** Turkish and English versions
- **MUST:** Language switcher in header
- **MUST:** Proper RTL support if needed (though Turkish is LTR)
- **SHOULD:** Automatic language detection based on browser
- **SHOULD:** URL structure: /en/ and /tr/ paths

## Success Metrics

### Business KPIs

- **Primary:** 10+ qualified demo requests per month
- **Secondary:** 5,000+ monthly unique visitors within 6 months
- **Tertiary:** 30%+ demo-to-customer conversion rate

### User Experience Metrics

- **Bounce rate:** <40%
- **Average session duration:** >2 minutes
- **Pages per session:** >3
- **CTA click-through rate:** >3%
- **Form completion rate:** >60%

### Technical Metrics

- **Lighthouse Performance:** >90
- **Lighthouse Accessibility:** >95
- **Lighthouse SEO:** >95
- **Core Web Vitals:** All "Good" ratings
- **Uptime:** >99.9%

## Project Constraints

### Timeline

- **MVP:** 2-3 weeks
- **Full Launch:** 4-6 weeks
- **Iterative improvements:** Ongoing

### Budget

- **Design:** Internal/freelance
- **Development:** Using Claude Code + Cursor
- **Hosting:** Vercel (free tier initially, ~$20/month pro)
- **Domain:** Existing (CompanyTech.com.tr)
- **Tools:** Minimal external costs

### Technical Limitations

- **No custom backend initially:** Use Netlify Forms or Formspree
- **No database:** Static site, content in code/CMS later
- **No authentication:** Public website only
- **No complex animations:** Keep bundle size small

## Out of Scope (v1)

### NOT Included in MVP

- ❌ Full blog/content management system
- ❌ Customer portal or dashboard
- ❌ E-commerce functionality
- ❌ Multi-currency pricing
- ❌ Chat widget (can add later)
- ❌ Video hosting (use YouTube embeds)
- ❌ Dynamic personalization
- ❌ A/B testing framework
- ❌ Advanced analytics beyond GA4
- ❌ Marketing automation integration

## Appendix

### Competitor Analysis (Reference Only)

- **Siemens MindSphere:** Enterprise-heavy, complex, expensive perception
- **AVEVA:** Strong but traditional interface, not conversational AI focused
- **Competitors:** Position CompanyTech as more accessible, AI-native, faster ROI

### Questions to Resolve

1. Do we have official Kale Group permission for case study details?
2. What is the exact messaging for CWF (Chat With Your Factory)?
3. Are there specific compliance requirements (GDPR, etc.)?
4. Who is the point of contact for demo requests?
5. Do we have professional photography/screenshots available?

---

**Document Version:** 1.0  
**Last Updated:** February 1, 2026  
**Author:** [Your Name]  
**Approver:** [Stakeholder Name]
