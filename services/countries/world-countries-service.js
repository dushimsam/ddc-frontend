import axios from "axios";

export const domain = "https://restcountries.eu";

const http = axios.create({
    baseURL: `${domain}/rest/v2`,
    headers: {'Content-Type': 'application/json'},
});

class WorldCountriesService {
    getAllCountries() {
        return http.get("/all")
    }
}

export default new WorldCountriesService();
