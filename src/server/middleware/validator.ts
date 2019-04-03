import { Response, NextFunction } from 'express'
import moment from 'moment'

import { Request } from '../../types/express'
import { DateFormat } from '../../utils/datetimeUtils'

const isBool = ({ val }: Item) => {
  if (val === undefined) {
    return true
  }
  const type = typeof val
  return type === 'boolean'
}

const isNumber = ({ val }: Item) => {
  if (val === undefined) {
    return true
  }
  return !Number.isNaN(Number(val))
}

const isRequired = ({ val }: Item) => {
  return val !== undefined
}

const isOneOf = ({ val, enums }: Item) => {
  return val === undefined || enums === undefined || enums.includes(val)
}

const isDate = ({ val, dateFormat }: Item) => {
  if (val === undefined) {
    return true
  }
  const date = moment(val, dateFormat, true)
  return date && date.isValid()
}

interface Item {
  val?: any
  enums?: string[]
  dateFormat?: string
}

export class ValidatorItem {
  private readonly itemName: string
  private readonly validators: Array<(item: Item) => boolean>
  private enums: any[]
  private dateFormat: DateFormat
  private defaultVal: string | undefined

  constructor(itemName: string) {
    this.itemName = itemName
    this.validators = []
    this.enums = []
    this.dateFormat = DateFormat.DATE
    this.defaultVal = undefined
  }

  public required() {
    this.validators.push(isRequired)
    return this
  }

  public number() {
    this.validators.push(isNumber)
    return this
  }

  public bool() {
    this.validators.push(isBool)
    return this
  }

  public date(format: DateFormat) {
    if (format) {
      this.dateFormat = format
    }
    this.validators.push(isDate)
    return this
  }

  public oneOf(enums: any[]) {
    this.enums = enums
    this.validators.push(isOneOf)
    return this
  }

  public defaultValue(val: string) {
    this.defaultVal = val
    return this
  }

  public getItemName() {
    return this.itemName
  }

  public getValidators() {
    return this.validators
  }

  public getEnums() {
    return this.enums
  }

  public getDateFormat() {
    return this.dateFormat
  }

  public getDefaultValue() {
    return this.defaultVal
  }
}

export default function(items: ValidatorItem[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!items || !items.length) {
      next()
      return
    }
    try {
      items.forEach((item: any) => {
        const data =
          req.query[item.getItemName()] ||
          req.body[item.getItemName()] ||
          req.params[item.getItemName()]

        if (!data) {
          return
        }

        item.getValidators().forEach((validator: any) => {
          if (
            !validator({
              val: data,
              enums: item.getEnums(),
              dateFormat: item.getDateFormat()
            })
          ) {
            throw new Error(
              `invalidParameter. name:${item.getItemName()} validator:${
                validator.name
              } value:${data}`
            )
          }
        })
        if (item.getDefaultValue() !== undefined) {
          if (req.query[item.getItemName()] === undefined) {
            req.query[item.getItemName()] = item.getDefaultValue()
          } else if (req.body[item.getItemName()] === undefined) {
            req.body[item.getItemName()] = item.getDefaultValue()
          }
        }
      })
    } catch (e) {
      res.sendStatus(400)
      return
    }
    next()
  }
}
