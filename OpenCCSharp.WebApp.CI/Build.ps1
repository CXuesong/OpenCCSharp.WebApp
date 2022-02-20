param (
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

$RepoRoot = (Resolve-Path $PSScriptRoot/..).Path
$WebAppRoot = "$RepoRoot/OpenCCSharp.WebApp"
$OutputDir = (New-Item -ItemType Directory $OutputDir -Force).FullName

Write-Output "WebAppRoot = $WebAppRoot"
Write-Output "OutputDir = $OutputDir"

cd $WebAppRoot

yarn install --frozen-lockfile
CheckLastExitCode

yarn build-managed
CheckLastExitCode

yarn build-prod
CheckLastExitCode

yarn lint
CheckLastExitCode

# Prepare for GitHub pages
Copy-Item -Recurse $WebAppRoot/dist/* $OutputDir/

# Rectify base URI
$IndexContent = Get-Content $OutputDir/index.html
$IndexContent = $IndexContent.Replace('<base href="/"', "<base href=`"$BaseUri`"")
$IndexContent > $OutputDir/index.html

# Allow files prefixed with underscore.
New-Item $OutputDir/.nojekyll -ItemType File
