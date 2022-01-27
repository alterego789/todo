// TODO: consider to split client -> server / server -> client
export type WSEventType = 
	'change' // fires for hot reload
	| 'item.load' // reques to load single item - also subscribes to item changes on socket
	| 'item.update' // updates single item
	| 'Error.badMessage' // error
;