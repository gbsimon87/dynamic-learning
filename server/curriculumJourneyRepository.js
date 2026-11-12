import { requireJourney } from "../shared/curriculumJourneyData.js";

export function createMongoCurriculumJourneyRepository(journeys, assessments) {
  return {
    getJourney: (key) => journeys.findOne(key),
    async mergeJourney(key, merge) {
      for (let attempt = 0; attempt < 20; attempt++) {
        const current = await journeys.findOne(key);
        const data = merge(current);
        if (current && JSON.stringify(current.data) === JSON.stringify(data)) return current;
        const at = new Date().toISOString();
        const fields = { ...key, schemaVersion: 1, data, revision: (current?.revision ?? 0) + 1,
          createdAt: current?.createdAt ?? at, updatedAt: at };
        if (current) {
          const doc = await journeys.findOneAndUpdate({ _id: current._id, revision: current.revision }, { $set: fields }, { returnDocument: "after" });
          if (doc) return doc;
        } else {
          try { const result = await journeys.insertOne(fields); return { ...fields, _id: result.insertedId }; }
          catch (error) { if (error.code !== 11000) throw error; }
        }
      }
      requireJourney(false, "JOURNEY_WRITE_BUSY", 503);
    },
    getSession: (childId, sessionId) => assessments.findOne({ childId, sessionId }),
    listSessions: (key) => assessments.find(key).toArray(),
    async insertSession(session) {
      try { const result = await assessments.insertOne(session); return { ...session, _id: result.insertedId }; }
      catch (error) {
        if (error.code !== 11000) throw error;
        const previous = await assessments.findOne({ childId: session.childId, sessionId: session.sessionId });
        requireJourney(previous, "REVISION_CONFLICT", 409); return previous;
      }
    },
    async transitionSession(key, sessionId, transition) {
      const filter = { ...key, sessionId };
      const current = await assessments.findOne(filter);
      requireJourney(current, "SESSION_NOT_FOUND", 404);
      const next = transition(current);
      if (next === current) return current;
      const { _id, ...fields } = next;
      const saved = await assessments.findOneAndUpdate({ ...filter, _id, revision: current.revision }, { $set: fields }, { returnDocument: "after" });
      if (saved) return saved;
      // A simultaneous identical request may have won. The pure transition
      // accepts only an exact replay here; a different stale write conflicts.
      const latest = await assessments.findOne(filter);
      requireJourney(latest, "SESSION_NOT_FOUND", 404);
      const replay = transition(latest);
      requireJourney(replay === latest, "REVISION_CONFLICT", 409);
      return latest;
    },
  };
}
