import { Component } from "react";
import './Issues.css';
import issuesService from "../../service/issues.service";

export class Issues extends Component{
    state = {
        issues: [],
        isLoading: false
    }
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            issues: props.issues,
            isLoading: true
        }
        this.setState({ isLoading: true });
        this.getIssuesData();
    }
    async getIssuesData() {
        const issuesData = await issuesService.fetchIssues();
        console.log('issueData', issuesData)
        this.setState({ issues: issuesData.issues, isLoading: issuesData.isLoading });
    }
    render() {
        // this.getIssuesData();
        const issues = this.state.issues;
        return (
            <section className="laurel-issues-section">
                <div className="laurel-issues-container">
                    {
                        (this.state.issues && this.state.issues.length) ? 
                            this.state.issues.map((issue) => {
                                return <div className="laurel-issue">
                                    <div>
                                        <div className="laurel-issue-cover"><img src={issue.cover}></img></div>
                                        <div className="laurel-issue-content">
                                            <h4><a href={getLink(issue.issue)}>{issue.issue}</a></h4>
                                            {/* open issue in new page link */}
                                        </div>
                                    </div>
                                </div>
                            })
                            : <div className="laurel-issues-error laurel-h2"><h2>Empty issues</h2></div> 
                    }
                </div>
            </section>
            
        )
    }
}

function getLink(issue){
    return `./issues/${issue}`;
}