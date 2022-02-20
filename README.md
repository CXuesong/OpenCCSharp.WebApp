# OpenCC# WebApp

Serverless Single Page Application for Chinese text variant conversion: https://cxuesong.github.io/OpenCCSharp.WebApp/

This web app is powered by [OpenCC#](https://github.com/CXuesong/OpenCCSharp) and [DotNetJS](https://github.com/Elringus/DotNetJS), and targets modern browsers with WASM support.

## Prerequisite

* Node 16 LTS
* Yarn v1
* .NET Core SDK 6.0

## Build

```powershell
# /OpenCCSharp.WebApp/ is the repo root
# Prepare developement environment
/OpenCCSharp.WebApp/OpenCCSharp.WebApp> yarn
/OpenCCSharp.WebApp/OpenCCSharp.WebApp> yarn build-managed
# Start local development server
/OpenCCSharp.WebApp/OpenCCSharp.WebApp> yarn start
# Build SPA with `yarn build` or `yarn build-prod`
/OpenCCSharp.WebApp/OpenCCSharp.WebApp> yarn build
```

## Feedback

If you have any comments or suggestions regarding to the text variant conversion app itself, please raise an issue to this repo.

If you have any suggestion to the conversion dictionary and/or rules, please double-confirm on [the official OpenCC website hosted by BYVoid](https://opencc.byvoid.com/) before raising an issue / PR to [BYVoid/OpenCC](https://github.com/BYVoid/OpenCC). This web app uses the equivalent conversion rules to the official OpenCC library.



