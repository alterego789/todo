import { newUUID } from '../../../lib/uuid.js';
export class UserQueries {
    getUserInfo;
    getActiveUser = async () => {
        return {
            email: 'stuff',
            id: newUUID()
        };
    };
}
//# sourceMappingURL=user.queries.js.map