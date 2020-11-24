import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { Token, Admin } from '../../common/types/admin.model'
import { AdminService } from './admin.service'
import {
  RegistrationInput,
  ValidationError,
  CreatedUser,
} from './dto/register.dto'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AccessToken } from './dto/login.dto'

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /*
   * registerAdmin adds a new admin user after validating input
   * and checking if the user already exists
   */
  @ApiBody({ type: RegistrationInput })
  @ApiCreatedResponse({
    description: 'Admin created successfully',
    type: CreatedUser,
  })
  @ApiBadRequestResponse({
    description: 'Invalid format for email or password',
    type: ValidationError,
  })
  @Post('register')
  registerAdmin(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<Admin> {
    return this.adminService.registerAdmin(email, password)
  }

  /*
   * loginAdmin returns an access token (JWT) after
   * validating input, checking if the user is verified and
   * comparing passwords
   */
  @ApiOkResponse({
    description: 'Admin created successfully',
    type: AccessToken,
  })
  @ApiBadRequestResponse({
    description: 'Invalid format for email or password',
    type: ValidationError,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized login',
    type: ValidationError,
  })
  @Post('login')
  @HttpCode(200)
  loginAdmin(@Body('email') email: string): Promise<Token> {
    return this.adminService.loginAdmin(email)
  }
}
