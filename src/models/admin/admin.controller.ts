import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { Admin, Token } from '../../common/types/admin.model'
import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /*
   * Register a new admin user after checking if the user
   * already exists
   */
  @Post('register')
  registerAdmin(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<Admin> {
    return this.adminService.registerAdmin(email, password)
  }

  @Post('login')
  @HttpCode(200)
  loginAdmin(@Body('email') email: string): Promise<Token> {
    return this.adminService.loginAdmin(email)
  }
}
