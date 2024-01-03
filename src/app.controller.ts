import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  protectedRoute(@Req() req: any) {
    const user = req.user; // Access user information from the request

    // Your logic here using the user information
    return { message: 'Protected route accessed', user };
  }

  @UseGuards(AuthGuard('local'))
  @Get('bye')
  getBye(): string {
    return 'bye';
  }
}
