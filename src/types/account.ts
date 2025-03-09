export interface AccountLabel {
  text: string
}

export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
  id: string
  labels: AccountLabel[] | string
  type: AccountType
  login: string
  password: string | null
}

export interface AccountFormValidation {
  login: boolean
  password: boolean
}

export interface AccountErrors {
  [key: string]: {
    login: boolean
    password: boolean
  }
}
