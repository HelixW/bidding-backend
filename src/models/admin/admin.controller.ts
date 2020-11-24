import { Body, Controller, Post } from '@nestjs/common'
import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  registerAdmin(@Body('email') email: string): string {
    return this.adminService.registerAdmin(email)
  }
}
