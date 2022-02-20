export const knownVariants = [
  { code: "Hans", name: "简体中文"},
  { code: "Hant", name: "繁体中文（OpenCC标准）"},
  { code: "Hani", name: "日语新字体"},
  { code: "HK", name: "香港繁体"},
  { code: "TW", name: "台湾正体"},
] as const;

export type KnownVariantCode = (typeof knownVariants)[number]["code"];
