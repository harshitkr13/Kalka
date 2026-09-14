'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { BlogCard } from '@/components/cards/BlogCard';
import { Search } from '@/components/editorial/Search';
import { FilterBar } from '@/components/editorial/FilterBar';
import { insightsData } from '@/lib/content/insights';
import { FinalCta } from '@/sections/home/FinalCta';
import { EmptyState } from '@/components/ui/EmptyState';

export default function InsightsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Perspectives', count: insightsData.length },
    { id: 'Media Strategy', label: 'Media Strategy', count: 1 },
    { id: 'Crisis Advisory', label: 'Crisis Advisory', count: 1 },
    { id: 'Corporate Affairs', label: 'Corporate Affairs', count: 1 },
  ];

  const filteredInsights = insightsData.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              Intellectual Perspectives
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Strategic Intelligence on the Frontiers of Corporate Media
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Executive essays, macroeconomic media trends, and reputation defense frameworks authored by Kalka Co. practice directors.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <Search
                value={search}
                onChange={setSearch}
                placeholder="Search analytical essays, op-eds..."
              />
              <FilterBar
                options={categories}
                selectedId={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            {/* Grid */}
            {filteredInsights.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredInsights.map((item) => (
                  <BlogCard
                    key={item.slug}
                    title={item.title}
                    subtitle={item.subtitle}
                    category={item.category}
                    datePlaceholder={item.publishedDate}
                    readTime={item.readTime}
                    href={`/insights/${item.slug}`}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Insights Match Your Filter"
                description="Try refining your search keyword or clearing the selected category."
                action={
                  <button
                    onClick={() => {
                      setSearch('');
                      setSelectedCategory('all');
                    }}
                    className="text-xs font-semibold text-gold-dark hover:underline uppercase tracking-wider"
                  >
                    Reset Filters
                  </button>
                }
              />
            )}
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
