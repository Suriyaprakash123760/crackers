import { Body, Controller, Post,Get,Delete,Param,Put } from '@nestjs/common'; // Add 'Post' here
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

// import { ChangePasswordDto } from './dto/change-password.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ message: string; token?: string }> {
        // Here, we assume your service returns a token
        const result = await this.authService.login(loginDto);

        // Customize the response for admin success login
        if (loginDto.email === 'suriya@gmail.com' && loginDto.password === '123') {
            return { message: 'admin login success', token: result.token }; // Admin specific message
        }

        return { message: 'User login success', token: result.token }; // For regular users
    }

    @Get('/accounts')
    getAllUsers() {
        return this.authService.getAllUsers();
    }

    // Delete user by ID
    @Delete('/accounts/:id')
    deleteUser(@Param('id') id: string) {
        return this.authService.deleteUser(id);
    }


    // New route for retrieving a user by ID
    @Get('/accounts/:id')
    getUserById(@Param('id') id: string) {
        return this.authService.getUserById(id);
    }

    @Put('change-password/:id')
    async changePassword(
      @Param('id') id: string,
      @Body() changePasswordDto: ChangePasswordDto,
    ) {
      return this.authService.changePassword(id, changePasswordDto);
    }

    @Put('/update/:id')
async updateUser(
  @Param('id') id: string,
  @Body() updateUserDto: SignUpDto,  // This will use the SignUpDto for validation
) {
  return this.authService.updateUser(id, updateUserDto);
}


}
