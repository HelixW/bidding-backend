import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { Admin, Token } from '../../common/types/admin.model'
import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /*
   * registerAdmin adds a new admin user after validating input
   * and checking if the user already exists
   */
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
  @Post('login')
  @HttpCode(200)
  loginAdmin(@Body('email') email: string): Promise<Token> {
    return this.adminService.loginAdmin(email)
  }
}
