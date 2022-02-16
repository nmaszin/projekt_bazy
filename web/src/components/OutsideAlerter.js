import React, { useRef, useEffect } from "react";

const useOutsideAlerter = (ref, hideSidebar) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                hideSidebar();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.hideSidebar);

    return <div ref={wrapperRef}>{props.children}</div>;
}