import React, {useEffect} from 'react'

const TatLogin = () => {

    useEffect(() => {
        const script = document.createElement('script');

        script.innerText = `var sso_data = sso_data || [];(function(d, i, dm){ sso_data['ssoId'] = i;sso_data['tatDomain'] = dm; var script = d.createElement('script');script.type = 'text/javascript';script.async=true;script.src = 'https://staging.tatmart.com/js/addons/tat_single_sign_on/sso.js';d.getElementsByTagName('head')[0].appendChild(script);})(document, 'SSO-2', 'https://staging.tatmart.com');`

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    },[]);

    return (
        <div id='tat_login' data-return-url='https://localhost:3000/reports'/>
    )
}

export default TatLogin
