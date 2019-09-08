// @flow
import moment from 'moment'

export function truncateExcerpt(excerpt: string) {
  const defaultLinkPos = excerpt.indexOf('Continue reading')
  if (defaultLinkPos < 0) {
    return excerpt
  }

  return excerpt.substring(0, defaultLinkPos)
}

export function formatDate(date: string) {
  return moment(date).format('MMMM D, YYYY')
}
