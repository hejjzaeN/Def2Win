import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor (private userService: UserService) {}

    async validateUser (email: string, password: string) {
        const user = this.userService.readByEmail(email)
        if (user && (await user).Password === password) {
            // const {Password, ...result} = user
            return user
        }
        return null
    }
}
