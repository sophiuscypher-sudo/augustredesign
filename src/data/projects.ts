import type { Project } from "./types";

/**
 * CLIENT PROJECTS — problems organizations trusted August to solve.
 *
 * Content rules:
 *  - No invented results, metrics, user numbers or testimonials.
 *  - `technologies` only holds verified, named technologies. Empty = to be added.
 *  - `liveUrl` / `overviewUrl` stay null until a legitimate URL is confirmed.
 *  - `outcome` stays null until a real, approved outcome exists.
 */
export const clientProjects: Project[] = [
  {
    name: "Teddy Cabs",
    slug: "teddy-cabs",
    type: "client",
    label: "CLIENT PROJECT",
    category: "Ride-hailing technology platform",
    tagline: "A mobility platform, engineered end to end.",
    description:
      "A ride-hailing technology platform covering mapping, location services, fare calculation, the rider experience and driver systems.",
    challenge:
      "Ride-hailing is a systems problem before it is an interface problem. Riders, drivers, maps and pricing all have to agree with each other in real time.",
    solution:
      "August engineered the platform as connected layers: mapping and location services, a fare calculation engine, a rider experience, driver systems and the backend infrastructure that joins them.",
    experience:
      "Riders work from a map; drivers work from their own system. Both sides sit on one shared mobility infrastructure.",
    technologies: [],
    highlights: [
      "Mapping",
      "Location services",
      "Fare calculation",
      "Rider experience",
      "Driver systems",
      "Mobility infrastructure",
    ],
    capabilities: ["custom-platforms", "mobility"],
    architecture: {
      title: "Teddy Cabs — system architecture",
      caption: "Simplified view of how a trip moves through the platform.",
      nodes: ["Rider", "Maps", "Routing", "Fare Engine", "Backend", "Driver"],
    },
    outcome: null,
    images: [],
    screenshots: [],
    liveUrl: null,
    overviewUrl: null,
    visual: "teddy-cabs",
  },
  {
    name: "SkyPaints",
    slug: "skypaints",
    type: "client",
    label: "CLIENT PROJECT",
    category: "Interactive color experience",
    tagline: "See the color on the home before you commit to it.",
    description:
      "An interactive digital experience for a paint and home-color business, built around a before/after visualization of color on a home.",
    challenge:
      "Choosing a paint color from a small swatch is guesswork. People want to see the color on a real home.",
    solution:
      "August built an interactive before/after visualization into the website, so color choices can be explored visually instead of imagined.",
    experience:
      "Drag across the home to compare before and after, then try another color. The website itself is the showroom.",
    technologies: [],
    highlights: ["Before / after visualization", "Interactive color exploration", "Digital experience design"],
    capabilities: ["digital-experiences", "creative-technology"],
    outcome: null,
    images: [],
    screenshots: [],
    liveUrl: null,
    overviewUrl: null,
    visual: "skypaints",
  },
  {
    name: "Yancy Graphics",
    slug: "yancy-graphics",
    type: "client",
    label: "CLIENT PROJECT",
    category: "Creative technology & digital presence",
    tagline: "Where branding, motion and AI meet advertising.",
    description:
      "Creative technology and digital presence for a graphics, marketing and advertising business.",
    challenge:
      "A creative business has to prove its craft on screen — branding, graphics, motion and advertising in one coherent digital presence.",
    solution:
      "August combined design and technology: branding, graphics, AI marketing video, animation, advertising and digital content, presented through an expressive digital experience.",
    experience:
      "A digital presence that behaves like the work it showcases — layered, animated and expressive.",
    technologies: [],
    highlights: ["Branding", "Graphics", "AI marketing video", "Animation", "Advertising", "Digital content"],
    capabilities: ["creative-technology", "digital-experiences", "ai-intelligence"],
    architecture: {
      title: "Yancy Graphics — creative pipeline",
      caption: "Engineering and creativity in a single production flow.",
      nodes: ["Brand", "Motion", "AI", "Design", "Technology"],
    },
    outcome: null,
    images: [],
    screenshots: [],
    liveUrl: null,
    overviewUrl: null,
    visual: "yancy-graphics",
  },
  {
    name: "Siaya Empowerment Network",
    slug: "siaya-empowerment-network",
    type: "client",
    label: "CLIENT PROJECT",
    category: "Community organization platform",
    tagline: "A digital home for community development.",
    description:
      "A digital platform for an organization focused on community development, communication and impact.",
    challenge:
      "Community organizations need to communicate their work, connect people and make their impact visible — online.",
    solution:
      "August designed and built a digital platform around the organization's mission: community development, communication and impact.",
    experience:
      "A clear, connected digital experience that puts the organization's work and community at the center.",
    technologies: [],
    highlights: ["Community development", "Communication", "Impact", "Digital platform"],
    capabilities: ["custom-platforms", "digital-experiences"],
    outcome: null,
    images: [],
    screenshots: [],
    liveUrl: null,
    overviewUrl: null,
    visual: "siaya",
  },
  {
    name: "Archways Research Firm",
    slug: "archways-research-firm",
    type: "client",
    label: "CLIENT PROJECT",
    category: "Research organization experience",
    tagline: "Research, presented with clarity.",
    description: "A digital experience for a research organization.",
    challenge:
      "Research organizations hold complex work. Their digital presence has to make it understandable and credible.",
    solution:
      "August designed a digital experience built around the organization's research identity — structured, precise and clear.",
    experience: "A calm, structured experience where research and information take center stage.",
    technologies: [],
    highlights: ["Digital experience", "Information design", "Research presentation"],
    capabilities: ["digital-experiences"],
    outcome: null,
    images: [],
    screenshots: [],
    liveUrl: null,
    overviewUrl: null,
    visual: "archways",
  },
  {
    name: "Azma Yetu CBO",
    slug: "azma-yetu-cbo",
    type: "client",
    label: "CLIENT PROJECT",
    category: "Digital presence & organizational platform",
    tagline: "An organization, online and organized.",
    description: "A digital presence and organizational platform for a community-based organization.",
    challenge:
      "A community-based organization needs a dependable digital presence that works on the devices its community actually uses.",
    solution:
      "August built a digital presence and organizational platform that gives the organization a clear home online.",
    experience: "A simple, readable platform for the organization, its programs and its community.",
    technologies: [],
    highlights: ["Digital presence", "Organizational platform", "Mobile-ready experience"],
    capabilities: ["custom-platforms", "digital-experiences"],
    outcome: null,
    images: [],
    screenshots: [],
    liveUrl: null,
    overviewUrl: null,
    visual: "azma-yetu",
  },
];

