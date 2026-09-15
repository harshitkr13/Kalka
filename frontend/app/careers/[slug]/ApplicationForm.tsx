'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { CheckCircle2, Send, ShieldCheck, AlertCircle } from 'lucide-react';

interface ApplicationFormProps {
  roleTitle: string;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ roleTitle }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    portfolioUrl: '',
    coverNote: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please complete all required fields (*)');
      return;
    }

    setIsSubmitting(true);
    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded border border-emerald-200 shadow-premium text-center space-y-6">
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-navy">
            Application Received
          </h3>
          <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">
            [SIMULATED SUBMISSION]
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Thank you for applying for the position of <strong>{roleTitle}</strong>. Your background will be reviewed confidentially by our talent committee.
          </p>
        </div>
        <div className="p-4 rounded bg-slate-50 border border-slate-200 text-xs text-slate-500 text-left space-y-1">
          <p><strong>Candidate:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Status:</strong> Scoped for partner review within 5 business days.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              linkedinUrl: '',
              portfolioUrl: '',
              coverNote: '',
            });
          }}
        >
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded border border-slate-200 shadow-premium space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-gold/10 text-gold-dark text-[11px] font-semibold uppercase tracking-wider">
          <span>Apply for this Role</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-navy">
          Candidate Application
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Submit your executive credentials. All submissions remain strictly confidential under standard firm NDAs.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 rounded bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Full Name *
          </label>
          <Input
            name="fullName"
            placeholder="e.g. Adv. Vikramaditya Sen"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Email Address *
            </label>
            <Input
              type="email"
              name="email"
              placeholder="v.sen@enterprise.in"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Direct Phone *
            </label>
            <Input
              type="tel"
              name="phone"
              placeholder="+91 98110 00000"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            LinkedIn Profile URL
          </label>
          <Input
            type="url"
            name="linkedinUrl"
            placeholder="https://linkedin.com/in/yourprofile"
            value={formData.linkedinUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Portfolio / Published Work URL
          </label>
          <Input
            type="url"
            name="portfolioUrl"
            placeholder="https://yourportfolio.com or article link"
            value={formData.portfolioUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Executive Summary / Cover Note
          </label>
          <Textarea
            name="coverNote"
            rows={4}
            placeholder="Outline your strategic communications background, notable media placements, and why this position resonates with your advisory career."
            value={formData.coverNote}
            onChange={handleChange}
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
                Transmitting Application...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Submit Application (Simulated)
              </span>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center pt-2">
          <ShieldCheck className="w-4 h-4 text-gold" />
          <span>Strictly confidential under Kalka Co. Advisory Discretion protocols</span>
        </div>
      </form>
    </div>
  );
};
