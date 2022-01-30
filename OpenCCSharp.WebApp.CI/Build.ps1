param (
    [string]
    [ValidateSet("Debug", "Release")]
    $Configuration = "Release",
    [string]
    $BaseUri = "/OpenCCSharp.WebApp/",
    [string]
    $OutputDir = "_work/Publish"
)
trap {
    Write-Error $_ -ErrorAction Continue
    Write-Host $_.ScriptStackTrace
    Exit 1
}

$ErrorActionPreference = "Stop"
function CheckLastExitCode {
    if ($LASTEXITCODE) {
        Write-Error "Last command exited with code $LASTEXITCODE"
    }
}

# Assumes $PWD is the repo root
dotnet publish OpenCCSharp.WebApp.sln -c $Configuration -o $OutputDir
CheckLastExitCode

$WWWRoot = (Resolve-Path $OutputDir/wwwroot).Path

# Prepare for GitHub pages
# GitHub does not need br / gz files
# https://github.com/dotnet/aspnetcore/issues/21094
Remove-Item -Recurse $WWWRoot/_framework/*.br
Remove-Item -Recurse $WWWRoot/_framework/*.gz

# Rectify base URI
$IndexContent = Get-Content $WWWRoot/index.html
$IndexContent = $IndexContent.Replace('<base href="/" />', "<base href=`"$BaseUri`" />")
$IndexContent > $WWWRoot/index.html

# Allow files prefixed with underscore.
New-Item $WWWRoot/.nojekyll -ItemType File
