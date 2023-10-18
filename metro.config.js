// // Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
  // resolver: {
  //   sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', "mjs", "cjs"]
  // }
});

// config.resolver.sourceExts.push('mjs', 'cjs')
module.exports = config;

// const { makeMetroConfig } = require("@rnx-kit/metro-config")
// const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks")
// const { getDefaultConfig } = require("metro-config")

// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig()
//   return makeMetroConfig({
//     projectRoot: __dirname,
//     resolver: {
//       resolveRequest: MetroSymlinksResolver(),
//       assetExts: [...defaultConfig.resolver.assetExts, "bin"],
//       sourceExts: [
//         ...defaultConfig.resolver.sourceExts,
//         "mjs",
//       ],
//     },
//   })
// })()