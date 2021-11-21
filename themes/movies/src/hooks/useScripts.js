import { useEffect, useRef } from 'react';

// ===========================|| ELEMENT REFERENCE HOOKS  ||=========================== //

const useScripts = () => {
    const scripted = useRef(true);

    useEffect(
        () => () => {
            scripted.current = false;
        },
        []
    );

    return scripted;
};

export default useScripts;
