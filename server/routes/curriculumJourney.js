import { Router } from "express";
import * as db from "../db.js";
import { requireAuth, requireOwnedChild } from "../middleware.js";
import { createMongoCurriculumJourneyRepository } from "../curriculumJourneyRepository.js";
import { createCurriculumJourneyService } from "../../shared/curriculumJourneyService.js";
import { getJourneyPathway } from "../../shared/curriculumJourneyPathway.js";

export function createCurriculumJourneyRouter({ enabled = process.env.ENABLE_CURRICULUM_JOURNEY === "true", service: injectedService, ...dependencies } = {}) {
  const router = Router();
  router.use(requireAuth);
  const base = "/:childId/:year/:subject";
  router.use(base, requireOwnedChild, (req, res, next) => {
    if (!enabled) return res.status(503).json({ error: "JOURNEY_DISABLED" });
    try { getJourneyPathway(req.params.year, req.params.subject, dependencies.manifest); return next(); }
    catch (error) { return res.status(error.status ?? 400).json({ error: error.code ?? "INVALID_SCOPE" }); }
  });
  const handle = (method, { input = () => [] } = {}) => async (req, res, next) => {
    try {
      const service = injectedService ?? createCurriculumJourneyService(createMongoCurriculumJourneyRepository(db.curriculumJourney(), db.curriculumAssessments()), dependencies);
      let status = 200;
      if (method === "startCurriculumAssessment") {
        try { await service.getCurriculumAssessment(req.child._id, req.params.year, req.params.subject, req.body?.sessionId); }
        catch (error) { if (error.code === "SESSION_NOT_FOUND") status = 201; else throw error; }
      }
      const result = await service[method](req.child._id, req.params.year, req.params.subject, ...input(req));
      const key = method.includes("Overview") || method.startsWith("list") ? null : method.includes("Assessment") ? "session" : "journey";
      return res.status(status).json(key ? { [key]: result } : result);
    } catch (error) {
      if (error.status && error.code) return res.status(error.status).json({ error: error.code });
      return next(error);
    }
  };
  router.get(base, handle("getCurriculumJourney"));
  router.post(`${base}/acknowledgements`, handle("acknowledgeCurriculumIntroductions", { input: (req) => [req.body ?? {}] }));
  router.get(`${base}/assessments/overview`, handle("getCurriculumAssessmentOverview"));
  router.get(`${base}/assessments`, handle("listCurriculumAssessments", { input: (req) => [{
    kind: req.query.kind, categoryId: req.query.kind === "subject" ? null : req.query.categoryId,
    cursor: req.query.cursor ?? null, limit: req.query.limit === undefined ? 20 : Number(req.query.limit),
  }] }));
  router.post(`${base}/assessments`, handle("startCurriculumAssessment", { input: (req) => [req.body ?? {}] }));
  router.get(`${base}/assessments/:sessionId`, handle("getCurriculumAssessment", { input: (req) => [req.params.sessionId] }));
  router.post(`${base}/assessments/:sessionId/responses`, handle("submitCurriculumAssessmentResponse", { input: (req) => [req.params.sessionId, req.body ?? {}] }));
  router.post(`${base}/assessments/:sessionId/finish`, handle("finishCurriculumAssessment", { input: (req) => [req.params.sessionId, req.body ?? {}] }));
  return router;
}
