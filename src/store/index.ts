import { ActionContext } from 'vuex'

import { AuthUser, SessionState } from '../types/api/auth'
import { NuxtContext } from '../types/vue'

export const state = (): SessionState => ({
  authUser: undefined
})

export const mutations = {
  setAuthUser: (state: SessionState, user: AuthUser) => {
    state.authUser = user
  }
}

export const actions = {
  nuxtServerInit: (
    ctx: ActionContext<SessionState, any>,
    nuxtCtx: NuxtContext<any, any, SessionState>
  ) => {
    if (nuxtCtx.req.session && nuxtCtx.req.session.authUser) {
      // SSR時点でログイン済みの場合、SPA認証チェック用にvueのstoreにauth情報を設定する
      ctx.commit('setAuthUser', nuxtCtx.req.session.authUser)
    } else {
      // sessionに認証情報がないときは、storeの認証情報もクリアする
      ctx.commit('setAuthUser', null)
    }
  }
}
