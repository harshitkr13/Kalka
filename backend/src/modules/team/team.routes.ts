import { Router } from 'express';
import { getTeamMembers, getTeamMemberBySlug } from './team.controller';
import { validateRequest } from '../../middleware/validate';
import { teamQuerySchema, teamParamsSchema } from './team.schema';

const router = Router();

router.get('/', validateRequest({ query: teamQuerySchema }), getTeamMembers);
router.get('/:slug', validateRequest({ params: teamParamsSchema }), getTeamMemberBySlug);

export const teamRoutes = router;
