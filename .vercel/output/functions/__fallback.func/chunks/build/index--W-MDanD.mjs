import { defineComponent, withAsyncContext, ref, computed, mergeProps, toValue, reactive, watch, getCurrentInstance, onServerPrefetch, shallowRef, nextTick, unref, toRef, createElementBlock, provide, cloneVNode, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { A as hash } from '../_/nitro.mjs';
import { isPlainObject } from '@vue/shared';
import { g as fetchDefaults, a as useNuxtApp, d as asyncDataDefaults, f as createError, s as sanitizeTag } from './server.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

//#region src/index.ts
const DEBOUNCE_DEFAULTS = { trailing: true };
/**
Debounce functions
@param fn - Promise-returning/async function to debounce.
@param wait - Milliseconds to wait before calling `fn`. Default value is 25ms
@returns A function that delays calling `fn` until after `wait` milliseconds have elapsed since the last time it was called.
@example
```
import { debounce } from 'perfect-debounce';
const expensiveCall = async input => input;
const debouncedFn = debounce(expensiveCall, 200);
for (const number of [1, 2, 3]) {
console.log(await debouncedFn(number));
}
//=> 1
//=> 2
//=> 3
```
*/
function debounce(fn, wait = 25, options = {}) {
	options = {
		...DEBOUNCE_DEFAULTS,
		...options
	};
	if (!Number.isFinite(wait)) throw new TypeError("Expected `wait` to be a finite number");
	let leadingValue;
	let timeout;
	let resolveList = [];
	let currentPromise;
	let trailingArgs;
	const applyFn = (_this, args) => {
		currentPromise = _applyPromised(fn, _this, args);
		currentPromise.finally(() => {
			currentPromise = null;
			if (options.trailing && trailingArgs && !timeout) {
				const promise = applyFn(_this, trailingArgs);
				trailingArgs = null;
				return promise;
			}
		});
		return currentPromise;
	};
	const debounced = function(...args) {
		if (options.trailing) trailingArgs = args;
		if (currentPromise) return currentPromise;
		return new Promise((resolve) => {
			const shouldCallNow = !timeout && options.leading;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				timeout = null;
				const promise = options.leading ? leadingValue : applyFn(this, args);
				trailingArgs = null;
				for (const _resolve of resolveList) _resolve(promise);
				resolveList = [];
			}, wait);
			if (shouldCallNow) {
				leadingValue = applyFn(this, args);
				resolve(leadingValue);
			} else resolveList.push(resolve);
		});
	};
	const _clearTimeout = (timer) => {
		if (timer) {
			clearTimeout(timer);
			timeout = null;
		}
	};
	debounced.isPending = () => !!timeout;
	debounced.cancel = () => {
		_clearTimeout(timeout);
		resolveList = [];
		trailingArgs = null;
	};
	debounced.flush = () => {
		_clearTimeout(timeout);
		if (!trailingArgs || currentPromise) return;
		const args = trailingArgs;
		trailingArgs = null;
		return applyFn(this, args);
	};
	return debounced;
}
async function _applyPromised(fn, _this, args) {
	return await fn.apply(_this, args);
}

