import test from "node:test";
import { BANK, buildThePrefixesIlImAndIrQuestions } from "./year4ThePrefixesIlImAndIr.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 The Prefixes il, im and ir: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 The Prefixes il, im and ir: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildThePrefixesIlImAndIrQuestions));
