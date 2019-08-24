import { mapMutations } from 'vuex'
import { findLast } from 'lodash'

let mediaQueries
if (process.browser) {
    mediaQueries = [
        {
            query: window.matchMedia('(min-width: 640px)'),
            type: 'sm'
        },
        {
            query: window.matchMedia('(min-width: 768px)'),
            type: 'md'
        },
        {
            query: window.matchMedia('(min-width: 1024px)'),
            type: 'lg'
        },
        {
            query: window.matchMedia('(min-width: 1280px)'),
            type: 'xl'
        }
    ]
}

export default {
    data: () => ({
        mediaQueries
    }),
    created () {
        if (process.browser) {
            this.mediaQueries.forEach(item => {
                item.query.addListener(e => {
                    if (e.media === item.query.media) {
                        this.setViewport(item.type)
                    }
                })
            })
        }
    },
    mounted () {
        const match = findLast(this.mediaQueries, query => {
            return query.query.matches
        })

        if (match) {
            this.setViewport(match.type)
            return
        }

        this.setViewport(this.mediaQueries[0].type)
    },
    methods: {
        ...mapMutations({
            setViewport: 'setBreakpoint'
        })
    }
}
