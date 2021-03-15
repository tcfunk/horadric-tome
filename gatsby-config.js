const contentfulAccessToken = `_wL2eDfreu96pIHk-54XOS6e8QVzW3Dxb6r4FrNzX3o`
const contentfulPreviewToken = `-A2wMO09ksj5ZSdyslVL09Jxzap3V8WKkiyokyoN6uw`

module.exports = {
  siteMetadata: {
    title: "Horadric Tome",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "@chakra-ui/gatsby-plugin",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: `827uy2pit5gz`,
        accessToken: contentfulAccessToken,
        downloadLocal: true,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
