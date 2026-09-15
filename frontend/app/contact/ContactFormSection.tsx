'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  X,
  AlertTriangle
} from 'lucide-react';
import { submitPublicContact, PublicContactResponse } from '@/lib/api/leads';

const offices = [
  {
    city: 'New Delhi (HQ)',
    title: 'National Headquarters & Media Relations Bureau',
    address: '[OFFICE PLACEHOLDER: Sample Corporate Address, Barakhamba Road, Connaught Place, New Delhi 110001]',
    phone: '+91 11 4000 0000 [DEMO]',
    email: 'delhi@kalka.co.in',
    hours: 'Mon – Fri: 08:30 – 19:30 IST',
    desk: 'Corporate, Public Affairs & National Bureaus',
  },
  {
    city: 'Mumbai',
    title: 'Financial & Capital Markets Practice',
    address: '[OFFICE PLACEHOLDER: Sample Financial Desk, Nariman Point, Mumbai 400021]',
    phone: '+91 22 6000 0000 [DEMO]',
    email: 'mumbai@kalka.co.in',
    hours: 'Mon – Fri: 08:30 – 20:00 IST',
    desk: 'M&A, Investor Relations & Corporate Finance',
  },
  {
    city: 'Bengaluru',
    title: 'Technology & Enterprise Growth Practice',
    address: '[OFFICE PLACEHOLDER: Sample Tech Practice, MG Road, Bengaluru 560001]',
    phone: '+91 80 4500 0000 [DEMO]',
    email: 'bengaluru@kalka.co.in',
    hours: 'Mon – Fri: 09:00 – 19:00 IST',
    desk: 'SaaS, DeepTech & Unicorn Scaling Desks',
  },
  {
    city: 'London (Liaison)',
    title: 'International Markets & Cross-Border Desk',
    address: '[OFFICE PLACEHOLDER: Sample Liaison Bureau, Mayfair, London W1J 6BD, UK]',
    phone: '+44 20 7946 0000 [DEMO]',
    email: 'london@kalka.co.in',
    hours: 'Mon – Fri: 09:00 – 18:00 GMT',
    desk: 'Cross-Border Capital & Sovereign Positioning',
  },
];

const urgencyLevels = [
  { value: 'standard', label: 'Standard Strategic Consultation (Response within 24 business hours)' },
  { value: 'priority', label: 'High-Priority Executive Briefing (Response within 4 business hours)' },
  { value: 'crisis', label: 'Acute Crisis Incident (Immediate 60-Minute Activation by Partner)' },
];

