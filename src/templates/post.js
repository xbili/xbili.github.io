// @flow
import React from 'react'
import { graphql } from 'gatsby'
import he from 'he'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { formatDate } from '../utils'

type Props = {
  data: {
    wordpressPost: {
      title: string,
      content: string,
      date: string,
    },
  },
}

const PostPage = ({ data }: Props) => {
  const { title, content, date } = data.wordpressPost

  return (
    <Layout>
      <SEO title={he.decode(title)} />
      <div>
        <h1
          className="font-black font-header text-2xl md:text-4xl text-gray-800 mb-1"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="text-sm text-gray-600 mb-5">{formatDate(date)}</p>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String) {
    wordpressPost(slug: { eq: $slug }) {
      id
      slug
      title
      content
      date
    }
  }
`

export default PostPage
