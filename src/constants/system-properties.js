import { UserRole } from '../models/user.roles';

export const SYSTEM = {
    AUTH: {
        ADMIN: {
            DEFAULT: {
                NAME: 'Default administrator',
                ID: 'admin',
                PASSWORD: 'admin',
                EMAIL: 'admin@admin.com',
                ROLE: UserRole.DEFAULT_ADMINISTRATOR
            }
        }
    }
}