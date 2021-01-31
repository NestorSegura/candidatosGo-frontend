import * as React from "react";
import SideNav from "../sidenav/SideNav";
import './PageWrapperStyles.css';

const PageWrapper: React.FC = ({children}) => {

    return (
        <div className="main-content container-fluid full-height">
            <div className="row full-height">
                <SideNav/>
                <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageWrapper;