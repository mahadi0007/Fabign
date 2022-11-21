// HOC/withAuth.jsx
import { useRouter } from "next/router";
import jwtDecode from 'jwt-decode'


const withAuth = (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        if (typeof window !== "undefined") {
            const Router = useRouter();

            const accessToken = localStorage.getItem("token");
            if(!accessToken){
                Router.replace("/login");
                return null
            }
            else if (accessToken) {
                let segments = accessToken.split('.')
                atob(segments[0])
                try {
                    let newToken = jwtDecode(accessToken)
                    if (!newToken || newToken.exp * 1000 < Date.now() - (60 * 1000)) {
                        localStorage.removeItem('token')
                        Router.replace("/login");
                        return null
                    }
                } catch (error) {
                    if(error){
                        localStorage.removeItem('token')
                        Router.replace("/login");
                        return null
                    }
                }
                
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
};

export default withAuth;