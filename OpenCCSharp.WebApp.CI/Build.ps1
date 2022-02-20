param (
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
cd $WebAppRoot

yarn install --frozen-lockfile
CheckLastExitCode

yarn lint
CheckLastExitCode

yarn build-managed
CheckLastExitCode

yarn build-prod
CheckLastExitCode

# Prepare for GitHub pages
Copy-Item -Recurse $WebAppRoot/dist $OutputDir
# Allow files prefixed with underscore.
New-Item $OutputDir/.nojekyll -ItemType File
