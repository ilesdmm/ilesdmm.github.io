// Edit your public credentials here. Unknown values are deliberately placeholders.
export const portfolioConfig = {
  YEARS_EXPERIENCE: "3+",
  DAILY_AVAILABILITY: "16+ Hrs/Day",
  CLIENT_WORK_VALUE: "$2,000+",
  PROJECT_COUNT: "8+",
  DISCORD_USERNAME: "renolicious",
};

// Add only genuine client feedback. The section stays hidden while this is empty.
export const testimonials: { quote: string; name: string; project: string }[] = [];

export const capabilities = [
  { title: "Gameplay", description: "The mechanics that make your game worth playing.", items: ["Combat", "Bosses & AI", "Weapons & abilities", "Movement", "Vehicles & NPCs", "Round systems"] },
  { title: "Progression", description: "Connected loops that give players a reason to return.", items: ["Levels & EXP", "Rebirths & prestige", "Quests & skill trees", "Achievements", "Daily rewards", "RNG progression"] },
  { title: "Economy", description: "Reliable item, currency, and reward systems.", items: ["Inventories", "Shops & trading", "Loot & RNG", "Currencies", "Rewards"] },
  { title: "Backend", description: "A dependable foundation behind every interaction.", items: ["DataStores & persistence", "Matchmaking", "Leaderboards", "Cross-server systems", "Server validation & anti-exploit", "Networking & remote architecture", "Modular Luau"] },
  { title: "UI & client", description: "From the first custom icon to the final transition.", items: ["UI design & programming", "Advanced tweening", "Animations & viewports", "Dialogue & notifications", "HUDs & menus", "Custom GFX", "Client-side effects"] },
  { title: "Full game systems", description: "Complete frameworks with systems that work together.", items: ["RPGs & roguelikes", "Simulators & tycoons", "Tower defense", "Obbies", "Round-based games", "RNG & progression games"] },
  { title: "Monetization", description: "Purchase flows integrated with your game economy.", items: ["Gamepasses", "Developer products", "Shop systems", "Purchase prompts", "Premium mechanics", "Monetization integration"] },
  { title: "Engineering & polish", description: "The finishing work that makes a build ready to use.", items: ["Optimization & debugging", "Testing", "Codebase integration", "Modular architecture", "Scalable systems", "Server-side security"] },
];
