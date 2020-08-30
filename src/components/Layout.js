// @flow
import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header'

import type { Node } from 'react'

type Props = { children: Node }

const Layout = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <div className="w-full">
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteDescription={data.site.siteMetadata.description}
      />
      <div className="container mx-auto px-5 mt-5">
        <main>{children}</main>
        <footer className="flex flex-col items-center text-xs text-gray-600 py-3">
          <div className="flex mr-3">
            <FooterLink to="https://github.com/xbili">GitHub</FooterLink>
            <FooterLink to="https://www.linkedin.com/in/xbili/">
              LinkedIn
            </FooterLink>
            <FooterLink to="https://twitter.com/_xbili">Twitter</FooterLink>
          </div>
          <p>© {new Date().getFullYear()}, Bili Xu</p>
        </footer>
      </div>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <OutboundLink
      href={to}
      className="flex mx-1 text-blue-800 hover:text-blue-600"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </OutboundLink>
  )
}

export default Layout
