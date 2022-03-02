import { Constants } from "../../Constants";
import axios from "axios";

class IssuesService {

    static instance = IssuesService.instance || new IssuesService();

    issuesData = { issues: [], isLoading: false };
    isLoading = false;

    getIssues() {
        return this.issues;
    }

    async fetchIssues() {
        this.isLoading = true;
        try {
            // await fetch(Constants.apis.get_issues)
            //     .then((data) => {
            //         console.log('data',data)
            //         return data.json();
            //     }).then((data) => {
            //         this.issuesData.issues = (data && data.data) ? data.data : [];
            //     })
            var data = []
            axios.get(Constants.apis.get_issues).then(
                (response) => {
                console.log("axios",response.data)
                
                  data = response.data;
                }).then((data) => {
                    console.log("promise",data)
                    this.issuesData.issues = data
                // this.issuesData.issues = (response && response.data) ? response.data : [];
            });
            // this.isLoading = false;
            // console.log('fetchIssue', this.issuesData)
            return { issues: this.issuesData.issues, isLoading: this.isLoading };
        } catch (e) {
            this.isLoading = false;
            return { issues: this.issues, isLoading: this.isLoading };
        }
    }

    async fetchIssueByVersion(issueVersion) {
        this.isLoading = true;
        try {
            const issue = await this.findIssueById(issueVersion) || [];
            return issue;
        } catch (e) {
            console.log(e);
        }
    }

    async findIssueById(issueVersion) {
        await this.fetchIssues();
        if (!this.issuesData || !this.issuesData.issues) {
            return [];
        }
        const issue = this.issuesData.issues.filter((issue) => {
            return issue.issue === issueVersion;
        })
        console.log('filtered issue', issue);
        return issue;
    }

}

export default IssuesService.instance;