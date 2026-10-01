import { a as useRuntimeConfig } from './nitro.mjs';
import { Redis } from '@upstash/redis';
import Redis$1 from 'ioredis';

const defaultWwwData = {
  siteTitle: "Nuclear Blast Testing Facility",
  siteTagline: "Official gameplay dossier, 28-role guide, reactor mechanics, and official lore for NBTF on Roblox",
  heroDescription: "A secret nuclear testing facility operates a powerful fusion reactor and conducts nuclear tests while military, security, government, and scientific personnel keep the facility operational. A rebel organisation attempts to infiltrate the facility, sabotage systems, and trigger a catastrophic core explosion.",
  robloxExperienceUrl: "https://www.roblox.com/games/6153709/Nuclear-Blast-Testing-Facility",
  discordUrl: "https://discord.gg/nbtf",
  stats: {
    visits: "41.7M+",
    positiveRating: "88%+",
    dailyPlayers: "400+",
    totalRoles: 28,
    creator: "Ryanblaze",
    corporation: "Pyrowh Corporation",
    securityContractor: "Nevlar Arms"
  },
  bannerAlert: {
    enabled: true,
    level: "NOMINAL",
    message: "REACTOR CORE STABILITY: 99.8% \u2014 ALL PROTOCOLS ENFORCED. FACILITY AT STANDARD READINESS."
  },
  officialLore: {
    developerNotice: "These are facts/statements about the NBTF universe that the developer/creator, Ryanblaze, has determined are accurate to the setting he wishes to create. You may ignore or contravene these statements, but these are the 'main points' of the NBTF universe, to help you out when making your own lore about the game!",
    creator: "Ryanblaze",
    facts: [
      {
        id: "fact-1",
        title: "Site Location",
        statement: "NBTF is located in Nevada, slightly north of the Extraterrestrial Highway."
      },
      {
        id: "fact-2",
        title: "Pyrowh Corporation",
        statement: "The Pyrowh Corporation was founded in 1955."
      },
      {
        id: "fact-3",
        title: "Nevlar Arms",
        statement: "Nevlar Arms provides security for the site, and funds the rebels that attack it."
      },
      {
        id: "fact-4",
        title: "Facility Secrecy",
        statement: "The NBTF site is secret and inaccessible to most."
      },
      {
        id: "fact-5",
        title: "Time Period",
        statement: "The NBTF game is set in the present day."
      }
    ],
    discordInfo: {
      text: "Factions and community lore are found and organized in the official Discord server.",
      url: "https://discord.gg/nbtf",
      displayUrl: "discord.gg/nbtf"
    }
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
      equipment: ["Launch Keycard", "Executive ID", "Special Weapons Chamber Access", "Executive Vehicle"]
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
      equipment: ["Level 6 Keycard", "Launch Keycard", "Director APC", "Director Sedan", "Executive Broadcast Dashboard"]
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
      equipment: ["Level 4 Keycard", "Government Sedan", "Government SUV"]
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
        "Identify and neutralize hostile covert assets"
      ],
      equipment: ["Level 4 Keycard", "Covert Scanner", "Tactical Radio"]
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
      equipment: ["Level 3 Keycard", "Launch Keycard", "Hazmat Suit", "Core Diagnostic Tool"]
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
      equipment: ["M4 Carbine", "USP Pistol", "Level 3 Keycard", "Flashlight", "Radio", "Infantry Jeep"]
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
        "Command military forces during base defense",
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
      equipment: ["Level 4 Keycard", "Heavy Tactical Armor", "Advanced Rifle", "STF Tactical SUV"]
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
      equipment: ["Rebel Keycard", "Heavy Assault Rifle", "Combat Armor", "Explosives"]
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
        "Eliminate designated high-value targets",
        "Conduct clandestine infiltration strikes",
        "Operate independently under bounty contracts"
      ],
      equipment: ["Rebel Keycard", "Silenced Sniper / Pistol", "Infiltration Cloak"]
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
      equipment: ["Rebel Master Card", "Rebel Command Terminal", "Tactical Map"]
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
      equipment: ["Rebel Keycard", "Command Radio", "Assault Loadout"]
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
      equipment: ["AK-47 / SMG", "Rebel Keycard", "Flashlight"]
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
        "Access terminals and obtain override code fragments",
        "Sabotage systems from deep within without detection"
      ],
      equipment: ["Disguise Kit", "Hacking Decryption Tool", "Silenced Sidearm"]
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
      purpose: "Supreme military commander of the rebellion.",
      responsibilities: [
        "Lead all rebellion armed forces in organized assaults",
        "Formulate grand strategic raid operations",
        "Authorize full-scale reactor core sabotage operations"
      ],
      equipment: ["Warlord Heavy Armor", "Warlord Custom Weaponry", "Rebel Master Key"]
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
        "Survive ongoing clashes between facility forces and rebels",
        "Choose whether to cooperate or remain neutral"
      ],
      equipment: ["Civilian Clothes", "Flashlight"]
    }
  ],
  locations: [
    {
      id: "egc-core",
      name: "Energy Generation Center (EGC) & Reactor Core",
      category: "Science & Reactor",
      clearanceRequired: "Level 3 (Level 4+ for Control Room)",
      description: "The central installation of NBTF. Houses the fusion reactor core, coolant injection pipelines, and safety override panels.",
      associatedRoles: ["Core Engineer", "Facility Director", "Rebels"],
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
      name: "Rebel Base & Hidden Cave",
      category: "Exterior",
      clearanceRequired: "Rebel Card",
      description: "Fortified rebel bunker hidden in the surrounding badlands where raids are planned and weapons stockpiled.",
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
    { name: "Overseer", role: "Rebel Intelligence Head", robux: 3e3, description: "Rebel strategic mastermind directing sabotage intelligence." },
    { name: "Facility Director", role: "Supreme Facility Head", robux: 3400, description: "Highest operational facility authority with Level 6 clearance." }
  ]
};

const REDIS_WWW_KEY = "nbtf:www:data";
let ioredisClient = null;
let upstashClient = null;
let memoryCache = null;
function getRedisClient() {
  const config = useRuntimeConfig();
  const upstashUrl = config.upstashRedisRestUrl || process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = config.upstashRedisRestToken || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (upstashUrl && upstashToken) {
    if (!upstashClient) {
      upstashClient = new Redis({
        url: upstashUrl,
        token: upstashToken
      });
    }
    return { type: "upstash", client: upstashClient };
  }
  const redisUrl = config.redisUrl || process.env.REDIS_URL;
  if (redisUrl) {
    if (!ioredisClient) {
      ioredisClient = new Redis$1(redisUrl, {
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
        lazyConnect: true
      });
    }
    return { type: "ioredis", client: ioredisClient };
  }
  return { type: "memory", client: null };
}
async function fetchWwwData() {
  try {
    const redis = getRedisClient();
    if (redis.type === "upstash" && redis.client) {
      const data = await redis.client.get(REDIS_WWW_KEY);
      if (data) {
        return typeof data === "string" ? JSON.parse(data) : data;
      }
    } else if (redis.type === "ioredis" && redis.client) {
      const raw = await redis.client.get(REDIS_WWW_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } else if (memoryCache) ;
  } catch (err) {
    console.warn("[Redis] Unable to fetch live WWW data, returning fallback defaults:", err);
  }
  return defaultWwwData;
}

export { fetchWwwData as f, getRedisClient as g };
//# sourceMappingURL=redis.mjs.map
