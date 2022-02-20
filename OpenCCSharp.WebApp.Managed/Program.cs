using System.Reflection;
using System.Text.Json.Serialization;
using DotNetJS;
using Microsoft.JSInterop;
using OpenCCSharp.Conversion;
using OpenCCSharp.Presets;

namespace OpenCCSharp.WebApp.Managed;

public static class Program
{

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
    public static async Task<string> ConvertStringVariant(string str, string fromVariant, string toVariant)
    {
        var converter = await ChineseConversionPresets.GetConverterAsync(Enum.Parse<ChineseConversionVariant>(fromVariant), Enum.Parse<ChineseConversionVariant>(toVariant));
        return converter.Convert(str);
    }

}
