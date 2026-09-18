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
import {
  listClients,
  getClientById,
  createClient,
  updateClient,
  updateClientApproval,
  deleteClient,
} from './adminClient.controller';
import {
  listMediaMentions,
  getMediaMentionById,
  createMediaMention,
  updateMediaMention,
  deleteMediaMention,
} from './adminMediaMention.controller';
import {
  listAwards,
  getAwardById,
  createAward,
  updateAward,
  deleteAward,
} from './adminAward.controller';
import {
  listTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from './adminTeam.controller';
import {
  listCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} from './adminCareer.controller';
import {
  listGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from './adminGallery.controller';

const router = Router();

// Enforce non-cacheable responses for all administrative CMS endpoints
router.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'private, no-store');
  next();
});

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

// 7. Clients Roster CMS (Phase 8)
router.get('/clients', requirePermission('content:view'), listClients);
router.get('/clients/:id', requirePermission('content:view'), getClientById);
router.post('/clients', requirePermission('content:edit'), createClient);
router.patch('/clients/:id', requirePermission('content:edit'), updateClient);
router.patch('/clients/:id/approval', requirePermission('content:publish'), updateClientApproval);
router.delete('/clients/:id', requirePermission('content:publish'), deleteClient);

// 8. Media Mentions & Press CMS (Phase 8)
router.get('/media', requirePermission('content:view'), listMediaMentions);
router.get('/media/:id', requirePermission('content:view'), getMediaMentionById);
router.post('/media', requirePermission('content:edit'), createMediaMention);
router.patch('/media/:id', requirePermission('content:edit'), updateMediaMention);
router.delete('/media/:id', requirePermission('content:publish'), deleteMediaMention);

// 9. Awards & Recognition CMS (Phase 8)
router.get('/awards', requirePermission('content:view'), listAwards);
router.get('/awards/:id', requirePermission('content:view'), getAwardById);
router.post('/awards', requirePermission('content:edit'), createAward);
router.patch('/awards/:id', requirePermission('content:edit'), updateAward);
router.delete('/awards/:id', requirePermission('content:publish'), deleteAward);

// 10. Team & Leadership CMS (Phase 8)
router.get('/team', requirePermission('content:view'), listTeamMembers);
router.get('/team/:id', requirePermission('content:view'), getTeamMemberById);
router.post('/team', requirePermission('content:edit'), createTeamMember);
router.patch('/team/:id', requirePermission('content:edit'), updateTeamMember);
router.delete('/team/:id', requirePermission('content:publish'), deleteTeamMember);

// 11. Careers CMS (Phase 8)
router.get('/careers', requirePermission('careers:view'), listCareers);
router.get('/careers/:id', requirePermission('careers:view'), getCareerById);
router.post('/careers', requirePermission('careers:manage'), createCareer);
router.patch('/careers/:id', requirePermission('careers:manage'), updateCareer);
router.delete('/careers/:id', requirePermission('careers:manage'), deleteCareer);

// 12. Media Assets & Gallery CMS (Phase 8)
router.get('/gallery', requirePermission('content:view'), listGalleryItems);
router.get('/gallery/:id', requirePermission('content:view'), getGalleryItemById);
router.post('/gallery', requirePermission('content:edit'), createGalleryItem);
router.patch('/gallery/:id', requirePermission('content:edit'), updateGalleryItem);
router.delete('/gallery/:id', requirePermission('content:publish'), deleteGalleryItem);

export const adminRoutes = router;

