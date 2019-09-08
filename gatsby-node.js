const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allWordpressPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  result.data.allWordpressPost.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: node.slug,
      },
    })
  })
}
