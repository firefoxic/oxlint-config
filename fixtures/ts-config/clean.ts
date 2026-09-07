import path from "node:path"

export const a = 1
export const b = 2

/**
 * Join a name with its directory.
 *
 * @param name - File name.
 * @returns The joined path.
 */
export function clean (name: string): string {
	let dir = path.dirname(name)

	return path.join(dir, name)
}
