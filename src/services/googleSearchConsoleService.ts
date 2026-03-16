/**
 * Mock service for Google Search Console integration.
 * In a real-world scenario, this would use OAuth2 to authenticate
 * and the Google Search Console API to fetch real data.
 */

export interface SearchConsoleData {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topQueries: { query: string; clicks: number; impressions: number }[];
  topPages: { page: string; clicks: number; impressions: number }[];
}

export async function fetchSearchConsoleData(): Promise<SearchConsoleData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock data
  return {
    clicks: 1240,
    impressions: 45000,
    ctr: 2.75,
    position: 12.4,
    topQueries: [
      { query: "ux designer polska", clicks: 450, impressions: 2000 },
      { query: "ai agency warsaw", clicks: 320, impressions: 1500 },
      { query: "projektowanie interfejsów ai", clicks: 120, impressions: 800 },
      { query: "ux audit for saas", clicks: 85, impressions: 600 },
      { query: "katarzyna gierałt ux", clicks: 60, impressions: 200 },
    ],
    topPages: [
      { page: "/", clicks: 600, impressions: 20000 },
      { page: "/portfolio", clicks: 350, impressions: 12000 },
      { page: "/blog/ai-in-ux-2024", clicks: 150, impressions: 5000 },
      { page: "/pricing", clicks: 80, impressions: 3000 },
      { page: "/contact", clicks: 60, impressions: 5000 },
    ]
  };
}
