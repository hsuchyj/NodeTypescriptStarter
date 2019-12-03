export class Review {
    constructor(public timestamp: Date, public text: string, public ratings: object, public creatorId: string) {}
}