"use client";

import { useState } from "react";
import { Dropdown } from "@/components/dropdown";
import { DEFAULT_LANGUAGE, type Language } from "@/lib/languages";

export function LanguageSwitcher({ languages }: { languages: Language[] }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  return (
    <Dropdown
      label="Language"
      options={languages}
      value={language}
      onChange={setLanguage}
    />
  );
}
