import axios from "axios";
import URLs from "./UrlConstants";

export const getTrendingLastMonthRepos = (qualifier: string, sort: string, order: string, page: number) => {
    axios.get(`${URLs.baseURL}?q=${qualifier}&sort=${sort}&order=${order}$page=${page}`)
}