// ============================================================
// TRADERS' MINDSET — SITE CONFIGURATION
// ============================================================
// ⚠️  IMPORTANT: Replace all placeholder URLs before going live.
//     Search for "REPLACE_BEFORE_LAUNCH" comments below.
// ============================================================

export const SITE_CONFIG = {
  name: "Traders' Mindset",
  founder: "Robert Rother",
  tagline: "Trade the process. Not the promise.",

  // ----------------------------------------------------------------
  // CALENDLY — REPLACE_BEFORE_LAUNCH
  // Replace with Robert's verified Calendly booking link.
  // This link is displayed only to high-intent qualified visitors.
  // ----------------------------------------------------------------
  calendlyUrl: "https://zeeg.me/nicolas-wagner/lit-day-trading",

  // Set to true once you have replaced the Calendly URL above.
  calendlyConfigured: true,

  // ----------------------------------------------------------------
  // SKOOL COMMUNITY — verified URL from Robert's profile
  // ----------------------------------------------------------------
  skoolUrl:
    "https://www.skool.com/traders-mindset/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=user_profile_page&utm_content=58c95e76a3de492d894e12ab33a1e87e",

  // ----------------------------------------------------------------
  // SOCIAL LINKS — verified from Robert's public profiles
  // ----------------------------------------------------------------
  social: {
    instagram: "https://www.instagram.com/robert__rother/#/",
    x: "https://x.com/robert_rother",
    twitch: "https://www.twitch.tv/robert_rother/clips?range=all",
    skool:
      "https://www.skool.com/traders-mindset/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=user_profile_page&utm_content=58c95e76a3de492d894e12ab33a1e87e",
  },

  // ----------------------------------------------------------------
  // YOUTUBE VSL — verified video ID
  // ----------------------------------------------------------------
  youtubeVideoId: "hxr27ckfOqA",
  youtubeStartSeconds: 1634,

  // ----------------------------------------------------------------
  // SEO
  // ----------------------------------------------------------------
  seo: {
    title: "Traders' Mindset | Risk-First Futures Trading Education",
    description:
      "Real futures trading documented daily. Learn order flow, VWAP and disciplined execution through Robert Rother's transparent, risk-first trading education community.",
  },
} as const;

// ----------------------------------------------------------------
// QUALIFICATION ROUTING LOGIC
// Call this with form answers to determine the visitor's next step.
// ----------------------------------------------------------------
export type QualificationResult = "calendly" | "skool";

export function qualifyVisitor(
  goalAnswer: string,
  capitalAnswer: string
): QualificationResult {
  const isHighIntent =
    goalAnswer === "C" && // "Work towards becoming a professional trader"
    capitalAnswer === "C"; // "$3,000 or more"

  return isHighIntent ? "calendly" : "skool";
}
