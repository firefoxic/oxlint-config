import { readFile } from 'node:fs/promises';
import path from "node:path"
import {
	a,
	b,
} from "./clean.ts"

export function sample (name: string): string {
	const dir = path.dirname(name)
	var file = 'file'
	let o = { 'key': readFile }

	return `${dir}/${file}/${a}/${b}/${String(o)}`
}
