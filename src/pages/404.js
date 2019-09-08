import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const NotFoundPage = () => (
  <Layout>
    <SEO title="Not found" />
    <h1 className="font-black font-header">NOT FOUND</h1>
    <p>Nothing of interest here, I probably deleted this post.</p>
  </Layout>
)

export default NotFoundPage
