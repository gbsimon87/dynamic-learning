/** Initial rendering check only. Interactive browser verification remains separate. */
import { createServer as createHttpServer } from "node:http";
import { createServer } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";

// Attach Vite's development websocket to an unbound server: no listener or
// learner browser/storage is needed for this rendering check.
const hmrHost = createHttpServer();
const server = await createServer({
  server: { middlewareMode: true, hmr: { server: hmrHost } },
  appType: "custom",
});
try {
  let count = 0;
  for (const year of [3, 4]) {
    const module = await server.ssrLoadModule(`/src/data/year${year}EnglishCurriculum.js`);
    for (const category of module[`year${year}EnglishCurriculum`]) for (const topic of category.topics) {
      const name = topic.id.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join("");
      for (const challenge of topic.challenges) {
        const challengeModule = await server.ssrLoadModule(
          `/src/pages/skills/english/challenges/year${year}/${topic.id}/${name}Challenge${challenge.id}.jsx`
        );
        const html = renderToString(React.createElement(challengeModule.default, {
          onComplete: () => { throw new Error("Challenge completed during rendering"); },
        })).replace(/<!--.*?-->/g, "");
        if (!html.includes("challenge-container") || !html.includes("Question 1 of") || !html.includes("Check")) {
          throw new Error(`Incomplete initial render: ${year}/${topic.id}/${challenge.id}`);
        }
        if (topic.id === "dictation" && challenge.id === 2) {
          if (!/disabled=""[^>]*aria-label="apostrophe"/.test(html)) {
            throw new Error(`Dictation keyboard must allow apostrophes and be disabled while looking: Year ${year}`);
          }
          if (!/<div hidden="">/.test(html)) throw new Error("Dictation answer is visible while looking");
        }
        count++;
      }
    }
  }
  console.log(`Rendered ${count} English challenges through Vite and React, without a speech voice.`);
  const { AuthContext } = await server.ssrLoadModule("/src/context/auth-context.js");
  const auth = { parent: { email: "review@example.test" }, children: [], status: "ready", signIn: () => {}, signUp: () => {}, signOut: () => {} };
  for (const page of ["Login", "SignUp", "ParentArea"]) {
    const module = await server.ssrLoadModule(`/src/pages/auth/${page}.jsx`);
    const html = renderToString(React.createElement(MemoryRouter, null,
      React.createElement(AuthContext.Provider, { value: auth }, React.createElement(module.default))));
    if (!html.includes("<button")) throw new Error(`Incomplete authentication page render: ${page}`);
  }
  console.log("Rendered Login, SignUp and ParentArea through Vite and React.");
} finally {
  await server.close();
}
