# What is this?
This repo contains a skeleton to produce new TVOS Apps (typically based on TVML)

It consists of two parts:
- TVOSApp = swift code
- Tvml = javascript code

# Install
*tvos native code*
- You need to have xcode etc... setup to run tvos code (xcode 7+)
- Be sure to open up the xcodeproj
- install cocoapods (you need ruby for that)

```
cd TVOSApp
# Install the pods
pod install
open TVOSApp.xcodeproj
```

*Install TVML*
The tvml build environment depends on nodejs. Make to sure to have it installed (hint: use nvm)

Now install all the dependencies:

```
cd Tvml
# Install the grunt plugin
npm install -g grunt-cli
# Install the necessary packages
npm install
```

# Running
## For Dev purposes
*webpack loader:*
start the webpack dev server
```
cd Tvml
grunt #starts the webpack daemon on port 8080 & livereload on port 8001
```

this will watch your files (make sure to require them) and compile them on the fly

*test output:*
start the testconsole listener for output
```
cd Tvml
node testconsole.js #opens up a socket.io server on 8002
```

*simulator*
start the the tvos app in the simulator

*safari 9*
this allows for remote JS Context debugger in safari
make sure you are on v9 otherwise it will not work

# Prepare the app for production
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
