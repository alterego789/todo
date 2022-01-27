import * as React from 'react';

export const Json = ({ object }: { object: any }) => {
	return <pre>{JSON.stringify(object, null, '  ')}</pre>
}