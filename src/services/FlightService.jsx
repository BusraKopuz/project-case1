import axios from "axios";

export default {
    getFlightService() {
        return axios.get("http://localhost:3001/api/flights");
    }
}
