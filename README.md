Quick notes for now:

Two parts:
- TVOSApp = swift code
- Tvml = javascript code

## Install swift:
cd TVOSApp
pod install
open TVOSApp.xcodeproj

## Install TVML
```
cd Tvml
(requires nodejs)
npm install -g grunt-cli
npm install
```

## Running
*webpack loader:*
```
cd Tvml
grunt #starts the webpack daemon on port 8080 & livereload on port 8001
```
*test output:*
```
cd Tvml
node testconsole.js
```
*simulator*
start the the tvos app in the simulator
*safari 9*
this allows for remote JS Context debugger in safari
make sure you are on v9 otherwise it will not work

## Configure App
*needs it's own section*
- change App name
- change BundleName
- change Icon
- point to production URL
- set correct Provisioning profile
- set correct Signing authority
- build using xcodebuild or xctool
- spinup simulator from CLI
- install via testflight