const defaultWwwData = {
  siteTitle: "Nuclear Blast Testing Facility",
  siteTagline: "The definitive intelligence dossier and operations reference for NBTF on Roblox",
  heroDescription: "A secret nuclear testing facility operates a superheated fusion reactor and executes nuclear tests while military, security, and scientific personnel keep the facility operational. A rebel organisation attempts to infiltrate the facility, sabotage systems, and trigger a catastrophic core explosion.",
  robloxExperienceUrl: "https://www.roblox.com/games/6153709/Nuclear-Blast-Testing-Facility",
  stats: {
    visits: "41.7M+",
    positiveRating: "88%+",
    dailyPlayers: "400+",
    totalRoles: 28,
    creator: "Ryanblaze",
    corporation: "Pyrowh Corporation",
    resistance: "Sharlach Resistance"
  },
  bannerAlert: {
    enabled: true,
    level: "NOMINAL",
    message: "REACTOR CORE STABILITY: 99.8% \u2014 ALL PROTOCOLS ENFORCED. FACILITY AT STANDARD READINESS."
  },
  roles: [
    // Executive
    {
      id: "council-executive",
      name: "Council Executive",
      category: "Executive",
      side: "Facility",
      clearanceLevel: "Level 5",
      hasLaunchKeycard: true,
      isPaid: true,
      costRobux: 2e3,
      spawnLocation: "Executive Board Room / SCC Rooftop",
      purpose: "Senior leadership of the Supreme Council alongside the Facility Director.",
      responsibilities: [
        "Coordinate all facility departments",
        "Help make strategic facility policies",
        "Administrative oversight & Supreme Council votes",
        "Hold authority over Facility Directors (including impeachment)",
        "Participate in executive-level nuclear launch authorizations"
      ],
      equipment: ["Launch Keycard", "Executive ID", "Special Weapons Chamber Access", "Executive Vehicle"],
      loreNotes: "Council Executives represent the Supreme Council. Banished or expelled executives historically become rebel Warlords.",
      mirrorRole: "Warlord"
    },
    {
      id: "facility-director",
      name: "Facility Director",
      category: "Executive",
      side: "Facility",
      clearanceLevel: "Level 6",
      hasLaunchKeycard: true,
      isPaid: true,
      costRobux: 3400,
      spawnLocation: "Executive Offices",
      purpose: "The highest facility operational authority.",
      responsibilities: [
        "Overall facility command & crisis leadership",
        "Strategic decision making & maintaining order",
        "Final approval on high-level defensive operations",
        "Directing facility emergency protocols"
      ],
      equipment: ["Level 6 Keycard", "Launch Keycard", "Director APC", "Director Sedan", "Executive Broadcast Dashboard"],
      loreNotes: "Impeached or removed Directors historically seek revenge by joining the rebellion as Overseers.",
      mirrorRole: "Overseer"
    },
    // Government
    {
      id: "government-official",
      name: "Government Official",
      category: "Government",
      side: "Facility",
      clearanceLevel: "Level 4",
      hasLaunchKeycard: false,
      isPaid: true,
      costRobux: 400,
      spawnLocation: "Strategic Command Center (SCC)",
      purpose: "Represents national governmental interests at NBTF.",
      responsibilities: [
        "Government liaison & regulatory compliance",
        "National security oversight",
        "Monitoring facility compliance and safety treaties"
      ],
      equipment: ["Level 4 Keycard", "Government Sedan", "Government SUV"],
      mirrorRole: "Hitman"
    },
    {
      id: "intelligence-agent",
      name: "Intelligence Agent",
      category: "Government",
      side: "Facility",
      clearanceLevel: "Level 4",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Strategic Command Center (SCC)",
      purpose: "The facility's intelligence and counter-espionage operative.",
      responsibilities: [
        "Gather internal intelligence",
        "Investigate suspicious personnel & counter espionage",
        "Identify and neutralize hostile rebel covert assets"
      ],
      equipment: ["Level 4 Keycard", "Covert Scanner", "Tactical Radio"],
      mirrorRole: "Spy"
    },
    {
      id: "protection-service",
      name: "Protection Service",
      category: "Government",
      side: "Facility",
      clearanceLevel: "Level 4",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Strategic Command Center (SCC)",
      purpose: "Government official and VIP close protection detail.",
      responsibilities: [
        "Protect government officials and VIPs",
        "Escort dignitaries through restricted sectors",
        "Respond to immediate threats against leadership"
      ],
      equipment: ["Level 4 Keycard", "Heavy Armor", "VIP Escort Radio"]
    },
    // Scientist
    {
      id: "core-engineer",
      name: "Core Engineer",
      category: "Scientist",
      side: "Facility",
      clearanceLevel: "Level 3",
      hasLaunchKeycard: true,
      isPaid: false,
      spawnLocation: "Energy Generation Center (EGC) Core Room",
      purpose: "Monitor and maintain the reactor core and prevent catastrophic meltdown.",
      responsibilities: [
        "Monitor core temperature and plasma stability",
        "Operate primary heating and coolant systems",
        "Respond to core alarms and dangerous destabilization",
        "Perform emergency coolant injection procedures"
      ],
      equipment: ["Level 3 Keycard", "Launch Keycard", "Hazmat Suit", "Core Diagnostic Tool"],
      loreNotes: "Core Engineers are the direct frontline defense against the rebel core sabotage sequence."
    },
    {
      id: "rocket-scientist",
      name: "Rocket Scientist",
      category: "Scientist",
      side: "Facility",
      clearanceLevel: "Level 3",
      hasLaunchKeycard: true,
      isPaid: false,
      spawnLocation: "Weapons Research Center",
      purpose: "Design and conduct nuclear tests and missile launch sequences.",
      responsibilities: [
        "Design weapon tests & manage test countdowns",
        "Conduct ballistic launches and monitor nuclear blast effects",
        "Analyze radiological data & secure launch terminals"
      ],
      equipment: ["Level 3 Keycard", "Launch Keycard", "Launch Console Access"]
    },
    // Military
    {
      id: "infantry-soldier",
      name: "Infantry Soldier",
      category: "Military",
      side: "Facility",
      clearanceLevel: "Level 3",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Military Barracks",
      purpose: "The conventional frontline military defense force.",
      responsibilities: [
        "Defend the facility perimeter and key sectors",
        "Patrol strategic pathways & engage hostile rebel forces",
        "Defend personnel and maintain physical security"
      ],
      equipment: ["M4 Carbine", "USP Pistol", "Level 3 Keycard", "Flashlight", "Radio", "Infantry Jeep"],
      mirrorRole: "Raider"
    },
    {
      id: "military-officer",
      name: "Military Officer",
      category: "Military",
      side: "Facility",
      clearanceLevel: "Level 4",
      hasLaunchKeycard: true,
      isPaid: true,
      costRobux: 400,
      spawnLocation: "Military Barracks Officer Quarters",
      purpose: "Military tactical command and operational planning.",
      responsibilities: [
        "Command military forces during base raids",
        "Plan tactical defensive operations",
        "Authorize heavy weapons response"
      ],
      equipment: ["Level 4 Keycard", "Launch Keycard", "Officer Pistol", "Officer Vehicle"]
    },
    {
      id: "military-police",
      name: "Military Police",
      category: "Military",
      side: "Facility",
      clearanceLevel: "Level 4",
      hasLaunchKeycard: false,
      isPaid: true,
      costRobux: 800,
      spawnLocation: "Military Barracks MP Station",
      purpose: "Military law enforcement and facility discipline.",
      responsibilities: [
        "Enforce military regulations and base protocol",
        "Investigate military infractions and detain rogue units",
        "Maintain base order"
      ],
      equipment: ["Level 4 Keycard", "Handcuffs", "Stun Baton", "MP Sedan"]
    },
    {
      id: "special-task-force",
      name: "Special Task Force",
      category: "Military",
      side: "Facility",
      clearanceLevel: "Level 4",
      hasLaunchKeycard: false,
      isPaid: true,
      costRobux: 450,
      spawnLocation: "Military Barracks STF Armory",
      purpose: "Elite tactical military strike and counter-terror team.",
      responsibilities: [
        "Handle high-risk armed rebel assaults",
        "Conduct specialized tactical strikes",
        "Retake breached core control rooms"
      ],
      equipment: ["Level 4 Keycard", "Heavy Tactical Armor", "Advanced Rifle", "STF Tactical SUV"],
      mirrorRole: "Commando"
    },
    // Security
    {
      id: "exterior-guard",
      name: "Exterior Guard",
      category: "Security",
      side: "Facility",
      clearanceLevel: "Level 3",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Exterior Checkpoint",
      purpose: "The outer defensive perimeter gatekeeper.",
      responsibilities: [
        "Defend the facility outer perimeter",
        "Control exterior vehicle and pedestrian checkpoints",
        "Halt unauthorized entry"
      ],
      equipment: ["Level 3 Keycard", "Shotgun / Rifle", "Security Pickup", "Security SUV"]
    },
    {
      id: "internal-security",
      name: "Internal Security",
      category: "Security",
      side: "Facility",
      clearanceLevel: "Level 3",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Interior Checkpoint",
      purpose: "Interior security and hallway patrol.",
      responsibilities: [
        "Patrol interior corridors and secure sensitive doors",
        "Verify keycard clearance of passing personnel",
        "Respond to internal security alarms"
      ],
      equipment: ["Level 3 Keycard", "Taser", "Sidearm", "Security Golf Cart"]
    },
    {
      id: "security-supervisor",
      name: "Security Supervisor",
      category: "Security",
      side: "Facility",
      clearanceLevel: "Level 4",
      hasLaunchKeycard: false,
      isPaid: true,
      costRobux: 450,
      spawnLocation: "Interior Security Hub",
      purpose: "Security department operations command.",
      responsibilities: [
        "Supervise security personnel and guard posts",
        "Coordinate camera surveillance and emergency lockdowns",
        "Handle sensitive security escalations"
      ],
      equipment: ["Level 4 Keycard", "Supervisor Sidearm", "Security Supervisor SUV"]
    },
    // Safety
    {
      id: "factory-personnel",
      name: "Factory Personnel",
      category: "Safety",
      side: "Facility",
      clearanceLevel: "Level 2",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Receiving Department",
      purpose: "Factory production and cargo processing.",
      responsibilities: [
        "Operate production facilities & material lines",
        "Receive deliveries and inspect incoming shipments",
        "Perform quality control"
      ],
      equipment: ["Level 2 Keycard", "Work Tools", "Cargo Scanner"]
    },
    {
      id: "janitor",
      name: "Janitor",
      category: "Safety",
      side: "Facility",
      clearanceLevel: "Level 3",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Maintenance Offices",
      purpose: "Facility sanitation and radiological cleanup.",
      responsibilities: [
        "Clean facility corridors and wipe contamination",
        "Assist in hazardous material cleanup",
        "Maintain sanitation in high-risk zones"
      ],
      equipment: ["Level 3 Keycard", "Mop", "Biohazard Bin", "Cleaning Cart"]
    },
    {
      id: "maintenance-team",
      name: "Maintenance Team",
      category: "Safety",
      side: "Facility",
      clearanceLevel: "Level 3",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Maintenance Offices",
      purpose: "Facility infrastructure technicians and system repair.",
      responsibilities: [
        "Repair damaged electrical systems and broken doors",
        "Maintain facility cooling pumps and structural conduits",
        "Conduct regular facility safety inspections"
      ],
      equipment: ["Level 3 Keycard", "Wrench", "Welder", "Toolbox"]
    },
    {
      id: "medic",
      name: "Medic",
      category: "Safety",
      side: "Facility",
      clearanceLevel: "Level 3",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Hospital",
      purpose: "Medical triage and health restoration.",
      responsibilities: [
        "Treat wounded personnel from combat and accidents",
        "Administer anti-radiation treatments",
        "Staff the Hospital ward"
      ],
      equipment: ["Level 3 Keycard", "Medkit", "Defibrillator", "Syringe"]
    },
    {
      id: "volunteer",
      name: "Volunteer",
      category: "Safety",
      side: "Facility",
      clearanceLevel: "Level 1",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Logistics Checkpoint",
      purpose: "General-purpose facility support worker.",
      responsibilities: [
        "Assist personnel with miscellaneous chores",
        "Transport minor cargo",
        "Learn facility layout and earn promotions"
      ],
      equipment: ["Level 1 Keycard", "Flashlight"]
    },
    // Logistics
    {
      id: "delivery-driver",
      name: "Delivery Driver",
      category: "Logistics",
      side: "Facility",
      clearanceLevel: "Level 2",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Logistics Checkpoint",
      purpose: "Supply logistics and heavy material transportation.",
      responsibilities: [
        "Transport supply crates, rocket fuel, and sheet metal",
        "Drive logistics routes into facility receiving bays",
        "Maintain supply lines"
      ],
      equipment: ["Level 2 Keycard", "Delivery Flatbed Truck", "Fuel Canisters"]
    },
    // Rebellion
    {
      id: "commando",
      name: "Commando",
      category: "Rebellion",
      side: "Rebellion",
      clearanceLevel: "Level 1 / Rebel Card",
      hasLaunchKeycard: false,
      isPaid: true,
      costRobux: 350,
      spawnLocation: "Rebel Base",
      purpose: "Elite rebel combatant specialized in breach assaults.",
      responsibilities: [
        "Execute high-risk breach operations",
        "Assault facility defensive strongpoints",
        "Eliminate high-value facility defenders"
      ],
      equipment: ["Rebel Keycard", "Heavy Assault Rifle", "Combat Armor", "Explosives"],
      mirrorRole: "Special Task Force"
    },
    {
      id: "hitman",
      name: "Hitman",
      category: "Rebellion",
      side: "Rebellion",
      clearanceLevel: "Level 1 / Rebel Card",
      hasLaunchKeycard: false,
      isPaid: true,
      costRobux: 550,
      spawnLocation: "Rebel Base / Hidden Cave",
      purpose: "Contracted assassin targeting high-ranking facility personnel.",
      responsibilities: [
        "Eliminate high-value targets (Director, Council, Officials)",
        "Conduct clandestine infiltration strikes",
        "Operate independently under bounty contracts"
      ],
      equipment: ["Rebel Keycard", "Silenced Sniper / Pistol", "Infiltration Cloak"],
      loreNotes: "Hitmen are hired mercenary guns rather than ideological members of the Sharlach Resistance.",
      mirrorRole: "Government Official"
    },
    {
      id: "overseer",
      name: "Overseer",
      category: "Rebellion",
      side: "Rebellion",
      clearanceLevel: "Rebel Card",
      hasLaunchKeycard: false,
      isPaid: true,
      costRobux: 3e3,
      spawnLocation: "Rebel Base Command",
      purpose: "Rebel intelligence and strategic mastermind.",
      responsibilities: [
        "Monitor facility communications and vulnerabilities",
        "Coordinate reactor sabotage sequences and terminal code gathering",
        "Guide assault teams toward weak points"
      ],
      equipment: ["Rebel Master Card", "Rebel Command Terminal", "Tactical Map"],
      loreNotes: "Overseers are former Facility Directors removed by the Supreme Council who now direct resistance intelligence.",
      mirrorRole: "Facility Director"
    },
    {
      id: "raid-leader",
      name: "Raid Leader",
      category: "Rebellion",
      side: "Rebellion",
      clearanceLevel: "Level 1 / Rebel Card",
      hasLaunchKeycard: false,
      isPaid: true,
      costRobux: 800,
      spawnLocation: "Rebel Base",
      purpose: "Tactical rebel raid commander.",
      responsibilities: [
        "Plan and lead rebel squads in organized attacks",
        "Coordinate breaches into the Core and SCC",
        "Call targets and rally combatants"
      ],
      equipment: ["Rebel Keycard", "Command Radio", "Assault Loadout"],
      mirrorRole: "Security Supervisor"
    },
    {
      id: "raider",
      name: "Raider",
      category: "Rebellion",
      side: "Rebellion",
      clearanceLevel: "Rebel Card",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Rebel Base",
      purpose: "Standard rebel frontline combat force.",
      responsibilities: [
        "Attack facility checkpoints and defense lines",
        "Capture strategic control points",
        "Provide fire support during core infiltration"
      ],
      equipment: ["AK-47 / SMG", "Rebel Keycard", "Flashlight"],
      mirrorRole: "Infantry Soldier"
    },
    {
      id: "spy",
      name: "Spy",
      category: "Rebellion",
      side: "Rebellion",
      clearanceLevel: "Level 1 / Disguised",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Rebel Base / Infiltration Spawn",
      purpose: "Covert undercover infiltrator operating inside facility lines.",
      responsibilities: [
        "Infiltrate facility disguised in civilian or worker gear",
        "Access terminals and steal override code fragments",
        "Sabotage systems from deep within without detection"
      ],
      equipment: ["Disguise Kit", "Hacking Decryption Tool", "Silenced Sidearm"],
      loreNotes: "Creates a direct social infiltration loop inside the facility.",
      mirrorRole: "Intelligence Agent"
    },
    {
      id: "warlord",
      name: "Warlord",
      category: "Rebellion",
      side: "Rebellion",
      clearanceLevel: "Rebel Card",
      hasLaunchKeycard: false,
      isPaid: true,
      costRobux: 1700,
      spawnLocation: "Rebel Base Throne",
      purpose: "Supreme military commander of the Sharlach Resistance.",
      responsibilities: [
        "Lead all rebellion armed forces in total war",
        "Formulate grand strategic invasion doctrine",
        "Authorize full-scale reactor core destruction operations"
      ],
      equipment: ["Warlord Heavy Armor", "Warlord Custom Weaponry", "Rebel Master Key"],
      loreNotes: "Warlords are former Supreme Council Executives expelled from NBTF who now seek total destruction of the Pyrowh Corporation.",
      mirrorRole: "Council Executive"
    },
    // Neutral
    {
      id: "civilian",
      name: "Civilian",
      category: "Neutral",
      side: "Neutral",
      clearanceLevel: "None",
      hasLaunchKeycard: false,
      isPaid: false,
      spawnLocation: "Civilian Gas Station / Wilderness",
      purpose: "Independent wanderer and survivor in NBTF territory.",
      responsibilities: [
        "Explore the facility perimeter and external landmarks",
        "Survive ongoing clashes between Pyrowh and Sharlach forces",
        "Choose whether to cooperate or remain neutral"
      ],
      equipment: ["Civilian Clothes", "Flashlight"],
      loreNotes: "The civilian role embodies the experience of an independent bystander navigating the nuclear territory."
    }
  ],
  locations: [
    {
      id: "egc-core",
      name: "Energy Generation Center (EGC) & Reactor Core",
      category: "Science & Reactor",
      clearanceRequired: "Level 3 (Level 4+ for Control Room)",
      description: "The beating heart of NBTF. Houses the superheated fusion reactor core, coolant injection pipelines, and safety override panels.",
      associatedRoles: ["Core Engineer", "Facility Director", "Rebel Saboteurs"],
      keyFeatures: ["Superheated Plasma Core", "Coolant Flow Valving", "Master Safety Override Panel", "180s Meltdown Alarm"]
    },
    {
      id: "scc",
      name: "Strategic Command Center (SCC)",
      category: "Executive/Government",
      clearanceRequired: "Level 4 - 6",
      description: "Command and control installation housing high-level government liaisons, intelligence suites, executive boardrooms, and rooftop broadcasting.",
      associatedRoles: ["Government Official", "Intelligence Agent", "Protection Service", "Council Executive"],
      keyFeatures: ["Executive Board Room", "Weapons Chamber", "Broadcast Station", "Direct Teleporter"]
    },
    {
      id: "weapons-research",
      name: "Weapons Research Center & Launch Silo",
      category: "Science & Reactor",
      clearanceRequired: "Level 3 + Launch Keycard",
      description: "High-security nuclear missile research center where nuclear warheads are calibrated and test sequences launched across the Testing Field.",
      associatedRoles: ["Rocket Scientist", "Facility Director", "Council Executive"],
      keyFeatures: ["Nuclear Silo Controls", "Radiation Monitoring Arrays", "Blast Physics Telemetry"]
    },
    {
      id: "military-barracks",
      name: "Military Barracks",
      category: "Military",
      clearanceRequired: "Level 3 - 4",
      description: "Tactical staging grounds for Infantry, Military Police, Officers, and the Special Task Force.",
      associatedRoles: ["Infantry Soldier", "Military Officer", "Military Police", "Special Task Force"],
      keyFeatures: ["Shooting Range", "Melee Training Dummies", "Armory Lockers", "Vehicle Garage"]
    },
    {
      id: "data-center",
      name: "Data Center & Applied Sciences",
      category: "Interior",
      clearanceRequired: "Level 3",
      description: "Main server banks containing sensitive facility telemetry, access logs, and code fragments critical for reactor safety overrides.",
      associatedRoles: ["Core Engineer", "Spy", "Internal Security"],
      keyFeatures: ["Server Banks", "Code Decryption Terminals", "Upper Factory Catwalks"]
    },
    {
      id: "exterior-checkpoint",
      name: "Exterior Checkpoint & Logistics",
      category: "Exterior",
      clearanceRequired: "Level 2 - 3",
      description: "The outermost fortified perimeter controlling all vehicular and pedestrian access into the testing grounds.",
      associatedRoles: ["Exterior Guard", "Delivery Driver", "Volunteer"],
      keyFeatures: ["Barrier Gates", "Vehicle Inspection Bay", "Cargo Scale"]
    },
    {
      id: "hospital",
      name: "Hospital & Medical Ward",
      category: "Interior",
      clearanceRequired: "Level 3",
      description: "Emergency treatment facility equipped with decontamination showers, trauma pods, and medical terminals.",
      associatedRoles: ["Medic", "Janitor"],
      keyFeatures: ["Trauma Beds", "Anti-Radiation Dispensary", "Sub-level Terminal"]
    },
    {
      id: "rebel-base",
      name: "Sharlach Resistance Rebel Base & Hidden Cave",
      category: "Exterior",
      clearanceRequired: "Rebel Card",
      description: "Fortified rebel bunker hidden in the surrounding badlands where raids are planned, and weapons stockpiled.",
      associatedRoles: ["Warlord", "Overseer", "Raid Leader", "Commando", "Raider", "Spy", "Hitman"],
      keyFeatures: ["War Room", "Armory Spawns", "Underground Escape Tunnels", "Rebel Gas Outpost"]
    }
  ],
  terminals: [
    { id: "term-1", name: "Hospital Terminal", location: "Hospital Ward", description: "Contains medical encryption hashes and sub-level reactor bypass data." },
    { id: "term-2", name: "Internal Security Checkpoint Terminal", location: "Internal Security Hub", description: "Stores internal security clearances and lock codes." },
    { id: "term-3", name: "Kitchen / Applied Sciences Terminal", location: "Applied Sciences Center", description: "Connected to coolant fluid mechanics and thermal logs." },
    { id: "term-4", name: "Power Station Terminal", location: "EGC Lower Power Station", description: "Regulates auxiliary turbine power and safety interlocks." },
    { id: "term-5", name: "Strategic Command Center Terminal", location: "SCC Level 2", description: "Executive clearance database housing master override code fragment." },
    { id: "term-6", name: "West Tower Terminal", location: "West Perimeter Watchtower", description: "Perimeter surveillance telemetry and secondary failsafe." }
  ],
  gamepasses: [
    { name: "Commando", role: "Rebel Commando", robux: 350, description: "Unlocks heavy combat assault loadout on the Rebel team." },
    { name: "Military Officer", role: "Facility Military", robux: 400, description: "Grants Level 4 clearance, launch keycard, and military command authority." },
    { name: "Government Official", role: "Facility Government", robux: 400, description: "Grants Level 4 clearance, executive limousine, and SCC liaison role." },
    { name: "Security Supervisor", role: "Facility Security", robux: 450, description: "Grants security leadership access and surveillance oversight tools." },
    { name: "Special Task Force", role: "Facility Military", robux: 450, description: "Unlocks elite armor, advanced rifles, and tactical strike vehicle." },
    { name: "Hitman", role: "Independent Rebel", robux: 550, description: "Unlocks silenced assassination loadout and stealth operative contracts." },
    { name: "Military Police", role: "Facility Military", robux: 800, description: "Unlocks MP squad car, handcuffs, and base disciplinary authority." },
    { name: "Raid Leader", role: "Rebel Command", robux: 800, description: "Grants squad command radio and organized raid leadership gear." },
    { name: "Warlord", role: "Rebel Supreme Leader", robux: 1700, description: "Supreme rebel leadership role, heavy armor, and master rebel access." },
    { name: "Council Executive", role: "Supreme Council", robux: 2e3, description: "Senior Supreme Council seat with impeachment and launch power." },
    { name: "Overseer", role: "Rebel Intelligence Head", robux: 3e3, description: "Former Director commanding rebel sabotage intelligence." },
    { name: "Facility Director", role: "Supreme Facility Head", robux: 3400, description: "Highest operational facility authority with Level 6 clearance." }
  ],
  loreOverview: {
    facilityFaction: "Pyrowh Corporation",
    rebelFaction: "Sharlach Resistance",
    backstory: "The Pyrowh Corporation operates the Nuclear Blast Testing Facility under strict military and governmental contracts, harnessing superheated plasma reactors and developing experimental nuclear warheads. The Sharlach Resistance, formed by disenfranchised former facility executives, banished directors, and freedom fighters, wages asymmetric war to dismantle the facility and breach its reactor core.",
    roleMirrors: [
      { facility: "Facility Director (L6)", rebel: "Overseer (Rebel Mastermind)", notes: "Overseers are canonically former Facility Directors removed or impeached by the Supreme Council." },
      { facility: "Council Executive (L5)", rebel: "Warlord (Supreme Rebel Commander)", notes: "Warlords are banished former Supreme Council Executives seeking total annihilation of Pyrowh." },
      { facility: "Special Task Force (L4)", rebel: "Commando (Elite Raider)", notes: "Direct tactical mirrors in combat armor, weaponry, and breaching capabilities." },
      { facility: "Intelligence Agent (L4)", rebel: "Spy (Undercover Saboteur)", notes: "The cat-and-mouse game of counter-espionage vs covert terminal infiltration." },
      { facility: "Infantry Soldier (L3)", rebel: "Raider (Frontline Combat)", notes: "The backbone combat forces engaging in perimeter and hallway firefights." },
      { facility: "Security Supervisor (L4)", rebel: "Raid Leader (Assault Coordinator)", notes: "Tactical leaders directing team movements and security lockdowns." },
      { facility: "Government Official (L4)", rebel: "Hitman (Contracted Assassin)", notes: "VIP political interests vs clandestine contract elimination." }
    ]
  }
};
function useRequestEvent(nuxtApp) {
  var _a;
  nuxtApp || (nuxtApp = useNuxtApp());
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      var _a;
      if (mounted.value) {
        const vnodes = (_a = slots.default) == null ? void 0 : _a.call(slots);
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = sanitizeTag(props.fallbackTag || props.placeholderTag, "span");
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  (_a = options.server) != null ? _a : options.server = true;
  (_b = options.default) != null ? _b : options.default = getDefault;
  (_c = options.getCachedData) != null ? _c : options.getCachedData = getDefaultCachedData;
  (_d = options.lazy) != null ? _d : options.lazy = false;
  (_e = options.immediate) != null ? _e : options.immediate = true;
  (_f = options.deep) != null ? _f : options.deep = asyncDataDefaults.deep;
  (_g = options.dedupe) != null ? _g : options.dedupe = "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    var _a2;
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!((_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2._init)) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.data;
    }),
    pending: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.pending;
    }),
    status: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.status;
    }),
    error: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.error;
    }),
    refresh: (...args2) => {
      var _a2;
      if (!((_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2._init)) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry = nuxtApp._asyncData[key.value];
      if (entry == null ? void 0 : entry._abortController) {
        try {
          entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  Object.defineProperties(asyncDataPromise, {
    then: { enumerable: true, value: asyncDataPromise.then.bind(asyncDataPromise) },
    catch: { enumerable: true, value: asyncDataPromise.catch.bind(asyncDataPromise) },
    finally: { enumerable: true, value: asyncDataPromise.finally.bind(asyncDataPromise) }
  });
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      var _a;
      return (_a = getter()) == null ? void 0 : _a.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    {
      nuxtApp._asyncData[key].pending.value = false;
    }
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  var _a, _b;
  (_b = (_a = nuxtApp.payload._errors)[key]) != null ? _b : _a[key] = asyncDataDefaults.errorValue;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData != null;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: shallowRef(!hasCachedData),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      var _a2, _b2;
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if (isDefer((_a2 = opts.dedupe) != null ? _a2 : options.dedupe)) {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      if (opts.cause === "initial" || nuxtApp.isHydrating) {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: (_b2 = opts.cause) != null ? _b2 : "refresh:manual" });
        if (cachedData != null) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = asyncDataDefaults.errorValue;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      {
        asyncData.pending.value = true;
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          var _a3, _b3;
          try {
            const timeout = (_a3 = opts.timeout) != null ? _a3 : options.timeout;
            const mergedSignal = mergeAbortSignals([(_b3 = asyncData._abortController) == null ? void 0 : _b3.signal, opts == null ? void 0 : opts.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason != null ? reason : "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason != null ? reason : "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        if (nuxtApp._asyncDataPromises[key] !== promise) {
          return;
        }
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = asyncDataDefaults.errorValue;
        asyncData.status.value = "success";
      }).catch((error) => {
        var _a3;
        if (nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if ((_a3 = asyncData._abortController) == null ? void 0 : _a3.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        if (nuxtApp._asyncDataPromises[key] === promise) {
          {
            asyncData.pending.value = false;
          }
          delete nuxtApp._asyncDataPromises[key];
        }
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      var _a2, _b2;
      unsubRefreshAsyncData();
      if ((_a2 = nuxtApp._asyncData[key]) == null ? void 0 : _a2._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (nuxtApp._asyncDataPromises[key]) {
        (_b2 = asyncData._abortController) == null ? void 0 : _b2.abort(new DOMException("AsyncData request cancelled by unmount", "AbortError"));
        delete nuxtApp._asyncDataPromises[key];
        if (asyncData.status.value === "pending") {
          asyncData.status.value = "idle";
        }
        {
          asyncData.pending.value = false;
        }
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          var _a3;
          if (!((_a3 = nuxtApp._asyncData[key]) == null ? void 0 : _a3._init)) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
            asyncData.data.value = asyncDataDefaults.value;
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => asyncDataDefaults.value;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  var _a, _b, _c;
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = (_a = AbortSignal.timeout) == null ? void 0 : _a.call(AbortSignal, timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = (_b = sig.reason) != null ? _b : new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    var _a2;
    const abortedSignal = list.find((s) => s.aborted);
    const reason = (_a2 = abortedSignal == null ? void 0 : abortedSignal.reason) != null ? _a2 : new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    (_c = sig.addEventListener) == null ? void 0 : _c.call(sig, "abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = [{}, arg1];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  if (!immediate) {
    let setImmediate = function() {
      _asyncDataOptions.immediate = true;
    };
    watch(key, setImmediate, { flush: "sync", once: true });
    watch([...watchSources || [], _fetchOptions], setImmediate, { flush: "sync", once: true });
  }
  const asyncData = useAsyncData(watchSources === false ? key.value : key, (_, { signal }) => {
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    const resolvedOptions = { signal, ..._fetchOptions };
    for (const key2 of MAYBE_REF_OR_GETTER_OPTION_KEYS) {
      if (typeof resolvedOptions[key2] === "function") {
        resolvedOptions[key2] = toValue(resolvedOptions[key2]);
      }
    }
    return _$fetch(_request.value, resolvedOptions);
  }, _asyncDataOptions);
  return asyncData;
}
const MAYBE_REF_OR_GETTER_OPTION_KEYS = ["method", "baseURL", "query", "params", "body", "headers"];
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.query || opts.params]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const entries = [];
      for (const entry of value.entries()) {
        const [key, val] = entry;
        entries.push([key, val instanceof File ? `${val.name}:${val.size}:${val.lastModified}` : val]);
      }
      segments.push(hash(entries));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { data: response } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/content",
      "$wqD5swdS1c"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const siteData = ref(((_a = response.value) == null ? void 0 : _a.data) || defaultWwwData);
    const selectedRoleCategory = ref("All");
    const roleSideFilter = ref("All");
    const roleSearchQuery = ref("");
    const roleCategories = [
      "All",
      "Executive",
      "Government",
      "Scientist",
      "Military",
      "Security",
      "Safety",
      "Logistics",
      "Rebellion",
      "Neutral"
    ];
    const filteredRoles = computed(() => {
      var _a2;
      if (!((_a2 = siteData.value) == null ? void 0 : _a2.roles)) return [];
      const query = roleSearchQuery.value.trim().toLowerCase();
      const cat = selectedRoleCategory.value;
      const side = roleSideFilter.value;
      return siteData.value.roles.filter((role) => {
        var _a3, _b;
        const matchesCat = cat === "All" || role.category === cat;
        const matchesSide = side === "All" || role.side === side;
        const matchesQuery = !query || (role.name.toLowerCase().includes(query) || role.purpose.toLowerCase().includes(query) || role.clearanceLevel.toLowerCase().includes(query) || role.spawnLocation.toLowerCase().includes(query) || ((_a3 = role.equipment) == null ? void 0 : _a3.some((e) => e.toLowerCase().includes(query))) || ((_b = role.responsibilities) == null ? void 0 : _b.some((r) => r.toLowerCase().includes(query))));
        return matchesCat && matchesSide && matchesQuery;
      });
    });
    const simTemperature = ref(300);
    const safetyOverrideActive = ref(false);
    const collectedFragments = ref(0);
    const coreStateLabel = computed(() => {
      if (simTemperature.value >= 3e6) return "MELTDOWN ENGAGED";
      if (simTemperature.value >= 1e6) return "COMPROMISED (LEVEL 5)";
      if (simTemperature.value >= 6e5) return "SUPERHEATING";
      return "STABLE (FUSION NOMINAL)";
    });
    const coreGlowColor = computed(() => {
      if (simTemperature.value >= 3e6) return "rgba(255, 42, 95, 0.9)";
      if (simTemperature.value >= 1e6) return "rgba(255, 183, 3, 0.85)";
      if (simTemperature.value >= 6e5) return "rgba(157, 78, 221, 0.8)";
      return "rgba(0, 240, 255, 0.7)";
    });
    const coreBorderClass = computed(() => {
      if (simTemperature.value >= 3e6) return "border-red-500 shadow-[0_0_50px_rgba(255,42,95,0.6)]";
      if (simTemperature.value >= 1e6) return "border-amber-500 shadow-[0_0_40px_rgba(255,183,3,0.5)]";
      return "border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.2)]";
    });
    const coreStatusTextClass = computed(() => {
      if (simTemperature.value >= 3e6) return "text-red-400 animate-pulse";
      if (simTemperature.value >= 1e6) return "text-amber-400";
      return "text-cyan-300";
    });
    const progressFillClass = computed(() => {
      if (simTemperature.value >= 3e6) return "bg-gradient-to-r from-amber-500 to-red-600 animate-pulse";
      if (simTemperature.value >= 1e6) return "bg-gradient-to-r from-cyan-500 to-amber-500";
      return "bg-gradient-to-r from-cyan-500 to-teal-400";
    });
    const simStatusDotClass = computed(() => {
      if (simTemperature.value >= 3e6) return "bg-red-400 animate-ping";
      if (simTemperature.value >= 1e6) return "bg-amber-400 animate-pulse";
      return "bg-emerald-400";
    });
    const alertThemeClass = computed(() => {
      var _a2, _b;
      const level = (_b = (_a2 = siteData.value) == null ? void 0 : _a2.bannerAlert) == null ? void 0 : _b.level;
      if (level === "LEVEL 5 EMERGENCY") return "bg-red-950/80 border-red-500/50 text-red-200";
      if (level === "DEFCON 2" || level === "DEFCON 3") return "bg-amber-950/80 border-amber-500/50 text-amber-200";
      return "bg-cyan-950/80 border-cyan-500/40 text-cyan-200";
    });
    const alertBadgeClass = computed(() => {
      var _a2, _b;
      const level = (_b = (_a2 = siteData.value) == null ? void 0 : _a2.bannerAlert) == null ? void 0 : _b.level;
      if (level === "LEVEL 5 EMERGENCY") return "bg-red-500/20 text-red-300 border-red-500/50";
      if (level === "DEFCON 2" || level === "DEFCON 3") return "bg-amber-500/20 text-amber-300 border-amber-500/50";
      return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
    });
    const alertDotClass = computed(() => {
      var _a2, _b;
      const level = (_b = (_a2 = siteData.value) == null ? void 0 : _a2.bannerAlert) == null ? void 0 : _b.level;
      if (level === "LEVEL 5 EMERGENCY") return "bg-red-400";
      if (level === "DEFCON 2" || level === "DEFCON 3") return "bg-amber-400";
      return "bg-cyan-400";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col justify-between" }, _attrs))}>`);
      if ((_b = (_a2 = siteData.value) == null ? void 0 : _a2.bannerAlert) == null ? void 0 : _b.enabled) {
        _push(`<div class="${ssrRenderClass([
          "px-4 py-2 text-xs md:text-sm font-mono flex items-center justify-between border-b transition-colors",
          alertThemeClass.value
        ])}"><div class="container mx-auto flex items-center gap-3 justify-center text-center"><span class="${ssrRenderClass([alertBadgeClass.value, "inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[11px] border"])}"><span class="${ssrRenderClass([alertDotClass.value, "w-2 h-2 rounded-full animate-ping"])}"></span> ${ssrInterpolate(siteData.value.bannerAlert.level)}</span><span class="font-medium tracking-wide">${ssrInterpolate(siteData.value.bannerAlert.message)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="border-b border-slate-800/80 bg-facility-900/90 backdrop-blur-md sticky top-0 z-50"><div class="container mx-auto px-4 py-3 flex items-center justify-between gap-4"><a href="#hero" class="flex items-center gap-3 group"><div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"><svg class="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg></div><div><div class="flex items-center gap-2"><span class="font-display text-xl font-bold tracking-wider text-white">NBTF.CA</span><span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"> MASTER DOSSIER </span></div><span class="text-[11px] text-slate-400 font-mono hidden sm:inline-block">Nuclear Blast Testing Facility</span></div></a><nav class="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-300"><a href="#sides" class="hover:text-cyan-400 transition-colors">The Sides</a><a href="#roles" class="hover:text-cyan-400 transition-colors">28 Roles</a><a href="#reactor" class="hover:text-cyan-400 transition-colors">Reactor &amp; Core</a><a href="#keycards" class="hover:text-cyan-400 transition-colors">Keycards</a><a href="#locations" class="hover:text-cyan-400 transition-colors">Locations</a><a href="#lore" class="hover:text-cyan-400 transition-colors">Lore &amp; Mirrors</a><a href="#gamepasses" class="hover:text-cyan-400 transition-colors">Gamepasses</a></nav><div class="flex items-center gap-3"><a href="https://index.nbtf.ca" target="_blank" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-facility-800 hover:bg-facility-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono transition-colors"><span>Directory</span><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a><a${ssrRenderAttr("href", siteData.value.robloxExperienceUrl)} target="_blank" class="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(230,57,70,0.3)] transition-all"><span>Play on Roblox</span><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></a></div></div></header><main class="flex-1"><section id="hero" class="relative py-16 md:py-24 overflow-hidden border-b border-slate-800/80"><div class="absolute inset-0 pointer-events-none"><div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl"></div><div class="absolute bottom-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div></div><div class="container mx-auto px-4 relative z-10 max-w-6xl text-center"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6"><span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> EXPERIENCE CREATED BY ${ssrInterpolate(siteData.value.stats.creator.toUpperCase())}</div><h1 class="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white uppercase leading-none"> Nuclear Blast <br class="hidden sm:inline"><span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300"> Testing Facility </span></h1><p class="text-slate-300 max-w-3xl mx-auto mt-6 text-base md:text-lg leading-relaxed font-sans">${ssrInterpolate(siteData.value.heroDescription)}</p><div class="flex flex-wrap items-center justify-center gap-4 mt-8 font-mono text-sm"><a${ssrRenderAttr("href", siteData.value.robloxExperienceUrl)} target="_blank" class="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-0.5"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>Launch Experience (Roblox)</span></a><a href="#roles" class="px-6 py-3.5 rounded-xl bg-facility-850 hover:bg-facility-800 text-slate-100 border border-slate-700/80 hover:border-cyan-500/50 flex items-center gap-2 transition-all"><span>Explore All 28 Roles</span><svg class="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a><a href="#reactor" class="px-6 py-3.5 rounded-xl bg-rebel-900/60 hover:bg-rebel-800/80 text-rose-300 border border-red-500/40 flex items-center gap-2 transition-all"><span>Reactor Simulator</span><svg class="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></a></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14 text-left font-mono"><div class="tactical-card p-4 rounded-xl"><span class="text-xs text-slate-400">TOTAL VISITS</span><p class="text-2xl sm:text-3xl font-bold font-display text-cyan-400 mt-1">${ssrInterpolate(siteData.value.stats.visits)}</p><span class="text-[11px] text-slate-500">Official Roblox counter</span></div><div class="tactical-card p-4 rounded-xl"><span class="text-xs text-slate-400">APPROVAL RATING</span><p class="text-2xl sm:text-3xl font-bold font-display text-emerald-400 mt-1">${ssrInterpolate(siteData.value.stats.positiveRating)}</p><span class="text-[11px] text-slate-500">Player recommendation</span></div><div class="tactical-card p-4 rounded-xl"><span class="text-xs text-slate-400">SPECIALIZED ROLES</span><p class="text-2xl sm:text-3xl font-bold font-display text-amber-400 mt-1">${ssrInterpolate(siteData.value.stats.totalRoles)} Classes</p><span class="text-[11px] text-slate-500">Across 9 branches</span></div><div class="tactical-card p-4 rounded-xl"><span class="text-xs text-slate-400">CORE FACTIONS</span><p class="text-xl sm:text-2xl font-bold font-display text-rose-400 mt-1 truncate">Pyrowh / Rebel</p><span class="text-[11px] text-slate-500">Facility vs Resistance</span></div></div></div></section><section id="sides" class="py-16 bg-facility-950/60 border-b border-slate-800/80"><div class="container mx-auto px-4 max-w-6xl"><div class="text-center max-w-2xl mx-auto mb-12"><span class="text-xs font-mono uppercase tracking-widest text-cyan-400">The Two Sides</span><h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1"> Facility vs Sharlach Resistance </h2><p class="text-slate-400 text-sm mt-2"> NBTF revolves around two opposing gameplay objectives: maintaining the nuclear simulation or initiating catastrophic reactor sabotage. </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="tactical-card rounded-2xl p-6 sm:p-8 border-cyan-500/30 relative overflow-hidden"><div class="flex items-center justify-between mb-4"><span class="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold uppercase border border-cyan-500/40">${ssrInterpolate(siteData.value.stats.corporation)}</span><span class="text-xs font-mono text-cyan-400">STATUS: DEFENDING</span></div><h3 class="text-2xl font-display font-bold text-white uppercase">The Facility (Pyrowh)</h3><p class="text-slate-300 text-sm mt-2 leading-relaxed"> The Facility side maintains and protects NBTF, operating the reactor, conducting weapons launches, and securing the perimeter against hostile incursions. </p><div class="mt-6 space-y-3 font-mono text-xs text-slate-300"><div class="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">Primary Responsibilities:</div><ul class="space-y-2"><li class="flex items-center gap-2"><span class="text-cyan-400">\u2022</span><span>Operate and cool the superheated fusion reactor</span></li><li class="flex items-center gap-2"><span class="text-cyan-400">\u2022</span><span>Conduct nuclear weapon test sequences at the Testing Field</span></li><li class="flex items-center gap-2"><span class="text-cyan-400">\u2022</span><span>Secure access checkpoints with high-tier keycard clearance</span></li><li class="flex items-center gap-2"><span class="text-cyan-400">\u2022</span><span>Intercept and neutralize undercover rebel spies and armed raiders</span></li><li class="flex items-center gap-2"><span class="text-cyan-400">\u2022</span><span>Executive leadership command under the Supreme Council &amp; Director</span></li></ul></div></div><div class="rebel-card rounded-2xl p-6 sm:p-8 border-red-500/30 relative overflow-hidden"><div class="flex items-center justify-between mb-4"><span class="px-3 py-1 rounded-md bg-red-500/20 text-red-300 font-mono text-xs font-bold uppercase border border-red-500/40">${ssrInterpolate(siteData.value.stats.resistance)}</span><span class="text-xs font-mono text-red-400">STATUS: INFILTRATING</span></div><h3 class="text-2xl font-display font-bold text-white uppercase">The Rebellion (Sharlach)</h3><p class="text-slate-300 text-sm mt-2 leading-relaxed"> The Sharlach Resistance attempts to penetrate the facility, obtain code fragments from terminals, disable reactor safety protocols, and trigger a nuclear explosion. </p><div class="mt-6 space-y-3 font-mono text-xs text-slate-300"><div class="font-bold text-red-300 uppercase tracking-wider text-[11px]">Infiltration Objectives:</div><ul class="space-y-2"><li class="flex items-center gap-2"><span class="text-red-400">\u2022</span><span>Infiltrate under cover as Spies or Hitmen past security</span></li><li class="flex items-center gap-2"><span class="text-red-400">\u2022</span><span>Access 6 secret terminals across the facility to gather override codes</span></li><li class="flex items-center gap-2"><span class="text-red-400">\u2022</span><span>Breach EGC Core Control and disable reactor safety protocols</span></li><li class="flex items-center gap-2"><span class="text-red-400">\u2022</span><span>Superheat core past 1,000,000 K to 3,000,000 K for catastrophic detonation</span></li><li class="flex items-center gap-2"><span class="text-red-400">\u2022</span><span>Commanded by banished Supreme Council Warlords &amp; impeached Overseers</span></li></ul></div></div></div></div></section><section id="roles" class="py-16 border-b border-slate-800/80"><div class="container mx-auto px-4 max-w-6xl"><div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"><div><span class="text-xs font-mono uppercase tracking-widest text-cyan-400">Personnel Dossier</span><h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1"> All 28 Specialized Roles </h2><p class="text-slate-400 text-sm mt-1"> Explore the complete roster categorized across 9 functional departments. </p></div><div class="flex items-center gap-2 bg-facility-900 p-1 rounded-xl border border-slate-800 font-mono text-xs"><button class="${ssrRenderClass(["px-3 py-1.5 rounded-lg transition-all", roleSideFilter.value === "All" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"])}"> All Sides (${ssrInterpolate(siteData.value.roles.length)}) </button><button class="${ssrRenderClass(["px-3 py-1.5 rounded-lg transition-all", roleSideFilter.value === "Facility" ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40" : "text-slate-400 hover:text-white"])}"> Facility (${ssrInterpolate(siteData.value.roles.filter((r) => r.side === "Facility").length)}) </button><button class="${ssrRenderClass(["px-3 py-1.5 rounded-lg transition-all", roleSideFilter.value === "Rebellion" ? "bg-red-500/20 text-red-300 font-bold border border-red-500/40" : "text-slate-400 hover:text-white"])}"> Rebellion (${ssrInterpolate(siteData.value.roles.filter((r) => r.side === "Rebellion").length)}) </button><button class="${ssrRenderClass(["px-3 py-1.5 rounded-lg transition-all", roleSideFilter.value === "Neutral" ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40" : "text-slate-400 hover:text-white"])}"> Neutral (${ssrInterpolate(siteData.value.roles.filter((r) => r.side === "Neutral").length)}) </button></div></div><div class="space-y-4 mb-8"><div class="flex flex-wrap items-center gap-2 font-mono text-xs"><!--[-->`);
      ssrRenderList(roleCategories, (cat) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-1.5 rounded-lg transition-all",
          selectedRoleCategory.value === cat ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]" : "bg-facility-900 text-slate-400 hover:text-slate-200 border border-slate-800"
        ])}">${ssrInterpolate(cat)}</button>`);
      });
      _push(`<!--]--></div><div class="relative w-full max-w-md"><input${ssrRenderAttr("value", roleSearchQuery.value)} type="text" placeholder="Filter roles by name, equipment, keycard..." class="w-full px-4 py-2.5 bg-facility-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"><!--[-->`);
      ssrRenderList(filteredRoles.value, (role) => {
        _push(`<div class="${ssrRenderClass([
          "rounded-xl p-5 flex flex-col justify-between transition-all duration-300",
          role.side === "Rebellion" ? "rebel-card" : "tactical-card"
        ])}"><div><div class="flex items-center justify-between gap-2 mb-3"><span class="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">${ssrInterpolate(role.category)}</span><div class="flex items-center gap-1.5">`);
        if (role.hasLaunchKeycard) {
          _push(`<span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40" title="Authorized to initiate nuclear launch sequences"> \u{1F680} Launch Card </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="${ssrRenderClass([[
          role.clearanceLevel.includes("Level 6") ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" : role.clearanceLevel.includes("Level 5") ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40" : role.clearanceLevel.includes("Level 4") ? "bg-blue-500/20 text-blue-300 border border-blue-500/40" : role.clearanceLevel.includes("Level 3") ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : role.clearanceLevel.includes("Rebel") ? "bg-red-500/20 text-red-300 border border-red-500/40" : "bg-slate-800 text-slate-400 border border-slate-700"
        ], "text-[10px] font-mono font-bold px-2 py-0.5 rounded"])}">${ssrInterpolate(role.clearanceLevel)}</span></div></div><h3 class="text-xl font-display font-bold text-white flex items-center justify-between"><span>${ssrInterpolate(role.name)}</span>`);
        if (role.isPaid) {
          _push(`<span class="text-xs font-mono text-amber-400 font-semibold">${ssrInterpolate(role.costRobux)} R$ </span>`);
        } else {
          _push(`<span class="text-xs font-mono text-emerald-400"> Free </span>`);
        }
        _push(`</h3><p class="text-xs text-slate-300 mt-2 font-medium leading-relaxed">${ssrInterpolate(role.purpose)}</p><div class="mt-4 space-y-2 text-xs font-mono text-slate-400"><div class="flex items-start gap-1.5"><span class="text-slate-500 font-semibold">SPAWN:</span><span class="text-slate-300">${ssrInterpolate(role.spawnLocation)}</span></div><div class="pt-2 border-t border-slate-800/80"><span class="text-slate-500 font-semibold block mb-1">DUTIES:</span><ul class="space-y-1 text-slate-300"><!--[-->`);
        ssrRenderList(role.responsibilities.slice(0, 3), (duty, idx) => {
          _push(`<li class="flex items-start gap-1.5"><span class="text-cyan-400 shrink-0">\u2022</span><span class="line-clamp-1">${ssrInterpolate(duty)}</span></li>`);
        });
        _push(`<!--]--></ul></div></div></div><div class="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">`);
        if (role.equipment && role.equipment.length) {
          _push(`<div class="text-slate-400 truncate max-w-[200px]"><span class="text-slate-500">GEAR:</span> ${ssrInterpolate(role.equipment.join(", "))}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (role.mirrorRole) {
          _push(`<div class="text-slate-400"><span class="text-slate-500">MIRROR:</span><span class="text-cyan-300 ml-1">${ssrInterpolate(role.mirrorRole)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></section><section id="reactor" class="py-16 bg-facility-900/60 border-b border-slate-800/80 relative overflow-hidden"><div class="container mx-auto px-4 max-w-6xl"><div class="text-center max-w-2xl mx-auto mb-10"><span class="text-xs font-mono uppercase tracking-widest text-rose-400">Reactor Core Diagnostics</span><h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1"> Reactor &amp; Meltdown Mechanics </h2><p class="text-slate-400 text-sm mt-2"> The reactor is NBTF&#39;s central mechanic. Manipulate temperature telemetry below to inspect core states from normal operation to catastrophic meltdown. </p></div><div class="tactical-card rounded-2xl p-6 sm:p-8 border-cyan-500/40 max-w-4xl mx-auto"><div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 font-mono text-xs"><div class="flex items-center gap-2"><span class="${ssrRenderClass([simStatusDotClass.value, "w-2.5 h-2.5 rounded-full"])}"></span><span class="font-bold text-white">EGC CORE SYSTEM TELEMETRY</span></div><div class="flex items-center gap-4 text-slate-400"><span>SAFETY INTERLOCK: <strong class="${ssrRenderClass(safetyOverrideActive.value ? "text-red-400" : "text-emerald-400")}">${ssrInterpolate(safetyOverrideActive.value ? "BYPASSED" : "ACTIVE")}</strong></span><span>OVERRIDE CODES: <strong class="text-cyan-400">${ssrInterpolate(collectedFragments.value)}/6</strong></span></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 items-center"><div class="${ssrRenderClass([coreBorderClass.value, "relative w-full aspect-square max-w-[280px] mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-500"])}"><div class="absolute inset-4 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow pointer-events-none"></div><div class="absolute inset-10 rounded-full border border-dashed border-red-400/30 animate-spin-slow pointer-events-none" style="${ssrRenderStyle({ "animation-direction": "reverse" })}"></div><div class="rounded-full transition-all duration-300 blur-sm" style="${ssrRenderStyle({
        width: `${Math.min(180, Math.max(60, simTemperature.value / 3e6 * 160 + 50))}px`,
        height: `${Math.min(180, Math.max(60, simTemperature.value / 3e6 * 160 + 50))}px`,
        backgroundColor: coreGlowColor.value,
        boxShadow: `0 0 50px ${coreGlowColor.value}`
      })}"></div><div class="relative z-10 text-center font-mono"><div class="text-[10px] uppercase text-slate-300 font-bold tracking-wider">CORE TEMP</div><div class="text-xl sm:text-2xl font-bold font-display text-white">${ssrInterpolate(simTemperature.value.toLocaleString())} K </div><div class="${ssrRenderClass([coreStatusTextClass.value, "text-[10px] font-bold mt-1"])}">${ssrInterpolate(coreStateLabel.value)}</div></div></div><div class="space-y-5 font-mono"><div><div class="flex justify-between text-xs text-slate-300 mb-1"><span>THERMAL LOAD</span><span class="text-cyan-300">${ssrInterpolate((simTemperature.value / 3e6 * 100).toFixed(1))}% CRITICAL</span></div><div class="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800"><div class="${ssrRenderClass([progressFillClass.value, "h-full transition-all duration-300 rounded-full"])}" style="${ssrRenderStyle({ width: `${Math.min(100, simTemperature.value / 3e6 * 100)}%` })}"></div></div></div><div class="grid grid-cols-2 gap-3"><button class="py-2.5 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2"><span>\u2744 Cool Core</span></button><button class="py-2.5 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2"><span>\u{1F525} Heat Core</span></button></div><div class="p-3 rounded-xl bg-facility-850 border border-slate-800 text-xs flex items-center justify-between"><div><span class="font-bold text-white block">Safety Override Interlock</span><span class="text-[11px] text-slate-400">Requires 6 terminal fragments</span></div><button class="${ssrRenderClass([
        "px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all",
        safetyOverrideActive.value ? "bg-red-500 text-white shadow-[0_0_15px_rgba(230,57,70,0.5)]" : "bg-slate-800 text-slate-300 hover:text-white"
      ])}">${ssrInterpolate(safetyOverrideActive.value ? "OVERRIDDEN" : "BYPASS (Sabotage)")}</button></div>`);
      if (simTemperature.value >= 3e6) {
        _push(`<div class="p-3 rounded-xl bg-red-950/80 border border-red-500 text-center animate-pulse text-red-300"><span class="font-bold text-sm block tracking-wider">\u26A0 180-SECOND COUNTDOWN ENGAGED \u26A0</span><span class="text-xs">CATASTROPHIC BLAST IMMINENT \u2014 EVACUATE FACILITY</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-8 pt-6 border-t border-slate-800/80"><h4 class="font-display font-bold text-sm text-white uppercase tracking-wider mb-3"> The 6-Step Rebel Core Sabotage Sequence: </h4><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[11px] font-mono text-slate-400"><div class="p-2.5 rounded bg-facility-850 border border-slate-800"><strong class="text-cyan-400 block mb-0.5">1. Terminals</strong> Locate 6 terminals across facility </div><div class="p-2.5 rounded bg-facility-850 border border-slate-800"><strong class="text-cyan-400 block mb-0.5">2. Codes</strong> Decrypt code fragments </div><div class="p-2.5 rounded bg-facility-850 border border-slate-800"><strong class="text-cyan-400 block mb-0.5">3. EGC Breach</strong> Infiltrate Core Control </div><div class="p-2.5 rounded bg-facility-850 border border-slate-800"><strong class="text-cyan-400 block mb-0.5">4. Bypass</strong> Disable safety protocols </div><div class="p-2.5 rounded bg-facility-850 border border-slate-800"><strong class="text-amber-400 block mb-0.5">5. 1,000,000 K</strong> Level 5 emergency triggered </div><div class="p-2.5 rounded bg-facility-850 border border-slate-800"><strong class="text-red-400 block mb-0.5">6. 3,000,000 K</strong> 180s countdown to blast </div></div></div></div></div></section><section id="keycards" class="py-16 border-b border-slate-800/80"><div class="container mx-auto px-4 max-w-6xl"><div class="text-center max-w-2xl mx-auto mb-10"><span class="text-xs font-mono uppercase tracking-widest text-cyan-400">Access Control</span><h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1"> Keycard Clearance Hierarchy </h2><p class="text-slate-400 text-sm mt-2"> Your role determines where you can physically go. Access control connects all departments. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs"><div class="tactical-card p-4 rounded-xl border-purple-500/40"><span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold uppercase">Level 6</span><h4 class="text-sm font-bold text-white mt-2">Facility Director</h4><p class="text-slate-400 text-[11px] mt-1">Unrestricted facility-wide access, executive offices, broadcast studio, master teleporter, core room.</p></div><div class="tactical-card p-4 rounded-xl border-indigo-500/40"><span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold uppercase">Level 5</span><h4 class="text-sm font-bold text-white mt-2">Council Executive</h4><p class="text-slate-400 text-[11px] mt-1">Supreme Council executive suites, weapons chamber, launch consoles, high-level administrative sectors.</p></div><div class="tactical-card p-4 rounded-xl border-blue-500/40"><span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase">Level 4</span><h4 class="text-sm font-bold text-white mt-2">Government / Mil Officers / STF</h4><p class="text-slate-400 text-[11px] mt-1">Strategic Command Center (SCC), military armories, security supervisors, internal security command.</p></div><div class="tactical-card p-4 rounded-xl border-cyan-500/40"><span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold uppercase">Level 3</span><h4 class="text-sm font-bold text-white mt-2">Engineers / Scientists / Soldiers</h4><p class="text-slate-400 text-[11px] mt-1">EGC Core Room, Weapons Research, Barracks, Hospital, Maintenance, standard perimeter checkpoints.</p></div><div class="tactical-card p-4 rounded-xl border-emerald-500/40"><span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">Level 2</span><h4 class="text-sm font-bold text-white mt-2">Logistics &amp; Factory</h4><p class="text-slate-400 text-[11px] mt-1">Receiving Department, cargo loading bays, logistics checkpoints, exterior transport corridors.</p></div><div class="tactical-card p-4 rounded-xl border-amber-500/40"><span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">Level 1</span><h4 class="text-sm font-bold text-white mt-2">Volunteers &amp; Disguised Operatives</h4><p class="text-slate-400 text-[11px] mt-1">Basic public corridors, volunteer stations, civilian boundary buffer zones.</p></div><div class="rebel-card p-4 rounded-xl border-red-500/40"><span class="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold uppercase">Rebel Card</span><h4 class="text-sm font-bold text-white mt-2">Sharlach Resistance</h4><p class="text-slate-400 text-[11px] mt-1">Rebel base hideout, hidden cave, rebel gas station, hacked bypass doors.</p></div><div class="tactical-card p-4 rounded-xl border-amber-400/40"><span class="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold uppercase">\u{1F680} Launch Keycard</span><h4 class="text-sm font-bold text-white mt-2">Nuclear Authorization</h4><p class="text-slate-400 text-[11px] mt-1">Required for launching nukes. Held by Rocket Scientists, Core Engineers, Directors, Council &amp; Officers.</p></div></div></div></section><section id="locations" class="py-16 bg-facility-950/60 border-b border-slate-800/80"><div class="container mx-auto px-4 max-w-6xl"><div class="text-center max-w-2xl mx-auto mb-10"><span class="text-xs font-mono uppercase tracking-widest text-cyan-400">Tactical Map</span><h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1"> Main Facility Locations </h2><p class="text-slate-400 text-sm mt-2"> Explore key infrastructure sectors, control centers, and staging bases. </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-5"><!--[-->`);
      ssrRenderList(siteData.value.locations, (loc) => {
        _push(`<div class="tactical-card p-5 rounded-xl flex flex-col justify-between"><div><div class="flex items-center justify-between gap-2 mb-2 font-mono text-xs"><span class="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">${ssrInterpolate(loc.category)}</span><span class="text-slate-400">Clearance: <strong class="text-white">${ssrInterpolate(loc.clearanceRequired)}</strong></span></div><h3 class="text-lg font-display font-bold text-white">${ssrInterpolate(loc.name)}</h3><p class="text-xs text-slate-300 mt-2 leading-relaxed">${ssrInterpolate(loc.description)}</p><div class="mt-4 pt-3 border-t border-slate-800 font-mono text-xs space-y-1.5"><div class="text-slate-400"><span class="text-slate-500 font-semibold">KEY FEATURES:</span> ${ssrInterpolate(loc.keyFeatures.join(" \u2022 "))}</div></div></div><div class="mt-3 pt-2 text-[11px] font-mono text-cyan-400/90"><span class="text-slate-500">OPERATING PERSONNEL:</span> ${ssrInterpolate(loc.associatedRoles.join(", "))}</div></div>`);
      });
      _push(`<!--]--></div></div></section><section id="lore" class="py-16 border-b border-slate-800/80"><div class="container mx-auto px-4 max-w-6xl"><div class="text-center max-w-2xl mx-auto mb-10"><span class="text-xs font-mono uppercase tracking-widest text-indigo-400">Faction Lore</span><h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1"> Lore &amp; The Role Mirror System </h2><p class="text-slate-400 text-sm mt-2"> Many Facility positions have direct ideological and tactical rebel counterparts. </p></div><div class="tactical-card rounded-2xl p-6 sm:p-8 border-indigo-500/30 max-w-4xl mx-auto mb-8"><h3 class="text-xl font-display font-bold text-white uppercase mb-2">The Pyrowh \u2014 Sharlach Conflict</h3><p class="text-slate-300 text-sm leading-relaxed">${ssrInterpolate(siteData.value.loreOverview.backstory)}</p></div><div class="overflow-x-auto tactical-card rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto"><table class="w-full text-left font-mono text-xs"><thead><tr class="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]"><th class="pb-3 text-cyan-400">Facility Role</th><th class="pb-3 text-red-400">Rebellion Mirror</th><th class="pb-3 text-slate-300">Lore Relationship &amp; Connection</th></tr></thead><tbody class="divide-y divide-slate-800/80"><!--[-->`);
      ssrRenderList(siteData.value.loreOverview.roleMirrors, (mirror, idx) => {
        _push(`<tr class="hover:bg-facility-850/50"><td class="py-3 pr-4 font-bold text-cyan-300 whitespace-nowrap">${ssrInterpolate(mirror.facility)}</td><td class="py-3 pr-4 font-bold text-red-400 whitespace-nowrap">${ssrInterpolate(mirror.rebel)}</td><td class="py-3 text-slate-300 leading-relaxed">${ssrInterpolate(mirror.notes)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></section><section id="gamepasses" class="py-16 bg-facility-950/60 border-b border-slate-800/80"><div class="container mx-auto px-4 max-w-6xl"><div class="text-center max-w-2xl mx-auto mb-10"><span class="text-xs font-mono uppercase tracking-widest text-amber-400">Robux Store Reference</span><h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1"> Paid Teams &amp; Gamepasses Guide </h2><p class="text-slate-400 text-sm mt-2"> Historical and reference pricing for specialized roles and VIP access. </p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs"><!--[-->`);
      ssrRenderList(siteData.value.gamepasses, (gp) => {
        _push(`<div class="tactical-card p-4 rounded-xl flex flex-col justify-between"><div><div class="flex items-center justify-between mb-2"><span class="font-bold text-white text-sm">${ssrInterpolate(gp.name)}</span><span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">${ssrInterpolate(gp.robux)} Robux </span></div><span class="text-slate-400 text-[11px] block mb-1">TEAM: ${ssrInterpolate(gp.role)}</span><p class="text-slate-300 text-[11px] leading-relaxed">${ssrInterpolate(gp.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></section></main><footer class="border-t border-slate-800 bg-facility-950 py-10"><div class="container mx-auto px-4 max-w-6xl space-y-6"><div class="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 text-xs font-mono flex items-start gap-3"><div class="p-1.5 rounded bg-amber-500/20 text-amber-400 shrink-0 mt-0.5"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div><div class="space-y-1"><p class="font-bold tracking-wide uppercase text-amber-300">DISCLAIMER &amp; DOMAIN OWNERSHIP NOTICE</p><p>\u26A0 NBTF.CA is a second-level domain owned by cbx.nz \u2014 it may or may not be directly affiliated with NBTF or its developer.</p><p class="text-amber-400/80">NBTF.ca is connected via Cloudflare, domain owned by cbx.nz who also owns cbx.kiwi.</p></div></div><div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500"><div> \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Nuclear Blast Testing Facility Operations Dossier. </div><div class="flex flex-wrap items-center gap-4"><a href="https://index.nbtf.ca" class="hover:text-cyan-400 transition-colors">Directory (index.nbtf.ca)</a><span class="text-slate-700">\u2022</span><a href="https://cbx.kiwi" target="_blank" class="hover:text-cyan-400 transition-colors">Maintainer (cbx.kiwi)</a><span class="text-slate-700">\u2022</span><a href="https://adminpanel.nbtf.ca" class="hover:text-cyan-400 transition-colors">Admin Portal</a></div></div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index--W-MDanD.mjs.map
