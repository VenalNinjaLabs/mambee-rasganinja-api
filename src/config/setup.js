import { User } from '../models/user';
import { UserRole } from '../models/user.roles';

import { SYSTEM } from '../constants';

export function setupDefaultAdminUser() {
    User.findOne({ role: UserRole.DEFAULT_ADMINISTRATOR }).exec()
        .then(user => {
            if(!user) {
                let user = new User({ 
                    name: SYSTEM.AUTH.ADMIN.DEFAULT.NAME,
                    email: SYSTEM.AUTH.ADMIN.DEFAULT.EMAIL,
                    username: SYSTEM.AUTH.ADMIN.DEFAULT.ID,
                    password: SYSTEM.AUTH.ADMIN.DEFAULT.PASSWORD,
                    role: SYSTEM.AUTH.ADMIN.DEFAULT.ROLE
                });
                user.save()
                    .catch(err => setTimeout(setupDefaultAdminUser(), 5000));
            }
        })
        .catch(err => setTimeout(setupDefaultAdminUser(), 5000));
}