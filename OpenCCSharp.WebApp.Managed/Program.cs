using System.Reflection;
using System.Text.Json.Serialization;
using DotNetJS;
using Microsoft.JSInterop;
using OpenCCSharp.Conversion;
using OpenCCSharp.Presets;

namespace OpenCCSharp.WebApp.Managed;

public static class Program
{

    private static (ChineseConversionVariant FromVariant, ChineseConversionVariant ToVariant, ScriptConverterBase Converter) converterCache;

    public static void Main()
    {
    }

    [JSInvokable]
    public static Dictionary<string, string> GetVersionNumbers()
    {
        var versions = new Dictionary<string, string>();

        void AddVersion(Assembly assembly)
        {
            versions.Add(assembly.GetName().Name!, assembly.GetName().Version!.ToString());
        }

        AddVersion(typeof(object).Assembly);
        AddVersion(typeof(Program).Assembly);
        // OpenCCSharp.Conversion
        AddVersion(typeof(ScriptConverter).Assembly);
        // OpenCCSharp.Presets
        AddVersion(typeof(ChineseConversionPresets).Assembly);

        return versions;
    }

    [JSInvokable]
    public static bool IsConversionSupported(string fromVariant, string toVariant)
    {
        return ChineseConversionPresets.IsConversionSupported(
            Enum.Parse<ChineseConversionVariant>(fromVariant),
            Enum.Parse<ChineseConversionVariant>(toVariant)
        );
    }

    [JSInvokable]
    public static async Task<string?> TryConvertStringVariant(string str, string fromVariant, string toVariant)
    {
        var fv = Enum.Parse<ChineseConversionVariant>(fromVariant);
        var tv = Enum.Parse<ChineseConversionVariant>(toVariant);
        if (!ChineseConversionPresets.IsConversionSupported(fv, tv)) return null;

        ScriptConverterBase conv;
        if (converterCache.FromVariant == fv && converterCache.ToVariant == tv)
        {
            conv = converterCache.Converter;
        }
        else
        {
            conv = await ChineseConversionPresets.GetConverterAsync(fv, tv);
            converterCache = (fv, tv, conv);
        }
        return conv.Convert(str);
    }

}
