import { randomUUID } from 'crypto';
// consider lexicographically sorted uuid - to be more DB friendly
export function newUUID() {
    return randomUUID();
}
//# sourceMappingURL=uuid.js.map