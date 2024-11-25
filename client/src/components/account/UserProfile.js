import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import axios from "axios";
import AccountCard from "./AccountCard";
import ReactLoading from "react-loading";
import { useUser } from "../../providers/UserContext";

function UserProfile(){

    const { userId } = useParams();
    const { currentUser } = useUser();
    const [account, setAccount] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);

    useEffect(() => {

        async function fetchAccount(){

            if (loadingUser){
                return;
            }

            setLoadingUser(true);

            try {
                const response = await axios.get(`https://mastodon.social/api/v1/accounts/${userId}`);
                setAccount(response.data);
            } catch (e){
                console.log("Error obteniendo la información de la cuenta", e);
            } finally {
                setLoadingUser(false);
            }
        }

        fetchAccount();
    // eslint-disable-next-line
    }, [userId]);

    return(
    <div className="mt-4">
        {loadingUser || account === null || currentUser === null? 
        (
        <div className="d-flex justify-content-center align-items-center">
            <ReactLoading type="spin" color="#3498db" height={50} width={50} />
        </div>)
        :
        (<AccountCard account={account} isMyAccount={currentUser.id === account.id}></AccountCard>)}

        <div className="my-4">
            <Outlet></Outlet>
        </div>
    </div>);

}

export default UserProfile;