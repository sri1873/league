import React from "react";
import { RingLoader } from "react-spinners";

interface LoaderProps{
    state: boolean
}

const Loader:React.FC<LoaderProps> = ({ state }) => {

    return (state ?
        <div className="loader-container">
                <RingLoader
                color="#74fbc9"
                    loading={state}
                    speedMultiplier={1.8}
                    size={"60px"}  
                    className="load"
                />
            
            <p style={{ padding: "10px" }}>Preparing the Field...</p>
        </div>:<></>
    )

}
export default Loader