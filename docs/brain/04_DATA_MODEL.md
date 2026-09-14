# Kalka Co. — Data Model

## Collections
users, roles, permissions, services, industries, clients, caseStudies, teamMembers, awards, blogs, blogCategories, news, mediaMentions, gallery, media, careers, applications, offices, leads, contactMessages, newsletterSubscribers, settings, seoSettings.

## Key Models
- **Service**: name, slug, shortDescription, description, heroImage, capabilities[], process[], relatedIndustries[], featured, displayOrder, seoTitle, seoDescription, status, timestamps.
- **Industry**: name, slug, description, heroImage, relatedServices[], caseStudies[], featured, displayOrder, SEO fields, status.
- **Client**: name, logo, industry, description, website, featured, displayOrder.
- **CaseStudy**: title, slug, clientId, industryId, summary, challenge, strategy, execution, results, metrics[], coverImage, gallery[], mediaCoverage[], featured, status, SEO fields.
- **Blog**: title, slug, subtitle, excerpt, content, authorId, coverImage, categoryId, tags[], featured, status, publishedAt, SEO fields.
- **TeamMember**: name, designation, photo, shortBio, fullBio, linkedin, email, featured, displayOrder, status.
- **Award**: name, organization, year, category, description, image, externalUrl, featured, displayOrder.
- **Lead**: name, company, email, phone, city, industry, service, message, source, landingPage, status, assignedTo, notes[], timestamps.
- **Career/Application**:
  - Job: title, slug, department, location, employmentType, experience, description, requirements[], responsibilities[], deadline, active.
  - Application: jobId, name, email, phone, resume, coverLetter, status, timestamps.

## Rules
Use timestamps and appropriate indexes. Slugs are unique. Never store large binary files in MongoDB.\n