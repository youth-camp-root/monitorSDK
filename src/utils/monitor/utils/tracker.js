class Tracker {
    constructor() {
        this.url = "";
    }
    send(data) {
        console.log("tracker-----", data);
    }
}
export default new Tracker();