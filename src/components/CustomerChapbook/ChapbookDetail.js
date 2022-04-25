import { Component } from "react";
import './ChapbookDetail.css';
import { Constants } from "../../Constants";
import axios from "axios";
import { Link } from "react-router-dom";

function navigateToThirdParty(){
    window.open("https://thelaurelreview.submittable.com/submit")
}
export default class ChapbookDetail extends Component{
    state = {
        chapbook: null,
        isLoading: false
    }
    chapbookVersion = '';
    params;
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            chapbook: props.state,
        }
        this.chapbookVersion = props.match.params.id || '';
        this.setState({ isLoading: true });
        this.getChapbookData();
    }

    async getChapbookData() {
        axios.get(`${Constants.apis.get_chapbookDetail}/${this.chapbookVersion}`).then(
            (response) => {
            console.log("axios",response.data)            
              this.setState({ chapbook: response.data, isLoading: false });
        });

        console.log("State variable",this.state.chapbook);
    }
    render() {
        const chapbook = this.state.chapbook || [];
        return (
            <section className="laurel-chapbook-details-section">
                <div className="laurel-chapbook-details-container">
                    <h1>{chapbook ? chapbook.chapBookName: ''}</h1>
                    {
                        (!chapbook) ? 
                            <h2 className="laurel-h2">No details for chapbook {this.chapbookVersion}</h2>
                        :
                            <div className="laurel-chapbook-details">
                                <div className="laurel-chapbook-details-img">
                                    <img src={chapbook.chapBookCoverImage}></img>
                                    <button class="order-now" onClick={navigateToThirdParty}>Order Now</button>
                                </div>
                                <div className="laurel-chapbook-details-content">
                                    <div className="laurel-chapbook-details-header-content">
                                        <h1>{chapbook.chapBookDate}</h1>
                                    </div>
                                    <div className="laurel-chapbook-details-table-content">
                                        <p>{chapbook.chapBookDesc}</p>
                                        
                                    </div>

                                </div>
                            </div>
                        
                    }
                </div>
            </section>
            
        )
    }
}
