export class Review {
    public creatorId: string;
    public timestamp: Date;
    public text: string;
    public ratings: object;

    constructor(creatorId: string, timestamp: Date, text: string, ratings: object) {
        this.creatorId = creatorId;
        this.timestamp = timestamp;
        this.text = text;
        this.ratings = ratings;
    }
}