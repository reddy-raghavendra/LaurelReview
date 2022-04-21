import { Link } from "react-router-dom";
import "./Chapbook.css";
// import Chart from "../../components/chart/Chart"
import { ChapbookData } from "../../dummyData"
import { getToken } from "../Token/Token";
import { Publish } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export default function Chapbook() {

    const history = useHistory()
    if (getToken() != "Login Success") {
        history.push("/login");
      }
    return (
        <div className="Chapbook">
            {/* <div className="ChapbookTitleContainer">
                <h1 className="ChapbookTitle">Chapbook</h1>
                <Link to="/newChapbook">
                    <button className="ChapbookAddButton">Create</button>
                </Link>
            </div> */}
            {/* <div className="ChapbookTop">
              
                <div className="ChapbookTopRight">
                    <div className="ChapbookInfoTop">
                        <img src="https://www.saddlepointsystems.com/images/sample-books/tape-binding-master-category.jpg" alt="" className="ChapbookInfoImg" />
                        <span className="ChapbookName">Chapbook</span>
                    </div>
                    <div className="ChapbookInfoBottom">
                        <div className="ChapbookInfoItem">
                            <span className="ChapbookInfoKey">id:</span>
                            <span className="ChapbookInfoValue">123</span>
                        </div>
                        <div className="ChapbookInfoItem">
                            <span className="ChapbookInfoKey">sales:</span>
                            <span className="ChapbookInfoValue">5123</span>
                        </div>
                        <div className="ChapbookInfoItem">
                            <span className="ChapbookInfoKey">active:</span>
                            <span className="ChapbookInfoValue">yes</span>
                        </div>
                        <div className="ChapbookInfoItem">
                            <span className="ChapbookInfoKey">in stock:</span>
                            <span className="ChapbookInfoValue">no</span>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="ChapbookBottom">
                <form className="ChapbookForm">
                    <div className="ChapbookFormLeft">
                        <label>Chapbook Name</label>
                        <input type="text" placeholder="Chap book" />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label>Active</label>
                        <select name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="ChapbookFormRight">
                        <div className="ChapbookUpload">
                            <img src="https://www.saddlepointsystems.com/images/sample-books/tape-binding-master-category.jpg" alt="" className="ChapbookUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="ChapbookButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
