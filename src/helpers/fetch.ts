import { D } from '@mobily/ts-belt'
import ky, { type Options } from 'ky'

export const get = (url: string, options?: Options) => {
	const JWToken = localStorage.getItem('JWToken')

	return ky.get(
		'http://localhost:3010/' + url,
		D.merge(
			{
				headers: {
					Authorization: JWToken ? `Bearer ${JWToken}` : '',
				},
			},
			options,
		),
	)
}

export const post = (url: string, options?: Options) => {
	const JWToken = localStorage.getItem('JWToken')

	return ky.post(
		'http://localhost:3010/' + url,
		D.merge(
			{
				headers: {
					Authorization: JWToken ? `Bearer ${JWToken}` : '',
				},
			},
			options,
		),
	)
}
