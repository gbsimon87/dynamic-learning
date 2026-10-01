import test from "node:test";
import { BANK, buildMythsAndLegendsFromAroundTheWorldQuestions } from "./year4MythsAndLegendsFromAroundTheWorld.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Myths and Legends from Around the World: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Myths and Legends from Around the World: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildMythsAndLegendsFromAroundTheWorldQuestions));
