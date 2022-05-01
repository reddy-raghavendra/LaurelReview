import { getToken } from "./components/Token/Token"
const { REACT_APP_API_URL } = process.env;
export const Constants = {
    apis: {
        // get_issues: "https://61fe608fa58a4e00173c980a.mockapi.io/issues/issues",

        get_issues: `${REACT_APP_API_URL}api/issues`,
        get_chapbooks: `${REACT_APP_API_URL}api/chapbooks`,
        get_chapbookDetail: `${REACT_APP_API_URL}api/chapbook`,
        url:REACT_APP_API_URL,
    }
}