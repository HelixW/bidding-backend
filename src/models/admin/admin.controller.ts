import { Body, Controller, Post } from '@nestjs/common'
import { Admin } from './admin.model'
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
}
