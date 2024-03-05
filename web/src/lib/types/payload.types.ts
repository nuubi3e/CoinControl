export interface INewUserPayload {
  picture?: string
  username: string
  fullname: string
  emailId: string
  password: string
}

export interface ILoginPayload {
  username: string
  password: string
}
