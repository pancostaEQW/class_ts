interface IItems {
    id: number;
    parent: number | string;
    type?: string | null;
}

const items: IItems[] = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

class TreeStore {
    items: IItems[];
    constructor(items: IItems[]) {
        this.items = items
    }
    getAll() {
        return items
    }
    getItem(id: number) {
        return items[id-1] ? items[id-1] : []
    }
    getChildren(id: number) {
        let arr: [] = [];
        for (let i: number = 0; i < items.length; i++) {
            const a = items[i] as never
            id == items[i].parent ? arr.push(a) : []
        };
        return arr
    }
    getAllChildren(id: number) {
        let arr: [] = [];
        for (let i: number = 0; i < items.length; i++) {
            const a = items[i] as never
            id == items[i].parent ? arr.push(a) : [];
            items[i].parent > id ? arr.push(a) : [];
        };
        return arr
    }
    getAllParents(id: number) {
        let arr: [] = [];
        for (let i: number = id-1; 0 < i; i--) { 
            const a = items[i] as never;
            const aId = items[id] as never
            if(items[id].parent === items[0].parent) arr.push(aId)
            if(items[i].parent !== items[i-1].parent) arr.push(a)
        };
        return [...arr, items[0]]
    }
}

const ts = new TreeStore(items);
console.log(ts.getAllParents(4))