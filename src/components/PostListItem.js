// @flow
import React from 'react'
import { Link } from 'gatsby'

type Props = {
  slug: string,
  title: string,
  excerpt: string,
  date: string,
}

const PostListItem = ({ slug, title, excerpt, date }: Props) => (
  <div className="my-3 md:my-5">
    <Link to={`/${slug}`} className="no-underline">
      <h2
        className="font-black text-xl md:text-3xl text-gray-800 hover:text-blue-700 font-header"
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </Link>
    <div>
      <div
        className="text-sm text-gray-700"
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
      <span className="text-xs text-gray-700 font-body">{date}</span>
    </div>
  </div>
)

export default PostListItem
