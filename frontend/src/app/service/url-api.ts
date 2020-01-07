export class UrlApi {
    public url: String;
    constructor() {
        // this.url = 'https://api-v1-encomaq.apps-developing.com/';
        this.url = 'http://localhost:8000/';
    }
    get_url_api(): String {
        return this.url;
    }
}
