import { NuxtContext } from '~/types/vue'
import { SessionState } from '~/types/api/auth'

/**
 * Vueの認証チェック
 */
export default async function(ctx: NuxtContext<any, any, SessionState>) {
  if (!ctx.store.state.authUser) {
    // ログインの場合、ログインページへ戻す
    return ctx.redirect('/')
  }
  if (ctx.isServer) {
    return
  }
  // clientの認証チェック、sessionが有効かチェックする
  try {
    return await ctx.$axios.get('/api/auth/status')
  } catch (e) {
    ctx.redirect('/')
  }
}
