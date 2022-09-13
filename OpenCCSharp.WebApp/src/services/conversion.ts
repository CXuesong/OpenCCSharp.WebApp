let bootPromise: Promise<void> | undefined;

export async function ensureInitialized() {
  const { boot, getBootStatus, BootStatus } = await import("managed/dotnet");
  switch (getBootStatus()) {
    case BootStatus.Standby:
      return bootPromise = (async () => {
        try {
          await boot();
        } finally {
          bootPromise = undefined;
        }
      })();
    case BootStatus.Booted:
      return;
    default:
      return bootPromise!;
  }
}

export type ChineseConversionVariant = "Hans" | "Hant" | "HK" | "TW" | "Kyujitai" | "Shinjitai";

export async function convertVariant(str: string, from: ChineseConversionVariant, to: ChineseConversionVariant): Promise<string> {
  await ensureInitialized();
  const { OpenCCSharp } = await import("managed/dotnet");
  const result = await OpenCCSharp.WebApp.Managed.TryConvertStringVariant(str, from, to);
  if (result == null) throw new Error(`指定的转换对不受支持：${from} -> ${to}。`);
  return result;
}

export async function isVariantConversionSupported(from: ChineseConversionVariant, to: ChineseConversionVariant): Promise<boolean> {
  await ensureInitialized();
  const { OpenCCSharp } = await import("managed/dotnet");
  return OpenCCSharp.WebApp.Managed.IsConversionSupported(from, to);
}

export async function getManagedLibVersions(): Promise<Record<string, string>> {
  await ensureInitialized();
  const { OpenCCSharp } = await import("managed/dotnet");
  // HACK Dictionary<> is incorrectedly mapped to Map<> (should be Record).
  return OpenCCSharp.WebApp.Managed.GetVersionNumbers() as unknown as Record<string, string>;
}
