import { useState } from 'react';

// ===========================|| ELEMENT REFERENCE HOOKS  ||=========================== //

const useProvideAuth = () => {
    const [user, setUser] = useState(null);

    const signin = cb => {
        return fakeAuth.signin(() => {
            setUser("user");
            cb();
        });
    };

    const signout = cb => {
        return fakeAuth.signout(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        signin,
        signout
    };
};

export default useProvideAuth;
