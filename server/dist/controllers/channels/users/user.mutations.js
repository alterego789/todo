import { newUUID } from '../../../lib/uuid.js';
export class UserMutations {
    register;
    login = async () => {
        return {
            email: 'stuff',
            id: newUUID()
        };
    };
    logout;
}
//# sourceMappingURL=user.mutations.js.map