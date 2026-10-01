<template>
  <div class="min-h-screen flex flex-col justify-between">
    <!-- Facility Status / Alert Banner -->
    <div
      v-if="siteData?.bannerAlert?.enabled"
      :class="[
        'px-4 py-2 text-xs md:text-sm font-mono flex items-center justify-between border-b transition-colors',
        alertThemeClass
      ]"
    >
      <div class="container mx-auto flex items-center gap-3 justify-center text-center">
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[11px] border" :class="alertBadgeClass">
          <span class="w-2 h-2 rounded-full animate-ping" :class="alertDotClass"></span>
          {{ siteData.bannerAlert.level }}
        </span>
        <span class="font-medium tracking-wide">{{ siteData.bannerAlert.message }}</span>
      </div>
    </div>

    <!-- Navigation Header -->
    <header class="border-b border-slate-800/80 bg-facility-900/90 backdrop-blur-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <!-- Logo -->
        <a href="#hero" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
            <svg class="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-display text-xl font-bold tracking-wider text-white">NBTF.CA</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                MASTER DOSSIER
              </span>
            </div>
            <span class="text-[11px] text-slate-400 font-mono hidden sm:inline-block">Nuclear Blast Testing Facility</span>
          </div>
        </a>

        <!-- Nav Links -->
        <nav class="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-300">
          <a href="#sides" class="hover:text-cyan-400 transition-colors">The Sides</a>
          <a href="#roles" class="hover:text-cyan-400 transition-colors">28 Roles</a>
          <a href="#reactor" class="hover:text-cyan-400 transition-colors">Reactor & Core</a>
          <a href="#keycards" class="hover:text-cyan-400 transition-colors">Keycards</a>
          <a href="#locations" class="hover:text-cyan-400 transition-colors">Locations</a>
          <a href="#lore" class="hover:text-cyan-400 transition-colors">Lore & Mirrors</a>
          <a href="#gamepasses" class="hover:text-cyan-400 transition-colors">Gamepasses</a>
        </nav>

        <!-- CTAs -->
        <div class="flex items-center gap-3">
          <a
            href="https://index.nbtf.ca"
            target="_blank"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-facility-800 hover:bg-facility-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono transition-colors"
          >
            <span>Directory</span>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <a
            :href="siteData.robloxExperienceUrl"
            target="_blank"
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(230,57,70,0.3)] transition-all"
          >
            <span>Play on Roblox</span>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </a>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <!-- HERO SECTION -->
      <section id="hero" class="relative py-16 md:py-24 overflow-hidden border-b border-slate-800/80">
        <!-- Ambient lighting & background decoration -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        </div>

        <div class="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            EXPERIENCE CREATED BY {{ siteData.stats.creator.toUpperCase() }}
          </div>

          <h1 class="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white uppercase leading-none">
            Nuclear Blast <br class="hidden sm:inline" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
              Testing Facility
            </span>
          </h1>

          <p class="text-slate-300 max-w-3xl mx-auto mt-6 text-base md:text-lg leading-relaxed font-sans">
            {{ siteData.heroDescription }}
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center justify-center gap-4 mt-8 font-mono text-sm">
            <a
              :href="siteData.robloxExperienceUrl"
              target="_blank"
              class="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Launch Experience (Roblox)</span>
            </a>
            <a
              href="#roles"
              class="px-6 py-3.5 rounded-xl bg-facility-850 hover:bg-facility-800 text-slate-100 border border-slate-700/80 hover:border-cyan-500/50 flex items-center gap-2 transition-all"
            >
              <span>Explore All 28 Roles</span>
              <svg class="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
            <a
              href="#reactor"
              class="px-6 py-3.5 rounded-xl bg-rebel-900/60 hover:bg-rebel-800/80 text-rose-300 border border-red-500/40 flex items-center gap-2 transition-all"
            >
              <span>Reactor Simulator</span>
              <svg class="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </a>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14 text-left font-mono">
            <div class="tactical-card p-4 rounded-xl">
              <span class="text-xs text-slate-400">TOTAL VISITS</span>
              <p class="text-2xl sm:text-3xl font-bold font-display text-cyan-400 mt-1">{{ siteData.stats.visits }}</p>
              <span class="text-[11px] text-slate-500">Official Roblox counter</span>
            </div>
            <div class="tactical-card p-4 rounded-xl">
              <span class="text-xs text-slate-400">APPROVAL RATING</span>
              <p class="text-2xl sm:text-3xl font-bold font-display text-emerald-400 mt-1">{{ siteData.stats.positiveRating }}</p>
              <span class="text-[11px] text-slate-500">Player recommendation</span>
            </div>
            <div class="tactical-card p-4 rounded-xl">
              <span class="text-xs text-slate-400">SPECIALIZED ROLES</span>
              <p class="text-2xl sm:text-3xl font-bold font-display text-amber-400 mt-1">{{ siteData.stats.totalRoles }} Classes</p>
              <span class="text-[11px] text-slate-500">Across 9 branches</span>
            </div>
            <div class="tactical-card p-4 rounded-xl">
              <span class="text-xs text-slate-400">CORE FACTIONS</span>
              <p class="text-xl sm:text-2xl font-bold font-display text-rose-400 mt-1 truncate">Pyrowh / Rebel</p>
              <span class="text-[11px] text-slate-500">Facility vs Resistance</span>
            </div>
          </div>
        </div>
      </section>

      <!-- THE TWO FUNDAMENTAL SIDES -->
      <section id="sides" class="py-16 bg-facility-950/60 border-b border-slate-800/80">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan-400">The Two Sides</span>
            <h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1">
              Facility vs Sharlach Resistance
            </h2>
            <p class="text-slate-400 text-sm mt-2">
              NBTF revolves around two opposing gameplay objectives: maintaining the nuclear simulation or initiating catastrophic reactor sabotage.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Facility Side -->
            <div class="tactical-card rounded-2xl p-6 sm:p-8 border-cyan-500/30 relative overflow-hidden">
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold uppercase border border-cyan-500/40">
                  {{ siteData.stats.corporation }}
                </span>
                <span class="text-xs font-mono text-cyan-400">STATUS: DEFENDING</span>
              </div>
              <h3 class="text-2xl font-display font-bold text-white uppercase">The Facility (Pyrowh)</h3>
              <p class="text-slate-300 text-sm mt-2 leading-relaxed">
                The Facility side maintains and protects NBTF, operating the reactor, conducting weapons launches, and securing the perimeter against hostile incursions.
              </p>

              <div class="mt-6 space-y-3 font-mono text-xs text-slate-300">
                <div class="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">Primary Responsibilities:</div>
                <ul class="space-y-2">
                  <li class="flex items-center gap-2">
                    <span class="text-cyan-400">&bull;</span>
                    <span>Operate and cool the superheated fusion reactor</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-cyan-400">&bull;</span>
                    <span>Conduct nuclear weapon test sequences at the Testing Field</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-cyan-400">&bull;</span>
                    <span>Secure access checkpoints with high-tier keycard clearance</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-cyan-400">&bull;</span>
                    <span>Intercept and neutralize undercover rebel spies and armed raiders</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-cyan-400">&bull;</span>
                    <span>Executive leadership command under the Supreme Council & Director</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Rebellion Side -->
            <div class="rebel-card rounded-2xl p-6 sm:p-8 border-red-500/30 relative overflow-hidden">
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-md bg-red-500/20 text-red-300 font-mono text-xs font-bold uppercase border border-red-500/40">
                  {{ siteData.stats.resistance }}
                </span>
                <span class="text-xs font-mono text-red-400">STATUS: INFILTRATING</span>
              </div>
              <h3 class="text-2xl font-display font-bold text-white uppercase">The Rebellion (Sharlach)</h3>
              <p class="text-slate-300 text-sm mt-2 leading-relaxed">
                The Sharlach Resistance attempts to penetrate the facility, obtain code fragments from terminals, disable reactor safety protocols, and trigger a nuclear explosion.
              </p>

              <div class="mt-6 space-y-3 font-mono text-xs text-slate-300">
                <div class="font-bold text-red-300 uppercase tracking-wider text-[11px]">Infiltration Objectives:</div>
                <ul class="space-y-2">
                  <li class="flex items-center gap-2">
                    <span class="text-red-400">&bull;</span>
                    <span>Infiltrate under cover as Spies or Hitmen past security</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-red-400">&bull;</span>
                    <span>Access 6 secret terminals across the facility to gather override codes</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-red-400">&bull;</span>
                    <span>Breach EGC Core Control and disable reactor safety protocols</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-red-400">&bull;</span>
                    <span>Superheat core past 1,000,000 K to 3,000,000 K for catastrophic detonation</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-red-400">&bull;</span>
                    <span>Commanded by banished Supreme Council Warlords & impeached Overseers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 28 ROLES DATABASE -->
      <section id="roles" class="py-16 border-b border-slate-800/80">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span class="text-xs font-mono uppercase tracking-widest text-cyan-400">Personnel Dossier</span>
              <h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1">
                All 28 Specialized Roles
              </h2>
              <p class="text-slate-400 text-sm mt-1">
                Explore the complete roster categorized across 9 functional departments.
              </p>
            </div>

            <!-- Side Selector -->
            <div class="flex items-center gap-2 bg-facility-900 p-1 rounded-xl border border-slate-800 font-mono text-xs">
              <button
                @click="roleSideFilter = 'All'"
                :class="['px-3 py-1.5 rounded-lg transition-all', roleSideFilter === 'All' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white']"
              >
                All Sides ({{ siteData.roles.length }})
              </button>
              <button
                @click="roleSideFilter = 'Facility'"
                :class="['px-3 py-1.5 rounded-lg transition-all', roleSideFilter === 'Facility' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' : 'text-slate-400 hover:text-white']"
              >
                Facility ({{ siteData.roles.filter(r => r.side === 'Facility').length }})
              </button>
              <button
                @click="roleSideFilter = 'Rebellion'"
                :class="['px-3 py-1.5 rounded-lg transition-all', roleSideFilter === 'Rebellion' ? 'bg-red-500/20 text-red-300 font-bold border border-red-500/40' : 'text-slate-400 hover:text-white']"
              >
                Rebellion ({{ siteData.roles.filter(r => r.side === 'Rebellion').length }})
              </button>
              <button
                @click="roleSideFilter = 'Neutral'"
                :class="['px-3 py-1.5 rounded-lg transition-all', roleSideFilter === 'Neutral' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-400 hover:text-white']"
              >
                Neutral ({{ siteData.roles.filter(r => r.side === 'Neutral').length }})
              </button>
            </div>
          </div>

          <!-- Category filter buttons & Search Bar -->
          <div class="space-y-4 mb-8">
            <div class="flex flex-wrap items-center gap-2 font-mono text-xs">
              <button
                v-for="cat in roleCategories"
                :key="cat"
                @click="selectedRoleCategory = cat"
                :class="[
                  'px-3 py-1.5 rounded-lg transition-all',
                  selectedRoleCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                    : 'bg-facility-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                ]"
              >
                {{ cat }}
              </button>
            </div>

            <div class="relative w-full max-w-md">
              <input
                v-model="roleSearchQuery"
                type="text"
                placeholder="Filter roles by name, equipment, keycard..."
                class="w-full px-4 py-2.5 bg-facility-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <!-- Roles Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              v-for="role in filteredRoles"
              :key="role.id"
              :class="[
                'rounded-xl p-5 flex flex-col justify-between transition-all duration-300',
                role.side === 'Rebellion' ? 'rebel-card' : 'tactical-card'
              ]"
            >
              <div>
                <!-- Top Badges -->
                <div class="flex items-center justify-between gap-2 mb-3">
                  <span class="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                    {{ role.category }}
                  </span>
                  <div class="flex items-center gap-1.5">
                    <span
                      v-if="role.hasLaunchKeycard"
                      class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      title="Authorized to initiate nuclear launch sequences"
                    >
                      🚀 Launch Card
                    </span>
                    <span
                      class="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                      :class="[
                        role.clearanceLevel.includes('Level 6') ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                        role.clearanceLevel.includes('Level 5') ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' :
                        role.clearanceLevel.includes('Level 4') ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                        role.clearanceLevel.includes('Level 3') ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                        role.clearanceLevel.includes('Rebel') ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                        'bg-slate-800 text-slate-400 border border-slate-700'
                      ]"
                    >
                      {{ role.clearanceLevel }}
                    </span>
                  </div>
                </div>

                <!-- Role Name -->
                <h3 class="text-xl font-display font-bold text-white flex items-center justify-between">
                  <span>{{ role.name }}</span>
                  <span v-if="role.isPaid" class="text-xs font-mono text-amber-400 font-semibold">
                    {{ role.costRobux }} R$
                  </span>
                  <span v-else class="text-xs font-mono text-emerald-400">
                    Free
                  </span>
                </h3>

                <!-- Purpose -->
                <p class="text-xs text-slate-300 mt-2 font-medium leading-relaxed">
                  {{ role.purpose }}
                </p>

                <!-- Spawn & Responsibilities -->
                <div class="mt-4 space-y-2 text-xs font-mono text-slate-400">
                  <div class="flex items-start gap-1.5">
                    <span class="text-slate-500 font-semibold">SPAWN:</span>
                    <span class="text-slate-300">{{ role.spawnLocation }}</span>
                  </div>

                  <div class="pt-2 border-t border-slate-800/80">
                    <span class="text-slate-500 font-semibold block mb-1">DUTIES:</span>
                    <ul class="space-y-1 text-slate-300">
                      <li v-for="(duty, idx) in role.responsibilities.slice(0, 3)" :key="idx" class="flex items-start gap-1.5">
                        <span class="text-cyan-400 shrink-0">&bull;</span>
                        <span class="line-clamp-1">{{ duty }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Bottom Equipment & Lore Mirror -->
              <div class="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                <div v-if="role.equipment && role.equipment.length" class="text-slate-400 truncate max-w-[200px]">
                  <span class="text-slate-500">GEAR:</span> {{ role.equipment.join(', ') }}
                </div>
                <div v-if="role.mirrorRole" class="text-slate-400">
                  <span class="text-slate-500">MIRROR:</span>
                  <span class="text-cyan-300 ml-1">{{ role.mirrorRole }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- INTERACTIVE REACTOR & MELTDOWN SIMULATOR -->
      <section id="reactor" class="py-16 bg-facility-900/60 border-b border-slate-800/80 relative overflow-hidden">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-mono uppercase tracking-widest text-rose-400">Reactor Core Diagnostics</span>
            <h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1">
              Reactor & Meltdown Mechanics
            </h2>
            <p class="text-slate-400 text-sm mt-2">
              The reactor is NBTF's central mechanic. Manipulate temperature telemetry below to inspect core states from normal operation to catastrophic meltdown.
            </p>
          </div>

          <!-- Interactive Simulator Console -->
          <div class="tactical-card rounded-2xl p-6 sm:p-8 border-cyan-500/40 max-w-4xl mx-auto">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 font-mono text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :class="simStatusDotClass"></span>
                <span class="font-bold text-white">EGC CORE SYSTEM TELEMETRY</span>
              </div>
              <div class="flex items-center gap-4 text-slate-400">
                <span>SAFETY INTERLOCK: <strong :class="safetyOverrideActive ? 'text-red-400' : 'text-emerald-400'">{{ safetyOverrideActive ? 'BYPASSED' : 'ACTIVE' }}</strong></span>
                <span>OVERRIDE CODES: <strong class="text-cyan-400">{{ collectedFragments }}/6</strong></span>
              </div>
            </div>

            <!-- Gauges & Core Visualizer -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 items-center">
              <!-- Animated Core Chamber -->
              <div class="relative w-full aspect-square max-w-[280px] mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-500" :class="coreBorderClass">
                <!-- Rotating core rings -->
                <div class="absolute inset-4 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow pointer-events-none"></div>
                <div class="absolute inset-10 rounded-full border border-dashed border-red-400/30 animate-spin-slow pointer-events-none" style="animation-direction: reverse;"></div>

                <!-- Plasma Core -->
                <div
                  class="rounded-full transition-all duration-300 blur-sm"
                  :style="{
                    width: `${Math.min(180, Math.max(60, (simTemperature / 3000000) * 160 + 50))}px`,
                    height: `${Math.min(180, Math.max(60, (simTemperature / 3000000) * 160 + 50))}px`,
                    backgroundColor: coreGlowColor,
                    boxShadow: `0 0 50px ${coreGlowColor}`
                  }"
                ></div>

                <div class="relative z-10 text-center font-mono">
                  <div class="text-[10px] uppercase text-slate-300 font-bold tracking-wider">CORE TEMP</div>
                  <div class="text-xl sm:text-2xl font-bold font-display text-white">
                    {{ simTemperature.toLocaleString() }} K
                  </div>
                  <div class="text-[10px] font-bold mt-1" :class="coreStatusTextClass">
                    {{ coreStateLabel }}
                  </div>
                </div>
              </div>

              <!-- Controls & Metrics -->
              <div class="space-y-5 font-mono">
                <div>
                  <div class="flex justify-between text-xs text-slate-300 mb-1">
                    <span>THERMAL LOAD</span>
                    <span class="text-cyan-300">{{ ((simTemperature / 3000000) * 100).toFixed(1) }}% CRITICAL</span>
                  </div>
                  <div class="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      class="h-full transition-all duration-300 rounded-full"
                      :class="progressFillClass"
                      :style="{ width: `${Math.min(100, (simTemperature / 3000000) * 100)}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Manual Heating / Cooling controls -->
                <div class="grid grid-cols-2 gap-3">
                  <button
                    @click="coolReactor"
                    class="py-2.5 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <span>❄ Cool Core</span>
                  </button>
                  <button
                    @click="heatReactor"
                    class="py-2.5 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <span>🔥 Heat Core</span>
                  </button>
                </div>

                <!-- Rebel Sabotage Toggle -->
                <div class="p-3 rounded-xl bg-facility-850 border border-slate-800 text-xs flex items-center justify-between">
                  <div>
                    <span class="font-bold text-white block">Safety Override Interlock</span>
                    <span class="text-[11px] text-slate-400">Requires 6 terminal fragments</span>
                  </div>
                  <button
                    @click="toggleOverride"
                    :class="[
                      'px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all',
                      safetyOverrideActive ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(230,57,70,0.5)]' : 'bg-slate-800 text-slate-300 hover:text-white'
                    ]"
                  >
                    {{ safetyOverrideActive ? 'OVERRIDDEN' : 'BYPASS (Sabotage)' }}
                  </button>
                </div>

                <!-- Meltdown countdown if active -->
                <div v-if="simTemperature >= 3000000" class="p-3 rounded-xl bg-red-950/80 border border-red-500 text-center animate-pulse text-red-300">
                  <span class="font-bold text-sm block tracking-wider">⚠ 180-SECOND COUNTDOWN ENGAGED ⚠</span>
                  <span class="text-xs">CATASTROPHIC BLAST IMMINENT — EVACUATE FACILITY</span>
                </div>
              </div>
            </div>

            <!-- Meltdown Sequence Explainer -->
            <div class="mt-8 pt-6 border-t border-slate-800/80">
              <h4 class="font-display font-bold text-sm text-white uppercase tracking-wider mb-3">
                The 6-Step Rebel Core Sabotage Sequence:
              </h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[11px] font-mono text-slate-400">
                <div class="p-2.5 rounded bg-facility-850 border border-slate-800">
                  <strong class="text-cyan-400 block mb-0.5">1. Terminals</strong>
                  Locate 6 terminals across facility
                </div>
                <div class="p-2.5 rounded bg-facility-850 border border-slate-800">
                  <strong class="text-cyan-400 block mb-0.5">2. Codes</strong>
                  Decrypt code fragments
                </div>
                <div class="p-2.5 rounded bg-facility-850 border border-slate-800">
                  <strong class="text-cyan-400 block mb-0.5">3. EGC Breach</strong>
                  Infiltrate Core Control
                </div>
                <div class="p-2.5 rounded bg-facility-850 border border-slate-800">
                  <strong class="text-cyan-400 block mb-0.5">4. Bypass</strong>
                  Disable safety protocols
                </div>
                <div class="p-2.5 rounded bg-facility-850 border border-slate-800">
                  <strong class="text-amber-400 block mb-0.5">5. 1,000,000 K</strong>
                  Level 5 emergency triggered
                </div>
                <div class="p-2.5 rounded bg-facility-850 border border-slate-800">
                  <strong class="text-red-400 block mb-0.5">6. 3,000,000 K</strong>
                  180s countdown to blast
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- KEYCARD CLEARANCE MATRIX -->
      <section id="keycards" class="py-16 border-b border-slate-800/80">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan-400">Access Control</span>
            <h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1">
              Keycard Clearance Hierarchy
            </h2>
            <p class="text-slate-400 text-sm mt-2">
              Your role determines where you can physically go. Access control connects all departments.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div class="tactical-card p-4 rounded-xl border-purple-500/40">
              <span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold uppercase">Level 6</span>
              <h4 class="text-sm font-bold text-white mt-2">Facility Director</h4>
              <p class="text-slate-400 text-[11px] mt-1">Unrestricted facility-wide access, executive offices, broadcast studio, master teleporter, core room.</p>
            </div>
            <div class="tactical-card p-4 rounded-xl border-indigo-500/40">
              <span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold uppercase">Level 5</span>
              <h4 class="text-sm font-bold text-white mt-2">Council Executive</h4>
              <p class="text-slate-400 text-[11px] mt-1">Supreme Council executive suites, weapons chamber, launch consoles, high-level administrative sectors.</p>
            </div>
            <div class="tactical-card p-4 rounded-xl border-blue-500/40">
              <span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase">Level 4</span>
              <h4 class="text-sm font-bold text-white mt-2">Government / Mil Officers / STF</h4>
              <p class="text-slate-400 text-[11px] mt-1">Strategic Command Center (SCC), military armories, security supervisors, internal security command.</p>
            </div>
            <div class="tactical-card p-4 rounded-xl border-cyan-500/40">
              <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold uppercase">Level 3</span>
              <h4 class="text-sm font-bold text-white mt-2">Engineers / Scientists / Soldiers</h4>
              <p class="text-slate-400 text-[11px] mt-1">EGC Core Room, Weapons Research, Barracks, Hospital, Maintenance, standard perimeter checkpoints.</p>
            </div>
            <div class="tactical-card p-4 rounded-xl border-emerald-500/40">
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">Level 2</span>
              <h4 class="text-sm font-bold text-white mt-2">Logistics & Factory</h4>
              <p class="text-slate-400 text-[11px] mt-1">Receiving Department, cargo loading bays, logistics checkpoints, exterior transport corridors.</p>
            </div>
            <div class="tactical-card p-4 rounded-xl border-amber-500/40">
              <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">Level 1</span>
              <h4 class="text-sm font-bold text-white mt-2">Volunteers & Disguised Operatives</h4>
              <p class="text-slate-400 text-[11px] mt-1">Basic public corridors, volunteer stations, civilian boundary buffer zones.</p>
            </div>
            <div class="rebel-card p-4 rounded-xl border-red-500/40">
              <span class="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold uppercase">Rebel Card</span>
              <h4 class="text-sm font-bold text-white mt-2">Sharlach Resistance</h4>
              <p class="text-slate-400 text-[11px] mt-1">Rebel base hideout, hidden cave, rebel gas station, hacked bypass doors.</p>
            </div>
            <div class="tactical-card p-4 rounded-xl border-amber-400/40">
              <span class="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold uppercase">🚀 Launch Keycard</span>
              <h4 class="text-sm font-bold text-white mt-2">Nuclear Authorization</h4>
              <p class="text-slate-400 text-[11px] mt-1">Required for launching nukes. Held by Rocket Scientists, Core Engineers, Directors, Council & Officers.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FACILITY LOCATIONS -->
      <section id="locations" class="py-16 bg-facility-950/60 border-b border-slate-800/80">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan-400">Tactical Map</span>
            <h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1">
              Main Facility Locations
            </h2>
            <p class="text-slate-400 text-sm mt-2">
              Explore key infrastructure sectors, control centers, and staging bases.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              v-for="loc in siteData.locations"
              :key="loc.id"
              class="tactical-card p-5 rounded-xl flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                  <span class="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
                    {{ loc.category }}
                  </span>
                  <span class="text-slate-400">Clearance: <strong class="text-white">{{ loc.clearanceRequired }}</strong></span>
                </div>

                <h3 class="text-lg font-display font-bold text-white">{{ loc.name }}</h3>
                <p class="text-xs text-slate-300 mt-2 leading-relaxed">{{ loc.description }}</p>

                <div class="mt-4 pt-3 border-t border-slate-800 font-mono text-xs space-y-1.5">
                  <div class="text-slate-400">
                    <span class="text-slate-500 font-semibold">KEY FEATURES:</span> {{ loc.keyFeatures.join(' • ') }}
                  </div>
                </div>
              </div>

              <div class="mt-3 pt-2 text-[11px] font-mono text-cyan-400/90">
                <span class="text-slate-500">OPERATING PERSONNEL:</span> {{ loc.associatedRoles.join(', ') }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- LORE & ROLE MIRRORS -->
      <section id="lore" class="py-16 border-b border-slate-800/80">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-mono uppercase tracking-widest text-indigo-400">Faction Lore</span>
            <h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1">
              Lore & The Role Mirror System
            </h2>
            <p class="text-slate-400 text-sm mt-2">
              Many Facility positions have direct ideological and tactical rebel counterparts.
            </p>
          </div>

          <div class="tactical-card rounded-2xl p-6 sm:p-8 border-indigo-500/30 max-w-4xl mx-auto mb-8">
            <h3 class="text-xl font-display font-bold text-white uppercase mb-2">The Pyrowh — Sharlach Conflict</h3>
            <p class="text-slate-300 text-sm leading-relaxed">
              {{ siteData.loreOverview.backstory }}
            </p>
          </div>

          <!-- Role Mirror Table -->
          <div class="overflow-x-auto tactical-card rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto">
            <table class="w-full text-left font-mono text-xs">
              <thead>
                <tr class="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th class="pb-3 text-cyan-400">Facility Role</th>
                  <th class="pb-3 text-red-400">Rebellion Mirror</th>
                  <th class="pb-3 text-slate-300">Lore Relationship & Connection</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/80">
                <tr v-for="(mirror, idx) in siteData.loreOverview.roleMirrors" :key="idx" class="hover:bg-facility-850/50">
                  <td class="py-3 pr-4 font-bold text-cyan-300 whitespace-nowrap">{{ mirror.facility }}</td>
                  <td class="py-3 pr-4 font-bold text-red-400 whitespace-nowrap">{{ mirror.rebel }}</td>
                  <td class="py-3 text-slate-300 leading-relaxed">{{ mirror.notes }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- GAMEPASSES & PAID ROLES GUIDE -->
      <section id="gamepasses" class="py-16 bg-facility-950/60 border-b border-slate-800/80">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-mono uppercase tracking-widest text-amber-400">Robux Store Reference</span>
            <h2 class="text-3xl sm:text-4xl font-display font-black text-white uppercase mt-1">
              Paid Teams & Gamepasses Guide
            </h2>
            <p class="text-slate-400 text-sm mt-2">
              Historical and reference pricing for specialized roles and VIP access.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            <div
              v-for="gp in siteData.gamepasses"
              :key="gp.name"
              class="tactical-card p-4 rounded-xl flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="font-bold text-white text-sm">{{ gp.name }}</span>
                  <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    {{ gp.robux }} Robux
                  </span>
                </div>
                <span class="text-slate-400 text-[11px] block mb-1">TEAM: {{ gp.role }}</span>
                <p class="text-slate-300 text-[11px] leading-relaxed">{{ gp.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER WITH DISCLAIMER -->
    <footer class="border-t border-slate-800 bg-facility-950 py-10">
      <div class="container mx-auto px-4 max-w-6xl space-y-6">
        <!-- Prominent Disclaimer Box -->
        <div class="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 text-xs font-mono flex items-start gap-3">
          <div class="p-1.5 rounded bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div class="space-y-1">
            <p class="font-bold tracking-wide uppercase text-amber-300">DISCLAIMER & DOMAIN OWNERSHIP NOTICE</p>
            <p>⚠ NBTF.CA is a second-level domain owned by cbx.nz — it may or may not be directly affiliated with NBTF or its developer.</p>
            <p class="text-amber-400/80">NBTF.ca is connected via Cloudflare, domain owned by cbx.nz who also owns cbx.kiwi.</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {{ new Date().getFullYear() }} Nuclear Blast Testing Facility Operations Dossier.
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <a href="https://index.nbtf.ca" class="hover:text-cyan-400 transition-colors">Directory (index.nbtf.ca)</a>
            <span class="text-slate-700">&bull;</span>
            <a href="https://cbx.kiwi" target="_blank" class="hover:text-cyan-400 transition-colors">Maintainer (cbx.kiwi)</a>
            <span class="text-slate-700">&bull;</span>
            <a href="https://adminpanel.nbtf.ca" class="hover:text-cyan-400 transition-colors">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { defaultWwwData, type WwwSiteData } from '~/data/defaultGameData'

const { data: response } = await useFetch<{ success: boolean; data: WwwSiteData }>('/api/content')
const siteData = ref<WwwSiteData>(response.value?.data || defaultWwwData)

// Filters
const selectedRoleCategory = ref('All')
const roleSideFilter = ref('All')
const roleSearchQuery = ref('')

const roleCategories = [
  'All',
  'Executive',
  'Government',
  'Scientist',
  'Military',
  'Security',
  'Safety',
  'Logistics',
  'Rebellion',
  'Neutral'
]

const filteredRoles = computed(() => {
  if (!siteData.value?.roles) return []
  const query = roleSearchQuery.value.trim().toLowerCase()
  const cat = selectedRoleCategory.value
  const side = roleSideFilter.value

  return siteData.value.roles.filter(role => {
    const matchesCat = cat === 'All' || role.category === cat
    const matchesSide = side === 'All' || role.side === side
    const matchesQuery = !query || (
      role.name.toLowerCase().includes(query) ||
      role.purpose.toLowerCase().includes(query) ||
      role.clearanceLevel.toLowerCase().includes(query) ||
      role.spawnLocation.toLowerCase().includes(query) ||
      role.equipment?.some(e => e.toLowerCase().includes(query)) ||
      role.responsibilities?.some(r => r.toLowerCase().includes(query))
    )
    return matchesCat && matchesSide && matchesQuery
  })
})

// Simulator reactive state
const simTemperature = ref(300) // 300 K nominal
const safetyOverrideActive = ref(false)
const collectedFragments = ref(0)

const coolReactor = () => {
  simTemperature.value = Math.max(100, simTemperature.value - 250000)
}

const heatReactor = () => {
  if (!safetyOverrideActive.value && simTemperature.value >= 900000) {
    // Safety system caps temperature unless overridden
    alert('SAFETY PROTOCOL ENGAGED: Reactor cannot exceed 900,000 K without terminal override codes!')
    return
  }
  simTemperature.value = Math.min(3200000, simTemperature.value + 350000)
}

const toggleOverride = () => {
  if (!safetyOverrideActive.value) {
    collectedFragments.value = 6
    safetyOverrideActive.value = true
  } else {
    safetyOverrideActive.value = false
    collectedFragments.value = 0
  }
}

// Visual classes for reactor
const coreStateLabel = computed(() => {
  if (simTemperature.value >= 3000000) return 'MELTDOWN ENGAGED'
  if (simTemperature.value >= 1000000) return 'COMPROMISED (LEVEL 5)'
  if (simTemperature.value >= 600000) return 'SUPERHEATING'
  return 'STABLE (FUSION NOMINAL)'
})

const coreGlowColor = computed(() => {
  if (simTemperature.value >= 3000000) return 'rgba(255, 42, 95, 0.9)'
  if (simTemperature.value >= 1000000) return 'rgba(255, 183, 3, 0.85)'
  if (simTemperature.value >= 600000) return 'rgba(157, 78, 221, 0.8)'
  return 'rgba(0, 240, 255, 0.7)'
})

const coreBorderClass = computed(() => {
  if (simTemperature.value >= 3000000) return 'border-red-500 shadow-[0_0_50px_rgba(255,42,95,0.6)]'
  if (simTemperature.value >= 1000000) return 'border-amber-500 shadow-[0_0_40px_rgba(255,183,3,0.5)]'
  return 'border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.2)]'
})

const coreStatusTextClass = computed(() => {
  if (simTemperature.value >= 3000000) return 'text-red-400 animate-pulse'
  if (simTemperature.value >= 1000000) return 'text-amber-400'
  return 'text-cyan-300'
})

const progressFillClass = computed(() => {
  if (simTemperature.value >= 3000000) return 'bg-gradient-to-r from-amber-500 to-red-600 animate-pulse'
  if (simTemperature.value >= 1000000) return 'bg-gradient-to-r from-cyan-500 to-amber-500'
  return 'bg-gradient-to-r from-cyan-500 to-teal-400'
})

const simStatusDotClass = computed(() => {
  if (simTemperature.value >= 3000000) return 'bg-red-400 animate-ping'
  if (simTemperature.value >= 1000000) return 'bg-amber-400 animate-pulse'
  return 'bg-emerald-400'
})

// Top Banner Styling
const alertThemeClass = computed(() => {
  const level = siteData.value?.bannerAlert?.level
  if (level === 'LEVEL 5 EMERGENCY') return 'bg-red-950/80 border-red-500/50 text-red-200'
  if (level === 'DEFCON 2' || level === 'DEFCON 3') return 'bg-amber-950/80 border-amber-500/50 text-amber-200'
  return 'bg-cyan-950/80 border-cyan-500/40 text-cyan-200'
})

const alertBadgeClass = computed(() => {
  const level = siteData.value?.bannerAlert?.level
  if (level === 'LEVEL 5 EMERGENCY') return 'bg-red-500/20 text-red-300 border-red-500/50'
  if (level === 'DEFCON 2' || level === 'DEFCON 3') return 'bg-amber-500/20 text-amber-300 border-amber-500/50'
  return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
})

const alertDotClass = computed(() => {
  const level = siteData.value?.bannerAlert?.level
  if (level === 'LEVEL 5 EMERGENCY') return 'bg-red-400'
  if (level === 'DEFCON 2' || level === 'DEFCON 3') return 'bg-amber-400'
  return 'bg-cyan-400'
})
</script>
