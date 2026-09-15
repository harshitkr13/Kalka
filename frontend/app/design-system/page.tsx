'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { RadioGroup } from '@/components/ui/Radio';
import { Modal } from '@/components/ui/Modal';
import { Drawer } from '@/components/ui/Drawer';
import { Accordion } from '@/components/ui/Accordion';
import { Tabs } from '@/components/ui/Tabs';
import { useToast } from '@/components/ui/Toast';
import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton';
import { Loading } from '@/components/ui/Loading';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { IndustryCard } from '@/components/cards/IndustryCard';
import { BlogCard } from '@/components/cards/BlogCard';
import { CaseStudyCard } from '@/components/cards/CaseStudyCard';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { Hero } from '@/sections/Hero';
import { LogoCloud } from '@/components/editorial/LogoCloud';
import { Gallery, GalleryItemData } from '@/components/editorial/Gallery';
import { Search } from '@/components/editorial/Search';
import { FilterBar } from '@/components/editorial/FilterBar';
import {
  ArrowRight,
  Sparkles,
  Shield,
  Layers,
  Palette,
  Type,
  ToggleLeft,
  Layout,
  MessageSquare,
  AlertTriangle,
  Monitor,
  Search as SearchIcon,
} from 'lucide-react';

export default function DesignSystemPage() {
  const { toast, success, error, warning, info } = useToast();

  // Interactive Component State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [radioSelection, setRadioSelection] = useState('retainer');
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  // Form Inputs Demo State
  const [formData, setFormData] = useState({
    name: 'Harshit Sharma',
    email: 'client@example.com',
    sector: 'real-estate',
    message: 'We are preparing for our annual stakeholder summit and require strategic narrative positioning.',
  });

  const sampleGalleryItems: GalleryItemData[] = [
    {
      id: 'g1',
      title: 'Global Infrastructure Summit',
      category: 'Keynote & Media',
      datePlaceholder: 'October 2026',
      description: 'Strategic keynote positioning and live international press room management for infrastructure consortium.',
    },
    {
      id: 'g2',
      title: 'Executive Thought Leadership Roundtable',
      category: 'Corporate Affairs',
      datePlaceholder: 'November 2026',
      description: 'Private Chatham-House media briefing with tier-1 national economic editors.',
    },
    {
      id: 'g3',
      title: 'Capital Markets IPO Announcement',
      category: 'Financial PR',
      datePlaceholder: 'December 2026',
      description: 'Synchronized multi-exchange public listing announcement and crisis readiness command.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Universal Sticky Navbar */}
      <Navbar />

      {/* Showcase Sub-Header */}
      <div className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="gold" size="sm">Phase 1 Delivery</Badge>
              <span className="text-xs text-slate-400 font-mono">/design-system</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
              Kalka Co. Design System Showcase
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live interactive verification of tokens, primitives, composite domain cards, and accessibility.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Viewports:</span>
            {['320px', '375px', '768px', '1024px', '1440px', '1920px+'].map((vp) => (
              <span key={vp} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                {vp}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* ================================================================== */}
        {/* 1. BRAND COLOR TOKENS */}
        {/* ================================================================== */}
        <section id="colors" className="space-y-6">
          <div className="flex items-center gap-2 text-gold-dark font-serif text-xl font-semibold border-b border-slate-200 pb-2">
            <Palette className="w-5 h-5" />
            <h2>1. Editorial Color Palette & Tokens</h2>
          </div>
          <p className="text-sm text-slate-600">
            Sophisticated, corporate palette calibrated for high contrast, editorial authority, and human warmth.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-left">
            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-subtle">
              <div className="h-16 rounded bg-[#050a15] border border-slate-300" />
              <div>
                <p className="text-xs font-semibold text-navy">Navy Deep</p>
                <p className="text-[11px] font-mono text-slate-400">#050a15</p>
                <p className="text-[10px] text-slate-500">Obsidian Canvas</p>
              </div>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-subtle">
              <div className="h-16 rounded bg-[#0a1628] border border-slate-300" />
              <div>
                <p className="text-xs font-semibold text-navy">Navy Primary</p>
                <p className="text-[11px] font-mono text-slate-400">#0a1628</p>
                <p className="text-[10px] text-slate-500">Brand Primary</p>
              </div>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-subtle">
              <div className="h-16 rounded bg-[#112240] border border-slate-300" />
              <div>
                <p className="text-xs font-semibold text-navy">Navy Surface</p>
                <p className="text-[11px] font-mono text-slate-400">#112240</p>
                <p className="text-[10px] text-slate-500">Dark Elev. Card</p>
              </div>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-subtle">
              <div className="h-16 rounded bg-[#c9a84c] border border-slate-300" />
              <div>
                <p className="text-xs font-semibold text-navy">Gold Accent</p>
                <p className="text-[11px] font-mono text-slate-400">#c9a84c</p>
                <p className="text-[10px] text-slate-500">Champagne Gold</p>
              </div>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-subtle">
              <div className="h-16 rounded bg-[#f5f0e8] border border-slate-300" />
              <div>
                <p className="text-xs font-semibold text-navy">Warm Cream</p>
                <p className="text-[11px] font-mono text-slate-400">#f5f0e8</p>
                <p className="text-[10px] text-slate-500">Newsprint Canvas</p>
              </div>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-subtle">
              <div className="h-16 rounded bg-[#e8e6e1] border border-slate-300" />
              <div>
                <p className="text-xs font-semibold text-navy">Slate 100</p>
                <p className="text-[11px] font-mono text-slate-400">#e8e6e1</p>
                <p className="text-[10px] text-slate-500">Muted Borders</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 2. TYPOGRAPHY SCALE */}
        {/* ================================================================== */}
        <section id="typography" className="space-y-6">
          <div className="flex items-center gap-2 text-gold-dark font-serif text-xl font-semibold border-b border-slate-200 pb-2">
            <Type className="w-5 h-5" />
            <h2>2. Editorial Typographic Scale</h2>
          </div>

          <div className="space-y-6 text-left border border-slate-200 rounded p-6 bg-slate-50/40">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                Display 2XL — font-serif (Outfit / Georgia) • 56px / 64px
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight">
                Strategic Communication. Lasting Impact.
              </h1>
            </div>

            <div className="border-b border-slate-200 pb-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                Heading 1 — font-serif • 36px / 42px
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy">
                Corporate Narrative Engineering & Brand Resonance
              </h2>
            </div>

            <div className="border-b border-slate-200 pb-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                Heading 2 & 3 — font-serif • 24px / 30px
              </span>
              <h3 className="font-serif text-2xl font-semibold text-navy">
                Navigating Complex Media Landscapes with Precision
              </h3>
            </div>

            <div className="border-b border-slate-200 pb-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                Body Large — font-sans (Inter) • 18px / 28px
              </span>
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                Kalka Co. operates at the intersection of reputation, media, and enterprise strategy, advising institutional boards and executive teams.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                Overline / Tracked Metadata • 11px uppercase tracking-widest
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block">
                STRATEGIC REPUTATION ADVISORY • 2026 INTELLIGENCE
              </span>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 3. BUTTONS & INTERACTIVE STATES */}
        {/* ================================================================== */}
        <section id="buttons" className="space-y-6">
          <div className="flex items-center gap-2 text-gold-dark font-serif text-xl font-semibold border-b border-slate-200 pb-2">
            <ToggleLeft className="w-5 h-5" />
            <h2>3. Button Hierarchy & States</h2>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="md">Primary Navy</Button>
              <Button variant="gold" size="md">Gold CTA</Button>
              <Button variant="secondary" size="md">Secondary</Button>
              <Button variant="outline" size="md">Outline</Button>
              <Button variant="ghost" size="md">Ghost</Button>
              <Button variant="danger" size="md">Danger</Button>
            </div>

            <div className="flex flex-wrap gap-4 items-center pt-2">
              <Button variant="gold" size="sm">Small</Button>
              <Button variant="gold" size="md">Medium</Button>
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Large with Icon
              </Button>
              <Button variant="primary" size="md" isLoading>
                Loading State
              </Button>
              <Button variant="outline" size="md" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 4. FORM CONTROLS & VALIDATION */}
        {/* ================================================================== */}
        <section id="forms" className="space-y-6">
          <div className="flex items-center gap-2 text-gold-dark font-serif text-xl font-semibold border-b border-slate-200 pb-2">
            <MessageSquare className="w-5 h-5" />
            <h2>4. Form Controls & Validation States</h2>
          </div>

          <div className="p-8 border border-slate-200 rounded bg-white max-w-2xl text-left space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Eleanor Vance"
              />
              <Input
                label="Corporate Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. name@company.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Sector Practice"
                options={[
                  { value: 'real-estate', label: 'Real Estate & Infrastructure' },
                  { value: 'corporate', label: 'Corporate & Conglomerates' },
                  { value: 'tech', label: 'Technology & Startups' },
                  { value: 'healthcare', label: 'Healthcare & Life Sciences' },
                ]}
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              />

              <Input
                label="Error State Preview"
                value="invalid-domain"
                error="Please enter an approved corporate domain."
              />
            </div>

            <Textarea
              label="Brief Communication Scope"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              helperText="Describe your organization's core objective or upcoming milestone."
            />

            <RadioGroup
              label="Engagement Model"
              name="engagement_model"
              selectedValue={radioSelection}
              onChange={setRadioSelection}
              options={[
                { value: 'retainer', label: 'Ongoing Strategic Retainer', description: 'Continuous media relations & executive advisory' },
                { value: 'project', label: 'Milestone Campaign / Crisis Intervention', description: 'Targeted high-stakes communications deployment' },
              ]}
            />

            <Checkbox
              label="I agree to receive communications in accordance with Kalka Co. privacy guidelines."
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />

            <Button
              variant="gold"
              size="md"
              onClick={() => success('Form Validated', 'All fields pass editorial schema requirements.')}
            >
              Submit Test Form
            </Button>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 5. HERO SECTION FOUNDATION */}
        {/* ================================================================== */}
        <section id="hero" className="space-y-6">
          <div className="flex items-center gap-2 text-gold-dark font-serif text-xl font-semibold border-b border-slate-200 pb-2">
            <Layout className="w-5 h-5" />
            <h2>5. Reusable Hero Section Foundation</h2>
          </div>
          <p className="text-sm text-slate-600">
            Preview of the responsive Hero foundation that will power public pages.
          </p>

          <div className="rounded overflow-hidden shadow-premium">
            <Hero
              headline="Strategic Narrative. Institutional Trust."
              subheadline="We architect high-impact communication strategies, cultivate commanding media presence, and insulate corporate reputation in pivotal moments."
              primaryCtaAction={() => info('Hero CTA Triggered', 'Primary action clicked.')}
              secondaryCtaAction={() => toast({ title: 'Secondary Action', description: 'Navigating to case studies showcase.' })}
            />
          </div>
        </section>

        {/* ================================================================== */}
        {/* 6. COMPOSITE DOMAIN CARDS */}
        {/* ================================================================== */}
        <section id="cards" className="space-y-6">
          <div className="flex items-center gap-2 text-gold-dark font-serif text-xl font-semibold border-b border-slate-200 pb-2">
            <Layers className="w-5 h-5" />
            <h2>6. Composite Domain Cards</h2>
          </div>

          <div className="space-y-12">
            {/* Service & Industry Cards */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-navy mb-4 text-left">
                Service & Industry Practice Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard
                  category="Core Practice"
                  title="Media Relations & Editorial Strategy"
                  description="Targeted journalist network engagement, tier-1 newsroom placement, and strategic press briefings."
                  capabilities={['Tier-1 Editorial', 'Press Conferences', 'Media Briefings']}
                  badge="High Impact"
                />
                <ServiceCard
                  category="Reputation Practice"
                  title="Crisis Management & Risk Mitigation"
                  description="24/7 rapid response protocols, stakeholder alignment, and narrative recovery during scrutiny."
                  capabilities={['Crisis Protocols', 'Spokesperson Prep', 'Hostile Monitoring']}
                />
                <IndustryCard
                  sectorTag="Industry"
                  title="Real Estate & Infrastructure"
                  description="Crafting transformative positioning for marquee commercial assets and national infrastructure projects."
                  featured
                />
              </div>
            </div>

            {/* Case Study Card */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-navy mb-4 text-left">
                Featured Case Study Card
              </h3>
              <CaseStudyCard
                title="Strategic Narrative Pivot for National Logistics Consortium"
                clientIndustry="Infrastructure & Supply Chain"
                challengeBrief="Following a major multi-state expansion, the leadership team required clear market positioning to engage institutional investors and national business media."
                metricPlaceholder="340%+"
                metricLabel="Tier-1 Editorial Share of Voice Gain"
              />
            </div>

            {/* Editorial Blog Card */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-navy mb-4 text-left">
                Editorial Insight Card
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BlogCard
                  category="Media Strategy"
                  title="The Shift to Earned Authority in Corporate PR"
                  subtitle="Why executive thought leadership now outweighs traditional promotional releases."
                  datePlaceholder="Q3 2026"
                  readTime="6 min read"
                />
                <BlogCard
                  category="Crisis Advisory"
                  title="Commanding the Narrative in the First 60 Minutes"
                  subtitle="Key principles for corporate communicators managing acute reputational stress."
                  datePlaceholder="Q3 2026"
                  readTime="8 min read"
                />
                <BlogCard
                  category="Reputation"
                  title="ESG Accountability and Stakeholder Scrutiny"
                  subtitle="Aligning sustainability disclosures with credible media narratives."
                  datePlaceholder="Q4 2026"
                  readTime="5 min read"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 7. INTERACTIVE DIALOGS & OVERLAYS */}
        {/* ================================================================== */}
        <section id="overlays" className="space-y-6">
          <div className="flex items-center gap-2 text-gold-dark font-serif text-xl font-semibold border-b border-slate-200 pb-2">
            <Shield className="w-5 h-5" />
            <h2>7. Accessible Modals, Drawers & Toast Notifications</h2>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Accessible Modal
            </Button>
            <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>
              Open Slide Drawer
            </Button>

            <Button variant="secondary" onClick={() => success('Success Notification', 'Engagement updated successfully.')}>
              Trigger Success Toast
            </Button>
            <Button variant="secondary" onClick={() => warning('Warning Notice', 'Scheduled maintenance window approaching.')}>
              Trigger Warning Toast
            </Button>
            <Button variant="secondary" onClick={() => error('Action Failed', 'Unable to verify server response.')}>
              Trigger Error Toast
            </Button>
          </div>

          {/* Modal Demo */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Strategic Consultation Request"
            description="Kalka Co. Executive Briefing Room"
            footer={
              <>
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    setIsModalOpen(false);
                    success('Request Sent', 'Our partner team will reach out within 24 hours.');
                  }}
                >
                  Confirm Request
                </Button>
              </>
            }
          >
            <div className="space-y-4 text-sm text-slate-600">
              <p>
                This modal component demonstrates accessible keyboard traps, background blur, and ESC-to-close behavior.
              </p>
              <Input label="Your Name" placeholder="e.g. John Doe" />
              <Input label="Company Name" placeholder="e.g. Acme Corp" />
            </div>
          </Modal>

          {/* Drawer Demo */}
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title="Consultancy Practice Overview"
          >
            <div className="space-y-4 text-sm text-slate-600">
              <p>
                The Drawer slide-over provides smooth entrance from the right, focus retention, and responsive dismissal.
              </p>
              <div className="p-4 border border-slate-200 rounded bg-slate-50">
                <span className="text-xs font-semibold uppercase text-gold-dark block mb-1">
                  Practice Scope
                </span>
                <p className="text-xs text-slate-500">
                  Comprehensive strategic narrative alignment for institutional stakeholders.
                </p>
              </div>
              <Button
                variant="gold"
                size="sm"
                className="w-full mt-4"
                onClick={() => setIsDrawerOpen(false)}
              >
                Close Drawer
              </Button>
            </div>
          </Drawer>
        </section>

        {/* ================================================================== */}
        {/* 8. ACCORDIONS, TABS & BREADCRUMBS */}
        {/* ================================================================== */}
        <section id="navigation-primitives" className="space-y-6">
          <div className="flex items-center gap-2 text-gold-dark font-serif text-xl font-semibold border-b border-slate-200 pb-2">
            <ToggleLeft className="w-5 h-5" />
            <h2>8. Accordion, Tabs & Breadcrumbs</h2>
          </div>

          <div className="space-y-8">
            <Breadcrumbs
              items={[
                { label: 'Firm', href: '#' },
                { label: 'Practices', href: '#' },
                { label: 'Strategic Media Relations' },
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Accordion Demo */}
              <div>
                <h3 className="font-serif text-base font-semibold text-navy mb-3 text-left">
                  Interactive Accordion
                </h3>
                <Accordion
                  items={[
                    {
                      id: 'acc1',
                      title: 'How does Kalka Co. structure retainer advisory engagements?',
                      content: 'Our strategic retainers pair dedicated partner-level advisors with seasoned media specialists to deliver proactive narrative placement and round-the-clock crisis readiness.',
                    },
                    {
                      id: 'acc2',
                      title: 'What sectors are supported within our core practice?',
                      content: 'We specialize in real estate, corporate conglomerates, infrastructure, health systems, and high-growth technology enterprises requiring institutional credibility.',
                    },
                    {
                      id: 'acc3',
                      title: 'What is our protocol for sensitive crisis containment?',
                      content: 'Our emergency crisis cell activates within minutes to evaluate narrative exposure, draft unified executive statements, and synchronize communication across tier-1 news channels.',
                    },
                  ]}
                />
              </div>

              {/* Tabs Demo */}
              <div>
                <h3 className="font-serif text-base font-semibold text-navy mb-3 text-left">
                  Accessible Tabs (Arrow Key Navigable)
                </h3>
                <Tabs
                  tabs={[
                    {
                      id: 'overview',
                      label: 'Overview',
                      content: (
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Kalka Co. combines seasoned editorial instinct with rigorous corporate strategy. We provide the counsel, media networks, and execution power that market leaders rely on.
                        </p>
                      ),
                    },
                    {
                      id: 'methodology',
                      label: 'Methodology',
                      badge: 'Proven',
                      content: (
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Our four-stage engagement methodology: Diagnostic Intelligence, Narrative Blueprinting, Tier-1 Execution, and Continuous Reputation Monitoring.
                        </p>
                      ),
                    },
                    {
                      id: 'impact',
                      label: 'Outcomes',
                      content: (
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Demonstrated elevation in earned media authority, investor resonance, and risk insulation during key strategic transitions.
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 9. SEARCH & FILTERING CONTROLS */}
        {/* ================================================================== */}
        <section id="search-filters" className="space-y-6">
          <div className="flex items-center gap-2 text-gold-dark font-serif text-xl font-semibold border-b border-slate-200 pb-2">
            <SearchIcon className="w-5 h-5" />
            <h2>9. Search & Filter Bar Controls</h2>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <Search
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Filter insights or practice areas..."
            />
            <FilterBar
              selectedId={selectedCategory}
              onSelect={setSelectedCategory}
              options={[
                { id: 'all', label: 'All Practices', count: 18 },
                { id: 'pr', label: 'Media Relations', count: 6 },
                { id: 'crisis', label: 'Crisis Advisory', count: 4 },
                { id: 'thought', label: 'Thought Leadership', count: 8 },
              ]}
            />
          </div>
        </section>

        {/* ================================================================== */}
        {/* 10. EDITORIAL LOGO CLOUD & GALLERY */}
        {/* ================================================================== */}
        <section id="editorial-blocks" className="space-y-6">
          <div className="flex items-center gap-2 text-gold-dark font-serif text-xl font-semibold border-b border-slate-200 pb-2">
            <Monitor className="w-5 h-5" />
            <h2>10. Trust Architecture & Media Gallery</h2>
          </div>

          <LogoCloud />

          <div className="pt-6">
            <SectionHeader
              overline="Media Moments"
              title="Media Gallery & Keynotes"
              description="A curated preview of executive briefings, major announcements, and strategic public affairs forums."
            />
            <Gallery items={sampleGalleryItems} />
          </div>
        </section>

        {/* ================================================================== */}
        {/* 11. FEEDBACK & ASYNC STATES */}
        {/* ================================================================== */}
        <section id="feedback-states" className="space-y-6">
          <div className="flex items-center gap-2 text-gold-dark font-serif text-xl font-semibold border-b border-slate-200 pb-2">
            <AlertTriangle className="w-5 h-5" />
            <h2>11. Feedback & Asynchronous Loading States</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 text-left">
                Skeleton Loading Placeholder
              </h4>
              <SkeletonCard />
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 text-left">
                Empty & Error Fallback States
              </h4>
              <EmptyState
                title="No Enquiries Found"
                description="When new lead submissions arrive, they will be organized here according to CRM status."
                action={<Button variant="outline" size="sm">Refresh Enquiries</Button>}
              />
              <ErrorState
                title="API Connection Notice"
                message="Backend endpoints are strictly gated until Phase 3 per project specifications."
                onRetry={() => info('Retry Triggered', 'Testing recovery callback.')}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