export const ContactFormSection: React.FC = () => {
  const searchParams = useSearchParams();

  // Read URL search params
  const serviceParam = searchParams.get('service');
  const serviceNameParam = searchParams.get('serviceName');
  const typeParam = searchParams.get('type');

  const [inquiryType, setInquiryType] = useState('corporate');
  const [selectedService, setSelectedService] = useState<{ slug: string; name: string } | null>(null);
  const [urgency, setUrgency] = useState('standard');
  const [honeypot, setHoneypot] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    organization: '',
    designation: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<PublicContactResponse | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Sync initial query params on mount
  useEffect(() => {
    if (serviceParam) {
      setSelectedService({
        slug: serviceParam,
        name: serviceNameParam || serviceParam,
      });
      setInquiryType('corporate');
    }
    if (typeParam && ['corporate', 'crisis', 'media', 'talent'].includes(typeParam.toLowerCase())) {
      setInquiryType(typeParam.toLowerCase());
    }
  }, [serviceParam, serviceNameParam, typeParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const res = await submitPublicContact({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp.trim() || undefined,
        company: formData.organization.trim(),
        designation: formData.designation.trim() || undefined,
        enquiryType: inquiryType,
        service: selectedService?.name || undefined,
        serviceSlug: selectedService?.slug || undefined,
        urgency: urgency as 'standard' | 'priority' | 'crisis',
        message: formData.message.trim(),
        source: selectedService?.slug ? 'SERVICE_ENQUIRY' : 'CONTACT_FORM',
        sourcePage: typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '/contact',
        consent: true,
        hp_company_sec: honeypot || undefined,
      });

      if (res.success && res.data) {
        setSubmissionResult(res.data);
        setIsSubmitted(true);
      } else {
        setSubmissionError(
          res.message || res.error || 'We encountered an error processing your brief. Please verify your details.'
        );
      }
    } catch {
      setSubmissionError(
        'Unable to connect to the communications server. Please try again or reach out to counsel@kalka.co.in directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmissionResult(null);
    setSubmissionError(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      whatsapp: '',
      organization: '',
      designation: '',
      message: '',
    });
    setHoneypot('');
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Urgent Crisis Notification Banner */}
        <div className="p-6 sm:p-8 rounded bg-red-950/90 border border-red-800 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-premium">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded bg-red-800/60 border border-red-600 flex items-center justify-center flex-shrink-0 text-gold">
              <ShieldAlert className="w-6 h-6 text-gold" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  Active Crisis Desk
                </span>
                <span className="text-[11px] text-red-200">[HOTLINE AVAILABLE 24/7]</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Facing an Active Media or Regulatory Incident?
              </h3>
              <p className="text-sm text-red-200 max-w-2xl leading-relaxed">
                Our Crisis Command Unit operates around the clock. Rapid containment protocols activate immediately upon partner notification.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <a
              href="tel:+911140000000"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-red-800 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              Emergency Crisis Line
            </a>
            <a
              href="https://wa.me/?text=Urgent%20Crisis%20Inquiry%20-%20Kalka%20Co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Crisis Desk
            </a>
          </div>
        </div>

        {/* Main Form & Direct Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded border border-slate-200 shadow-premium">
            <div className="mb-8 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
                Initiate Scoping
              </span>
              <h2 className="font-serif text-3xl font-bold text-navy">
                Advisory Consultation Request
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Please specify your institutional context and preferred engagement horizon. All inquiries are protected by our advisory non-disclosure protocols.
              </p>
            </div>

            {/* Contextual Practice Banner if arriving from a service page */}
            {selectedService && (
              <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                    Practice
                  </span>
                  <span className="font-serif font-bold text-navy text-sm">
                    {selectedService.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="text-slate-400 hover:text-navy text-xs flex items-center gap-1 font-medium transition-colors"
                  title="Remove practice context"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            )}

            {/* Inquiry Type Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 p-1.5 bg-slate-100 rounded border border-slate-200">
              {[
                { id: 'corporate', label: 'Corporate' },
                { id: 'crisis', label: 'Crisis Advisory' },
                { id: 'media', label: 'Press & Media' },
                { id: 'talent', label: 'Partnership' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setInquiryType(tab.id)}
                  className={`py-2 px-3 text-xs font-bold rounded uppercase tracking-wider transition-all ${
                    inquiryType === tab.id
                      ? 'bg-navy text-gold shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {isSubmitted && submissionResult ? (
              <div className="p-8 sm:p-10 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <span className="inline-block text-xs font-mono font-semibold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    Transmission Verified • Ref: {submissionResult.reference}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy mt-2">
                    Inquiry Securely Transmitted
                  </h3>
                  <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. Your consultation brief for <strong>{formData.organization}</strong> has been logged and routed to our practice desk.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 text-left max-w-md mx-auto space-y-2 shadow-sm">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Reference Identifier:</span>
                    <span className="font-mono font-bold text-navy">{submissionResult.reference}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Enquiry Classification:</span>
                    <span className="font-semibold text-navy uppercase">{inquiryType}</span>
                  </div>
                  {selectedService && (
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-medium">Practice Area:</span>
                      <span className="font-semibold text-navy">{selectedService.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Response Horizon:</span>
                    <span className="font-semibold text-emerald-800">
                      {urgency === 'crisis'
                        ? 'Immediate 60-Minute Activation'
                        : urgency === 'priority'
                        ? 'Priority review within 4 business hours'
                        : 'Under 24 business hours standard briefing'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500 font-medium">Direct Desk:</span>
                    <span className="font-semibold text-navy">counsel@kalka.co.in</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Hello Kalka Co. Team, following up regarding advisory enquiry reference: ${submissionResult.reference} for ${formData.organization}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp Direct Follow-up
                  </a>
                  <a
                    href={`mailto:counsel@kalka.co.in?subject=${encodeURIComponent(
                      `Inquiry Reference ${submissionResult.reference} — ${formData.organization}`
                    )}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-navy hover:bg-navy-dark text-white text-xs font-bold uppercase tracking-wider transition-colors border border-navy-border shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-gold" />
                    Official Email Counsel
                  </a>
                </div>

                <div className="pt-4 border-t border-emerald-200">
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Banner */}
                {submissionError && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="block font-semibold">Submission Notice</strong>
                      <p>{submissionError}</p>
                      <p className="text-slate-600 mt-1">
                        For urgent advisory matters, reach our direct desk at{' '}
                        <a href="mailto:counsel@kalka.co.in" className="underline font-medium text-navy">
                          counsel@kalka.co.in
                        </a>{' '}
                        or call <span className="font-medium text-navy">+91 11 4000 0000</span>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Anti-spam Honeypot (Invisible to users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="hp_company_sec">Leave this field blank</label>
                  <input
                    id="hp_company_sec"
                    name="hp_company_sec"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      required
                      placeholder="e.g. Alok Singhania"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Corporate Email *
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="a.singhania@group.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Organization / Enterprise *
                    </label>
                    <Input
                      required
                      placeholder="e.g. Apex Infrastructure Ltd."
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Designation / Board Role
                    </label>
                    <Input
                      placeholder="e.g. Managing Director / Chief Counsel"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Direct Phone / Secure Mobile *
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="+91 98100 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      WhatsApp Mobile (Optional)
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 98100 00000"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    />
                  </div>
                </div>

                {/* Urgency Radio Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Engagement Urgency & Protocol
                  </label>
                  <div className="space-y-2">
                    {urgencyLevels.map((lvl) => (
                      <label
                        key={lvl.value}
                        className={`flex items-center gap-3 p-3 rounded border text-xs cursor-pointer transition-all ${
                          urgency === lvl.value
                            ? 'bg-navy/5 border-gold text-navy font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={lvl.value}
                          checked={urgency === lvl.value}
                          onChange={(e) => setUrgency(e.target.value)}
                          className="text-gold focus:ring-gold"
                        />
                        <span>{lvl.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Executive Brief / Narrative Context *
                  </label>
                  <Textarea
                    required
                    rows={5}
                    placeholder="Outline your immediate communications objectives, corporate milestones, or challenges you wish to address under strict confidentiality."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                        Transmitting Inquiry...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Transmit Strategic Consultation Request
                      </span>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>Submissions are protected by strict professional confidentiality</span>
                </div>
              </form>
            )}
          </div>

          {/* Right: Direct Desks & Confidentiality FAQs */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Desks Card */}
            <div className="bg-navy p-8 rounded text-white border border-navy-border space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">
                Direct Contact Desks
              </h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 p-3 rounded bg-navy-deep/60 border border-navy-border">
                  <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">General & Scoping Counsel</strong>
                    <a href="mailto:counsel@kalka.co.in" className="text-gold hover:underline">
                      counsel@kalka.co.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded bg-navy-deep/60 border border-navy-border">
                  <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Press & Media Desk</strong>
                    <a href="mailto:press@kalka.co.in" className="text-gold hover:underline">
                      press@kalka.co.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded bg-navy-deep/60 border border-navy-border">
                  <PhoneCall className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Executive Switchboard</strong>
                    <span className="text-slate-300">+91 (0) 11 4000 0000</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-navy-border/60">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Notice: Kalka Co. does not accept unsolicited press releases for broad dissemination without prior advisory representation.
                </p>
              </div>
            </div>

            {/* Engagement FAQ Callout */}
            <div className="bg-white p-8 rounded border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gold" />
                Confidentiality & Non-Disclosure
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prior to detailed narrative briefings, our compliance team executes unilateral or mutual Non-Disclosure Agreements (NDAs). We enforce rigid sector conflict firewalls to protect client competitive advantages.
              </p>
              <div className="pt-2 text-xs text-slate-500">
                <span>Direct inquiries regarding conflicts: </span>
                <strong className="text-navy">compliance@kalka.co.in</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Global Hubs Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Presence & Bureaus [OFFICE PLACEHOLDER]
            </span>
            <h2 className="font-serif text-3xl font-bold text-navy">
              Consultancy Hubs & Regional Desks [DEMO]
            </h2>
            <p className="text-sm text-slate-600">
              Sample regional presence across strategic commercial centers and international capital hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office) => (
              <div
                key={office.city}
                className="bg-white p-6 rounded border border-slate-200 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg font-bold text-navy">
                      {office.city}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-bold uppercase tracking-wider">
                      [OFFICE PLACEHOLDER]
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gold-dark">
                    {office.title}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  <p><strong>Desk:</strong> {office.desk}</p>
                  <p><strong>Hours:</strong> {office.hours}</p>
                  <p><strong>Email:</strong> <span className="text-navy">{office.email}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
