import { RoulesTrigger } from '../../enums/element-ui'

export interface Roules {
  required?: boolean
  message: string
  trigger: RoulesTrigger
  min?: number
  max?: number
}
