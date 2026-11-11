export const sectionId = (title) => title.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
