import { Router } from 'express';
import { authenticate, requirePermission } from '../../middleware/auth';
import {
  listServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from './adminService.controller';
import {
  listIndustries,
  getIndustryById,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} from './adminIndustry.controller';
import {
  listCaseStudies,
  getCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from './adminCaseStudy.controller';
import {
  listBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from './adminBlog.controller';
import {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from './adminCategory.controller';
import {
  listLeads,
  getLeadById,
  updateLead,
  addLeadNote,
  deleteLead,
} from './adminLead.controller';

const router = Router();

// All admin CMS routes require active session authentication
router.use(authenticate);

// 1. Services CMS
router.get('/services', requirePermission('content:view'), listServices);
router.get('/services/:id', requirePermission('content:view'), getServiceById);
router.post('/services', requirePermission('content:edit'), createService);
router.patch('/services/:id', requirePermission('content:edit'), updateService);
router.delete('/services/:id', requirePermission('content:publish'), deleteService);

// 2. Industries CMS
router.get('/industries', requirePermission('content:view'), listIndustries);
router.get('/industries/:id', requirePermission('content:view'), getIndustryById);
router.post('/industries', requirePermission('content:edit'), createIndustry);
router.patch('/industries/:id', requirePermission('content:edit'), updateIndustry);
router.delete('/industries/:id', requirePermission('content:publish'), deleteIndustry);

// 3. Case Studies CMS
router.get('/case-studies', requirePermission('content:view'), listCaseStudies);
router.get('/case-studies/:id', requirePermission('content:view'), getCaseStudyById);
router.post('/case-studies', requirePermission('content:edit'), createCaseStudy);
router.patch('/case-studies/:id', requirePermission('content:edit'), updateCaseStudy);
router.delete('/case-studies/:id', requirePermission('content:publish'), deleteCaseStudy);

// 4. Articles & Insights CMS
router.get('/blogs', requirePermission('content:view'), listBlogs);
router.get('/blogs/:id', requirePermission('content:view'), getBlogById);
router.post('/blogs', requirePermission('content:edit'), createBlog);
router.patch('/blogs/:id', requirePermission('content:edit'), updateBlog);
router.delete('/blogs/:id', requirePermission('content:publish'), deleteBlog);

// 5. Blog Categories CMS
router.get('/categories', requirePermission('content:view'), listCategories);
router.get('/categories/:id', requirePermission('content:view'), getCategoryById);
router.post('/categories', requirePermission('content:edit'), createCategory);
router.patch('/categories/:id', requirePermission('content:edit'), updateCategory);
router.delete('/categories/:id', requirePermission('content:publish'), deleteCategory);

// 6. Leads & Inquiries Management (Phase 7)
router.get('/leads', requirePermission('leads:view'), listLeads);
router.get('/leads/:id', requirePermission('leads:view'), getLeadById);
router.patch('/leads/:id', requirePermission('leads:manage'), updateLead);
router.post('/leads/:id/notes', requirePermission('leads:manage'), addLeadNote);
router.delete('/leads/:id', requirePermission('leads:manage'), deleteLead);

export const adminRoutes = router;
