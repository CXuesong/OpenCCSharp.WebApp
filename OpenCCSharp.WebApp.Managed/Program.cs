using System.Text.Json.Serialization;
using DotNetJS;
using Microsoft.JSInterop;
using OpenCCSharp.Presets;

namespace OpenCCSharp.WebApp.Managed;

public static class Program
{

    public static void Main()
    {
    }

    [JSInvokable]
    public static async Task<string> ConvertStringVariant(string str, string fromVariant, string toVariant)
    {
        var converter = await ChineseConversionPresets.GetConverterAsync(Enum.Parse<ChineseConversionVariant>(fromVariant), Enum.Parse<ChineseConversionVariant>(toVariant));
        return converter.Convert(str);
    }

}
