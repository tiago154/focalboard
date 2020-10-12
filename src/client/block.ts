import { IBlock, IProperty } from "./octoTypes"
import { Utils } from "./utils"

class Block implements IBlock {
	id: string = Utils.createGuid()
	parentId: string
	type: string
	title: string
	icon?: string
	url?: string
	order: number
	properties: IProperty[] = []
	createAt: number = Date.now()
	updateAt: number = 0
	deleteAt: number = 0

	static duplicate(block: IBlock) {
		const now = Date.now()

		const newBlock = new Block(block)
		newBlock.id = Utils.createGuid()
		newBlock.title = `Copy of ${block.title}`
		newBlock.createAt = now
		newBlock.updateAt = now
		newBlock.deleteAt = 0

		return newBlock
	}

	constructor(block: any = {}) {
		const now = Date.now()

		this.id = block.id || Utils.createGuid()
		this.parentId = block.parentId
		this.type = block.type
		this.title = block.title
		this.icon = block.icon
		this.url = block.url
		this.order = block.order
		this.properties = block.properties ? block.properties.map((o: IProperty) => ({...o})) : []		// Deep clone
		this.createAt = block.createAt || now
		this.updateAt = block.updateAt || now
		this.deleteAt = block.deleteAt || 0
	}

	static getPropertyValue(block: IBlock, id: string): string | undefined {
		if (!block.properties) { return undefined }
		const property = block.properties.find( o => o.id === id )
		if (!property) { return undefined }
		return property.value
	}

	static setProperty(block: IBlock, id: string, value?: string) {
		if (!block.properties) { block.properties = [] }
		if (!value) {
			// Remove property
			block.properties = block.properties.filter( o => o.id !== id )
			return
		}

		const property = block.properties.find( o => o.id === id )
		if (property) {
			property.value = value
		} else {
			const newProperty: IProperty = { id, value }
			block.properties.push(newProperty)
		}
	}
}

export { Block }