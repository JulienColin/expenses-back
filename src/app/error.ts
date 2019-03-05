export default class Error {
    public code: number;
    public label: string;

    constructor(code: number, label: string) {
        this.code = code;
        this.label = label;
    }

    public print(): void {
        console.error(`Error ${this.code} : ${this.label}`);
    }
}
