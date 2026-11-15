const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'node_modules/@react-native-community/cli-platform-ios/node_modules/@react-native-community/cli-platform-apple/build/commands/runCommand/runOnSimulator.js',
  'node_modules/@react-native-community/cli-platform-apple/build/commands/runCommand/runOnSimulator.js',
];

const target = `_child_process().default.execFileSync('open', [\`\${activeDeveloperDir}/Applications/Simulator.app\`, '--args', '-CurrentDeviceUDID', simulator.udid]);`;

const replacement = `// [patch Xcode 27] Xcode 27 thay Simulator.app bằng DeviceHub.app ở Contents/Applications
  const simulatorAppCandidates = [\`\${activeDeveloperDir}/Applications/Simulator.app\`, \`\${activeDeveloperDir}/../Applications/Simulator.app\`, \`\${activeDeveloperDir}/../Applications/DeviceHub.app\`];
  const simulatorApp = simulatorAppCandidates.find(candidate => require('fs').existsSync(candidate));
  if (simulatorApp) {
    _child_process().default.execFileSync('open', [simulatorApp, '--args', '-CurrentDeviceUDID', simulator.udid]);
  } else {
    _cliTools().logger.warn('Simulator.app not found in Xcode, skipping opening the simulator UI.');
  }`;

for (const relPath of filesToPatch) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes(target)) {
      fs.writeFileSync(fullPath, content.replace(target, replacement), 'utf8');
      console.log(`✅ [patch-xcode27] Đã vá ${relPath}`);
    }
  }
}

