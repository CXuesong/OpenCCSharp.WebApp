using System.Text.Json.Serialization;
using DotNetJS;
using Microsoft.JSInterop;
using OpenCCSharp.Presets;

namespace OpenCCSharp.WebApp.Managed;

public static class Program
{

    public static void Main()
    {
        JS.Runtime.ConfigureJson(options =>
            options.Converters.Add(new JsonStringEnumConverter())
        );
    }

    [JSInvokable]
    public static async Task<string> ConvertStringVariant(string str, ChineseConversionVariant fromVariant, ChineseConversionVariant toVariant)
    {
        var converter = await ChineseConversionPresets.GetConverterAsync(fromVariant, toVariant);
        return converter.Convert(str);
    }

}