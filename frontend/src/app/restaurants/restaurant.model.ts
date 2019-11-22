export class Restaurant {
    constructor(public alias: string,
                public name: string,
                public rating: number,
                public categories: Array<object>,
                public image_url: string,
                public review_count: number,
                public transactions: string[],
                public coordinates: object,
                public location: object,
                public phone: string,
                public display_phone: string) {}
}
