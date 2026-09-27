export type Language = {
  label: string;
  value: string;
};

export const DEFAULT_LANGUAGE = "en";

export const LANGUAGES: Language[] = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
  { label: "Deutsch", value: "de" },
  { label: "日本語", value: "ja" },
];
