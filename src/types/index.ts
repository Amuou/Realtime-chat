export type TMessage = {
	text: string
	authorId: string
	createdAt: number
}

export type TUser = {
	id: number
	name: string
	avatar: string
}

export type TChannel = {
	id: number
	name: string
	members: TUser[]
	messages: TMessage[]
	image: string
}
