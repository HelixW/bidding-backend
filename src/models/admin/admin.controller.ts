import { Body, Controller, Post } from '@nestjs/common'
import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /*
   * Register a new admin user after checking if the user
   * already exists
   */
  @Post('register')
  registerAdmin(@Body('email') email: string): string {
    return this.adminService.registerAdmin(email)
  }
}
