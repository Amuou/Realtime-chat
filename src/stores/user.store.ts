import { writable } from 'svelte/store'

import type { TChannel, TUser } from '$types'

export const currentUser = writable<TUser | null>(null)

export const channels = writable<TChannel[]>([])
