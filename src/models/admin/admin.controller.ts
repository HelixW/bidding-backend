import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { Token, Admin } from '../../shared/types/admin.model'
import { LoginInput, CreatedUser } from './dto/register.dto'
import { ErrorResponse } from '../../shared/dto/error.dto'
import { AdminService } from './admin.service'
import { AccessToken } from './dto/login.dto'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /*
   * registerAdmin adds a new admin user after validating input
   * and checking if the user already exists
   */
  @ApiBody({ type: LoginInput })
  @ApiCreatedResponse({
    description: 'Admin created successfully',
    type: CreatedUser,
  })
  @ApiBadRequestResponse({
    description: 'Invalid format for email or password',
    type: ErrorResponse,
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
  @ApiBody({ type: LoginInput })
  @ApiOkResponse({
    description: 'Successful admin login',
    type: AccessToken,
  })
  @ApiBadRequestResponse({
    description: 'Invalid format for email or password',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized login',
    type: ErrorResponse,
  })
  @Post('login')
  @HttpCode(200)
  loginAdmin(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<Token> {
    return this.adminService.loginAdmin(email, password)
  }
}
