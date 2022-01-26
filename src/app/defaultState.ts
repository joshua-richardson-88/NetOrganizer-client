// types
import type { Bookmarks } from '../features/bookmarks/bookmarkSlice'
import type { Categories } from '../features/categories/categorySlice'
import type { Tabs } from '../features/tabs/tabSlice'
import type { Tags } from '../features/tags/tagSlice'

const defaultState: DefaultState = {
  bookmarks: {
    DKyjFYuL91foRVJEJ1fOE: {
      activity: [{ what: 'Default bookmark created', when: Date.now() }],
      notes: 'Nothing to see here',
      tags: ['tPTSc4JU1GcL1HOsXLcQI'],
      title: 'Google',
      url: 'https://www.google.com',
    },
    '63Jj0KYQRo5TbZNLgsioQ': {
      activity: [{ what: 'Default bookmark created', when: Date.now() }],
      notes: 'Nothing to see here',
      tags: ['tPTSc4JU1GcL1HOsXLcQI'],
      title: 'Twitter',
      url: 'https://www.twitter.com',
    },
    aHsNjObKsj5iPBM5YmdlI: {
      activity: [{ what: 'Default bookmark created', when: Date.now() }],
      notes: 'Nothing to see here',
      tags: ['tPTSc4JU1GcL1HOsXLcQI'],
      title: 'Facebook',
      url: 'https://www.facebook.com',
    },
    dvZitoNftXKfy5M2nFy53: {
      activity: [{ what: 'Default bookmark created', when: Date.now() }],
      notes: 'Nothing to see here',
      tags: ['tPTSc4JU1GcL1HOsXLcQI'],
      title: 'Bing',
      url: 'https://www.bing.com',
    },
    dP3tl0jpYcrBVz5Thxe7D: {
      activity: [{ what: 'Default bookmark created', when: Date.now() }],
      notes: 'Nothing to see here',
      tags: ['tPTSc4JU1GcL1HOsXLcQI'],
      title: 'DuckDuckGo',
      url: 'https://www.duckduckgo.com',
    },
    v9BSBpxvLJu6CAxhl8M03: {
      activity: [{ what: 'Default bookmark created', when: Date.now() }],
      notes: 'Nothing to see here',
      tags: ['tPTSc4JU1GcL1HOsXLcQI'],
      title: 'Apple',
      url: 'https://www.apple.com',
    },
  },
  categories: {
    RATbWnLEiRECERgsum8cW: {
      title: 'Category 1',
      bookmarks: ['DKyjFYuL91foRVJEJ1fOE', '63Jj0KYQRo5TbZNLgsioQ'],
    },
    p1DYO9qs8i5HnlkUgINMr: {
      title: 'Category 2',
      bookmarks: [
        'aHsNjObKsj5iPBM5YmdlI',
        'dvZitoNftXKfy5M2nFy53',
        'dP3tl0jpYcrBVz5Thxe7D',
      ],
    },
    '3SLJ2s0wiKMF4k7cNpPPf': {
      title: 'Category 3',
      bookmarks: ['v9BSBpxvLJu6CAxhl8M03'],
    },
  },
  tabs: {
    list: {
      DGlFYz4bsDgM6xGlCpccj: {
        title: 'Tab 1',
        categories: ['RATbWnLEiRECERgsum8cW', 'p1DYO9qs8i5HnlkUgINMr'],
      },
      '77N08OW2P4f6ZonaGwvDk': {
        title: 'Tab 2',
        categories: ['3SLJ2s0wiKMF4k7cNpPPf'],
      },
    },
    order: ['77N08OW2P4f6ZonaGwvDk', 'DGlFYz4bsDgM6xGlCpccj'],
  },
  tags: {
    tPTSc4JU1GcL1HOsXLcQI: {
      bookmarks: [
        'DKyjFYuL91foRVJEJ1fOE',
        '63Jj0KYQRo5TbZNLgsioQ',
        'aHsNjObKsj5iPBM5YmdlI',
        'dvZitoNftXKfy5M2nFy53',
        'dP3tl0jpYcrBVz5Thxe7D',
        'v9BSBpxvLJu6CAxhl8M03',
      ],
      title: 'Starter',
    },
  },
}
export default defaultState
export interface DefaultState {
  bookmarks: Bookmarks
  categories: Categories
  tabs: Tabs
  tags: Tags
}
