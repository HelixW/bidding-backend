export class CreatedUser {
  email: string
  verified: boolean
}

export class ValidationError {
  error: string
  message: string
  detail: string
}

export class RegistrationInput {
  email: string
  password: string
}