/**
 * AUGUST PRODUCTS — technology August conceives, designs and builds itself.
 * These are never presented as client work.
 */
export const augustProducts: Project[] = [
  {
    name: "Brownfleet",
    slug: "brownfleet",
    type: "product",
    label: "AUGUST PRODUCT",
    category: "Fleet management & operational intelligence",
    tagline: "Fleet intelligence for modern operations.",
    description:
      "Brownfleet is an August-built fleet telematics platform engineered in Nairobi for East Africa's roads — delivering real-time GPS tracking, fuel-theft alerts and driver analytics from the Northern Corridor to the last mile.",
    challenge:
      "Heavy commercial logistics across Kenya encounter fuel siphoning, harsh braking hazards along the Great Rift Valley escarpment, and severe administrative overhead across cross-border transit corridors.",
    solution:
      "August engineered Brownfleet with live GPS corridor tracking, ultrasonic fuel tank telemetry, 24/7 Nairobi control room synchronization, and driver scorecard intelligence.",
    experience:
      "One operating view of the fleet, with the detail one click away: vehicles, drivers, maintenance and analytics.",
    technologies: [],
    highlights: [
      "Fleet dashboard",
      "Vehicles",
      "Drivers",
      "Maintenance",
      "Analytics",
      "Operational intelligence",
      "Monitoring",
    ],
    capabilities: ["business-systems", "mobility", "ai-intelligence"],
    architecture: {
      title: "Brownfleet — operational flow",
      caption: "Conceptual view of how fleet information becomes decisions.",
      nodes: ["Vehicles", "Monitoring", "Fleet Dashboard", "Maintenance", "Analytics"],
    },
    outcome: null,
    images: [],
    screenshots: [],
    liveUrl: null,
    overviewUrl: null,
    visual: "brownfleet",
  },
  {
    name: "MADIS POS",
    slug: "madis-pos",
    type: "product",
    label: "AUGUST PRODUCT",
    category: "Point-of-sale & business management",
    tagline: "A connected operating system for modern businesses.",
    description:
      "MADIS POS is an August-built, multi-platform synchronized point-of-sale and business management system with analytics and AI capabilities.",
    challenge:
      "Businesses run sales, stock and reporting in disconnected tools, often on unreliable connections.",
    solution:
      "One synchronized system across platforms — POS, inventory, analytics and AI connected to the business itself, designed to keep working when the network does not.",
    experience:
      "Sell on any platform, see stock and sales stay in sync, and read the business through analytics and AI.",
    technologies: ["Daraja API (M-Pesa)"],
    highlights: [
      "Multi-platform operation",
      "Synchronization",
      "Multiple business types",
      "Analytics",
      "AI",
      "Inventory",
      "Sales",
      "Business intelligence",
      "Offline-first operation",
      "M-Pesa settlement",
    ],
    capabilities: ["business-systems", "commerce", "ai-intelligence"],
    architecture: {
      title: "MADIS — synchronized architecture",
      caption: "How a sale on any platform becomes business intelligence.",
      nodes: ["POS", "Cloud", "Inventory", "Analytics", "AI"],
    },
    outcome: null,
    images: [],
    screenshots: [],
    liveUrl: null,
    overviewUrl: null,
    visual: "madis-pos",
    note: "Offline-first operation and M-Pesa (Daraja) settlement come from August's own previously published description of MADIS POS.",
  },
  {
    name: "Raiden Grid",
    slug: "raiden-grid",
    type: "product",
    label: "AUGUST PRODUCT",
    category: "EV infrastructure & power technology",
    tagline: "Find the charge. Find the power.",
    description:
      "Raiden Grid is an August-built EV infrastructure and power-technology platform that helps EV users discover charging options and relevant EV power components.",
    challenge:
      "EV owners need to know where they can charge and which power components suit their vehicle — information that is hard to find in one place.",
    solution:
      "A platform that connects EV users to recommended charging infrastructure and relevant EV power components.",
    experience:
      "Discover charging options and the right power components through an energy and mobility network view.",
    technologies: [],
    highlights: ["Charging discovery", "Recommended infrastructure", "EV power components", "Energy network view"],
    capabilities: ["mobility", "custom-platforms"],
    architecture: {
      title: "Raiden Grid — discovery flow",
      caption: "Conceptual view of how an EV user is matched to charging and power.",
      nodes: ["EV User", "Discovery", "Charging Options", "Power Components", "Grid"],
    },
    outcome: null,
    images: [],
    screenshots: [],
    liveUrl: null,
    overviewUrl: null,
    visual: "raiden-grid",
    note: "Classified as an AUGUST PRODUCT / initiative. The previous August website did not list Raiden Grid as client work; it is conceived and developed by August.",
  },
];

export const allProjects: Project[] = [...clientProjects, ...augustProducts];

export const getProject = (slug: string): Project | undefined =>
  allProjects.find((p) => p.slug === slug);
