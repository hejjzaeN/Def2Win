import { Injectable } from '@nestjs/common';

import { AccessLevel, DBChange } from 'src/const/db.const';

@Injectable()
export class AccessService {

    // TODO: type = dto
    async validate (user: any, id: number) {
        if (user.accessLevel === AccessLevel.OWNER || user.accessLevel === AccessLevel.ADMIN) {
            return DBChange.FULLY_ALLOWED
        }
        if (user.id === id) {
            return DBChange.PARTIALLY_ALLOWED
        }

        return DBChange.FORBIDDEN
    }

}
