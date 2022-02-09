import { Component } from "react";
import './IssueDetails.css';
import issuesService from "../../../service/issues.service";

export default class IssueDetails extends Component{
    state = {
        issue: null,
        isLoading: false
    }
    issueVersion = '';
    params;
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            issue: props.state,
        }
        this.issueVersion = props.match.params.id || '';
        this.setState({ isLoading: true });
        this.getIssuesData();
    }
    async getIssuesData() {
        const issuesData = await issuesService.fetchIssueByVersion(this.issueVersion);
        console.log(issuesData)
        this.setState({ issue: !!issuesData.length ? issuesData[0] : [] , isLoading: false });
        console.log(this.state);
    }
    render() {
        const issue = this.state.issue || [];
        return (
            <section className="laurel-issue-details-section">
                <div className="laurel-issue-details-container">
                    <h1>{issue ? issue.issue : ''}</h1>
                    {
                        (!issue) ? 
                            <h2 className="laurel-h2">No details for issue {this.issueVersion}</h2>
                        :
                            <div className="laurel-issue-details">
                                <div className="laurel-issue-details-img">
                                    <img src={issue.cover}></img>
                                </div>
                                <div className="laurel-issue-details-content">
                                    <div className="laurel-issue-details-header-content">
                                        <h1>{issue.issue}</h1>
                                        <h2>{issue.title}</h2>
                                    </div>
                                    <div className="laurel-issue-details-table-content">
                                        <h3>Table of Content</h3>
                                        {/* issue.type fiction, mystory etc */}

                                        {
                                            (issue && issue.content) ?
                                                <div className="laurel-issue-details-table-row">
                                                    {
                                                        issue.content.map((content) => {
                                                            return <div className="table-row">
                                                                <div className="table-cell table-cell-key">{content.key}</div>
                                                                <div className="table-cell table-cell-value">{(content.link ? <a href={content.link}>{content.value}</a> : content.value )}</div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                                :

                                                <h2 class="laurel-h2">Empty Table Content</h2>
                                        }
                                        
                                        
                                    </div>

                                </div>
                            </div>
                        
                    }
                </div>
            </section>
            
        )
    }
}
