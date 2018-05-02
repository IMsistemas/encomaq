export class UrlApi {
    public url: String;
    constructor() {
        this.url = 'http://localhost:8000/';
    }
    get_url_api(): String {
        return this.url;
    }
}
