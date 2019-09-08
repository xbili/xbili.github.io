// @flow
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PostListItem from '../components/PostListItem'
import { truncateExcerpt, formatDate } from '../utils'

import '../styles/index.css'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allWordpressPost {
        edges {
          node {
            id
            slug
            title
            excerpt
            date
          }
        }
      }
    }
  `)

  const posts = data.allWordpressPost.edges
    .map(item => item.node)
    .map(({ id, title, excerpt, date, slug }) => ({
      id,
      slug,
      title,
      excerpt: truncateExcerpt(excerpt),
      date: formatDate(date),
    }))

  return (
    <Layout>
      <SEO title="Home" />
      {posts.map(({ id, ...post }) => (
        <PostListItem key={id} {...post} />
      ))}
    </Layout>
  )
}

export default IndexPage
