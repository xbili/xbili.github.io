// @flow
import React from 'react'
import { Link } from 'gatsby'

import Whale from './Whale'

type Props = { siteTitle: string, siteDescription: string }

const Header = ({ siteTitle, siteDescription }: Props) => (
  <header className="w-full bg-blue-900">
    <div className="container mx-auto px-5 py-5 md:py-12">
      <div className="flex flex-col">
        <h1 className="text-4xl md:text-6xl font-black font-header">
          <Link
            to="/"
            className="text-gray-100 hover:text-gray-400 no-underline"
          >
            {siteTitle}
          </Link>
        </h1>
        <div>
          <h1 className="font-light text-gray-100">
            Thoughts by <span className="font-black">Bili Xu</span>
          </h1>
        </div>
      </div>
    </div>
  </header>
)

Header.defaultProps = {
  siteTitle: ``,
  siteDescription: ``,
}

export default Header
