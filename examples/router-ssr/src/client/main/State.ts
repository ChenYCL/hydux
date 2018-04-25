import _app, { Cmd, Init, Context, dt, Dt, never } from '../../../../../src/index'
import { ActionsType } from '../../../../../src/types'
import withRouter, {
  mkLink, History, HashHistory, BrowserHistory,
  RouterActions, RouterState, Routes, MemoryHistory,
  NestedRoutes, RouteComp
} from '../../../../../src/enhancers/router'
import * as _Counter from '../counter'
import * as Utils from '../utils'
// const history = new HashHistory()
export const history = new BrowserHistory()

export const actions = {
  counter: null as any as _Counter.Actions,
}

export type Page =
| 'Home'
| 'Counter'
| { page: 'User', id: number }
| '404'

let initState = {
  counter: null as any as _Counter.State,
  page: 'Home' as Page,
  lazyComps: {
    Counter: undefined as typeof _Counter | void,
  }
}

initState = (global as any).__INIT_STATE__ || initState

export type State = typeof initState

export const init: Init<State, Actions> = () => {
  return {
    ...initState,
    lazyComps: {} as any
  }
}

export type Actions = typeof actions

export const routes: NestedRoutes<State, Actions> = {
  path: '/',
  action: loc => state => ({
    ...state,
    page: 'Home'
  }),
  children: [{
    path: '/user/:id',
    action: loc => state => ({
      ...state,
      page: {
        page: 'User',
        id: loc.params.id,
      }
    })
  }, {
    path: '/counter',
    getComponent: (loc): RouteComp<any, any> => {
      if (loc.fromInit && __is_browser) {
        return dt('ssr', {
          key: 'counter',
          comp: require('../counter'),
        })
      } else if (!__is_browser) {
        return dt('normal', {
          key: 'counter',
          comp: require('../counter'),
        })
      } else {
        return dt('dynamic', {
          key: 'counter',
          comp: import('../counter'),
        })
      }
    },
    action: (loc, patch) => state => [({
      ...state,
      page: 'Counter'
    }), Cmd.ofSub(async _ => {
      // if (!state.lazyComps.Counter) {
      //   console.log('runInitCmd', loc.fromInit && __is_browser)
      //   return patch(
      //     'counter',
      //     state.lazyComps.Counter = await import('../counter'),
      //     (loc.fromInit && __is_browser),
      //   )
      // }
    })],
  }, {
    path: '*',
    action: loc => state => ({
      ...state,
      page: '404'
    }),
  }]
}
