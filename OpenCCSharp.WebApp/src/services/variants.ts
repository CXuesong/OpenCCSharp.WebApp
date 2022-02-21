export const knownVariants = [
  { code: "Hans", name: "简体中文"},
  { code: "Hant", name: "繁体中文（OpenCC标准）"},
  { code: "HK", name: "香港繁体"},
  { code: "TW", name: "台湾正体"},
  { code: "Kyujitai", name: "日语旧字体（OpenCC标准）"},
  { code: "Shinjitai", name: "日语新字体"},
] as const;

export type KnownVariantCode = (typeof knownVariants)[number]["code"];
