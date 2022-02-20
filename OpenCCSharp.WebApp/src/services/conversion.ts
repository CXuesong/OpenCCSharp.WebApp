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

export type ChineseConversionVariant = "Hans" | "Hant" | "Hani" | "HK" | "TW";

export async function convertVariant(str: string, from: ChineseConversionVariant, to: ChineseConversionVariant): Promise<string> {
  await ensureInitialized();
  const { OpenCCSharp } = await import("managed/dotnet");
  return await OpenCCSharp.WebApp.Managed.ConvertStringVariant(str, from, to);
}

export async function getManagedLibVersions(): Promise<Record<string, string>> {
  await ensureInitialized();
  const { OpenCCSharp } = await import("managed/dotnet");
  return OpenCCSharp.WebApp.Managed.GetVersionNumbers();
}
