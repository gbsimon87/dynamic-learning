import { GEOGRAPHY_SOURCES } from "./sources.js";
import { YEAR1_GEOGRAPHY_SOURCES } from "./year1/sources.js";
import { YEAR2_GEOGRAPHY_SOURCES } from "./year2/sources.js";
import { SOURCES_G1 } from "./year4/sources1.js";
import { SOURCES_G2 } from "./year4/sources2.js";
import { SOURCES_G3 } from "./year4/sources3.js";
import { SOURCES_G4 } from "./year4/sources4.js";
import { SOURCES_G5 } from "./year4/sources5.js";

/** Every source id a Geography question may cite, across all implemented years. */
export const ALL_GEOGRAPHY_SOURCES = { ...GEOGRAPHY_SOURCES, ...YEAR1_GEOGRAPHY_SOURCES, ...YEAR2_GEOGRAPHY_SOURCES, ...SOURCES_G1, ...SOURCES_G2, ...SOURCES_G3, ...SOURCES_G4, ...SOURCES_G5 };
