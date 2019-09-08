// @flow
import React from 'react'
import { Link } from 'gatsby'

import Whale from './Whale'

type Props = { siteTitle: string, siteDescription: string }

const Header = ({ siteTitle, siteDescription }: Props) => (
  <header className="w-full bg-blue-900 flex justify-center">
    <div className="w-full md:w-1/4 py-5 px-5 md:px-0 flex md:items-center md:justify-between">
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
          <p className="font-light text-gray-100">
            Software Engineer @{' '}
            <a
              className="text-gray-100 hover:text-gray-300"
              href="https://edison.tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edison Software
            </a>
          </p>
        </div>
      </div>
      <div className="hidden md:block w-32 mb-3">
        <Whale />
      </div>
    </div>
  </header>
)

Header.defaultProps = {
  siteTitle: ``,
  siteDescription: ``,
}

export default Header
