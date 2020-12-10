/*
 * CreatedUser is the response DTO for successful admin creation
 */
export class CreatedUser {
  email: string
  verified: boolean
}

/*
 * LoginInput is the request DTO for admin registration and login
 */
export class LoginInput {
  email: string
  password: string
}
