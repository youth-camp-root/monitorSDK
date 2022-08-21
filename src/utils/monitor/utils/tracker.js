class Tracker {
    constructor() {
        this.url = "";
    }
    send(data) {
        const targetData = {
            userid:localStorage.getItem("SDK_userId"),
            ...data
        };
        console.log("tracker-----", targetData);
    }
}
export default new Tracker();