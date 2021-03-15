require('dotenv').config()

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
    // {
    //   resolve: "gatsby-source-airtable",
    //   options: {
    //     apiKey: process.env.AIRTABLE_API_KEY,
    //     tables: [
    //       {
    //         baseId: process.env.AIRTABLE_BASE,
    //         tableName: "rune-words",
    //       },
    //       {
    //         baseId: process.env.AIRTABLE_BASE,
    //         tableName: "runes",
    //       }
    //     ]
    //   }
    // }
  ],
};
