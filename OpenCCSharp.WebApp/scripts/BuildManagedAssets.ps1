$ErrorActionPreference = "Stop"

$ProjectDir = (Resolve-Path $PSScriptRoot/..).Path
$ProjectManagedAssetsDir = (mkdir "$ProjectDir/managed" -Force).FullName
$ManagedProjectDir = (Resolve-Path $PSScriptRoot/../../OpenCCSharp.WebApp.Managed).Path

Push-Location $ManagedProjectDir
dotnet publish --configuration Release
if ($LASTEXITCODE) {
    Write-Error "Last external command returned $LASTEXITCODE"
}
Pop-Location

Write-Output $ManagedProjectDir
Get-ChildItem $ManagedProjectDir/bin
Copy-Item $ManagedProjectDir/bin/dotnet.* $ProjectManagedAssetsDir/ -Force
