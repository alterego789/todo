import { BaseChannel } from "./base-channel.js";
export class TodoItemQueries {
    getItems = async (id) => {
        return [];
    };
}
export class TodoItemMutations {
    addItem = async (todoItem) => {
        return todoItem;
    };
    remvoeItem = async (itemId) => {
        return itemId;
    };
}
export class Items extends BaseChannel {
    query;
    mutation;
    event;
    name = 'items';
}
//# sourceMappingURL=items.js.map