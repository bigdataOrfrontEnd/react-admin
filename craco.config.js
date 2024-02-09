// 通过 craco插件 修改create-react-app 创建的脚手架webpack
const path = require("path");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
module.exports = {
  // webpack 配置
  webpack: {
    alias: {
      // 约定
      "@": path.resolve(__dirname, "src"),
    },
    // plugins: [
    //   new ModuleFederationPlugin({
    //     name: "admin-react",
    //     remotes: {}, //可选，表示作为 Host 时，去消费哪些 Remote；
    //     shared: {
    //       react: {
    //         eager: true,
    //         import: "react", // the "react" package will be used a provided and fallback module
    //         shareKey: "react", // under this name the shared module will be placed in the share scope
    //         shareScope: "default", // share scope with this name will be used
    //         singleton: true, // only a single version of the shared module is allowed
    //       },
    //       "react-dom": {
    //         eager: true,
    //         singleton: true, // only a single version of the shared module is allowed
    //       },
    //     },
    //   }),
    // ],
  },
};
