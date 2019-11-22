export class Restaurant {
    constructor(public alias: string,
                public name: string,
                public rating: number,
                public categories: Array<object>,
                public imagePath: string,
                public reviewCount: number,
                public transactions: string[],
                public coordinate: object,
                public location: object,
                public phone: string,
                public displayPhone: string) {}
}
