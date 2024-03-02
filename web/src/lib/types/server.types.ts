// This is a generic type
export type ActionResponse<Response> = {
  status: 'success' | 'fail' | 'error'
  statusCode: number
  message: string
  ok: boolean
  data?: Response
}
