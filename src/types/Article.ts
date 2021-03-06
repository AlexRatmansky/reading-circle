export type TextBlock = {
  index?: number
  text: [string]
  author?: string
};

export type FileData = {
  title: string
  month: string
  day: string
  intro: TextBlock
  body: TextBlock[]
  conclusion: TextBlock
};

export type RssItem = {
  title: string
  date: string
  slug: string
  intro: TextBlock
  body: TextBlock[]
  conclusion: TextBlock
};

export type RSSParams = {
  articles: RssItem[]
  lastBuildDate: string
};
