export interface AuthUser {
  id: number
  username: string
}

export interface SessionState {
  authUser?: AuthUser
}
