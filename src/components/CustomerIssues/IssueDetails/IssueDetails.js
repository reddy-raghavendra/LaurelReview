import { Component } from "react";
import './IssueDetails.css';
import { Constants } from "../../../Constants";
import axios from "axios";
import { Link } from "react-router-dom";

function navigateToThirdParty(){
    window.open("https://thelaurelreview.submittable.com/submit")
}
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
        axios.get(`${Constants.apis.get_issues}/${this.issueVersion}`).then(
            (response) => {
            console.log("axios",response.data)            
            //   data = response.data;
              this.setState({ issue: response.data, isLoading: false });
        });
        // const issuesData = await issuesService.fetchIssueByVersion(this.issueVersion);
        // console.log(issuesData)
        // this.setState({ issue: !!issuesData.length ? issuesData[0] : [] , isLoading: false });
        console.log("State variable",this.state.issue);
    }
    // async getIssuesData() {

    //     const issuesData = await issuesService.fetchIssueByVersion(this.issueVersion);
    //     console.log(issuesData)
    //     this.setState({ issue: !!issuesData.length ? issuesData[0] : [] , isLoading: false });
    //     console.log(this.state);
    // }
    render() {
        const issue = this.state.issue || [];
        console.log(this.state.issue)
        console.log("issuedetails",issue.issueDetails)
        return (
            <section className="laurel-issue-details-section">
                <div className="laurel-issue-details-container">
                    <h1>{issue ? issue.issueTitle: ''}</h1>
                    {
                        (!issue) ? 
                            <h2 className="laurel-h2">No details for issue {this.issueVersion}</h2>
                        :
                            <div className="laurel-issue-details">
                                <div className="laurel-issue-details-img">
                                    <img src={issue.issueImage}></img>
                                    <button class="order-now" onClick={navigateToThirdParty}>Order Now</button>
                                </div>
                                <div className="laurel-issue-details-content">
                                    <div className="laurel-issue-details-header-content">
                                        <h1>{issue.issue}</h1>
                                        <h2>{issue.issueTitle}</h2>
                                    </div>
                                    <div className="laurel-issue-details-table-content">
                                        <h3>Table of Content</h3>
                                        {/* issue.type fiction, mystory etc */}

                                        {
                                            (issue && issue.issueDetails) ?
                                                <div className="laurel-issue-details-table-row">
                                                    {
                                                        issue.issueDetails.map((issueDetails) => {
                                                            return <div className="table-row">
                                                                <div className="table-cell table-cell-key">{issueDetails.authorName}</div>
                                                                {/* <Link to={"/pdf/"+content.value}>
                                                                    {content.value}
                                                                </Link> */}
                                                                <div className="table-cell table-cell-value">{(issueDetails.pageNo ?<Link to={{pathname:`./${issue.issueId}/pdf`,state:{pageNo:issueDetails.pageNo,image:issue.issueImage,title:issue.issueTitle}}}>{issueDetails.authorDescription}</Link> : issueDetails.authorDescription )}</div>
                                                                {/* <div className="table-cell table-cell-value">{(content.link ? <a href={"/pdf/"+content.value}></a> : content.value )}</div> */}
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
