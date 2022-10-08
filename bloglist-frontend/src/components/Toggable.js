import { useState } from "react";

const Toggable = ({ buttonLabel, children }) => {

    const [visible, setVisible] = useState(false);
    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    return (
        <>
            <button onClick={toggleVisibility} style={hideWhenVisible}>{buttonLabel}</button>
            <div style={showWhenVisible}>
                {children(toggleVisibility)}
                <button onClick={toggleVisibility}>cancel</button>
            </div>

        </>
    );

}

export default Toggable;