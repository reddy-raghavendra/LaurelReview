import { Component } from "react";
import { Constants } from "../../Constants";
import axios from "axios";
import './Chapbook.css';
export default class chapbooks extends Component{
    state = {
        chapbooks: [],
        isLoading: false
    }
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            chapbooks: props.chapbooks,
            isLoading: true
        }
        this.setState({ isLoading: true });     
        this.getChapbooksData();
        
    }
    async getChapbooksData() {
         axios.get(Constants.apis.get_chapbooks).then(
            (response) => {
            console.log("axios",response.data)            
            //   data = response.data;
              this.setState({ chapbooks: response.data, isLoading: false });
            });
    }
    render() {
        const chapbooks = this.state.chapbooks;
        return (
            <section className="laurel-chapbook-section">
                <div className="laurel-chapbook-container">
                    {
                        (this.state.chapbooks && this.state.chapbooks.length) ? 
                            this.state.chapbooks.map((chapbook) => {
                                return <div className="laurel-chapbook">
                                    <div>
                                        <div className="laurel-chapbook-cover"><img src={chapbook.chapBookCoverImage}></img></div>
                                        <div className="laurel-chapbook-content">
                                            <h4><a href={getLink(chapbook.chapBookId)}>{chapbook.chapBookName}</a></h4>
                                        </div>
                                    </div>
                                </div>
                            })
                            : <div className="laurel-issues-error laurel-h2"><h2>Empty chapbooks</h2></div> 
                    }
                </div>
            </section>
            
        )
    }
}

function getLink(chapbook){
    return `./chapbook/${chapbook}`;
}