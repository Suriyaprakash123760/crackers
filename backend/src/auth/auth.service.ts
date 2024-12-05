import { Injectable,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { v4 as uuidv4 } from 'uuid';  // Import UUID



import * as bcrypt from 'bcrypt';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
// import { Types } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password, confirmPassword, phoneNumber, address } = signUpDto;
    
        if (password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await this.userModel.create({
            name,
            email,
            phoneNumber,
            address,
            password: hashedPassword,
            role: 'user',
            uuid: uuidv4()  // Add UUID
        });
    
        const token = this.jwtService.sign({ id: user._id, role: user.role });
        return { token };
    }
    



    async login(loginDto: LoginDto): Promise<{ message: string; token?: string; redirectUrl?: string }> {
        const { email, password } = loginDto;
    
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        const token = this.jwtService.sign({ id: user._id, role: user.role });
        const redirectUrl = user.role === 'admin' ? '/dashboard' : '/';
    
        return { message: 'Login successful', token, redirectUrl };
    }
    
    
    async getAllUsers() {
        return this.userModel.find().select('-password');
    }

    async deleteUser(id: string) {
        const result = await this.userModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return { message: 'User deleted successfully' };
    }



    async getUserById(id: string): Promise<User> {
        try {
            const user = await this.userModel.findById(id).select('-password');
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        } catch (error) {
            console.error(`Error finding user with ID ${id}:`, error.message);
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
    

    async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
        const user = await this.userModel.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
    
        const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
        user.password = hashedPassword;
        await user.save();
    
        return { message: 'Password updated successfully' };
      }

      async updateUser(id: string, updateUserDto: SignUpDto) {
        const user = await this.userModel.findById(id);
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
      
        // Update the user's data with the new values
        const updatedUser = await this.userModel.findByIdAndUpdate(
          id,
          {
            name: updateUserDto.name || user.name,
            email: updateUserDto.email || user.email,
            phoneNumber: updateUserDto.phoneNumber || user.phoneNumber,
            address: updateUserDto.address || user.address,
            password: updateUserDto.password ? await bcrypt.hash(updateUserDto.password, 10) : user.password,
            confirmPassword: undefined,  // Don't store confirmPassword
          },
          { new: true },  // Return the updated document
        );
      
        // Return the updated user without the password field
        return { message: 'User updated successfully', user: updatedUser.toObject({ versionKey: false, transform: true }) };
      }
      

}



