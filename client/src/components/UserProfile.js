import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import AccountCard from "./AccountCard";
import ReactLoading from "react-loading";
import { useUser } from "../providers/UserContext";
import PostCard from "./post/PostCard";

function UserProfile(){

    const { userId } = useParams();
    const { currentUser } = useUser();
    const [account, setAccount] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);
    const [accountPosts, setAccountPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);

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

        async function fetchAccountPosts(){

            if (loadingPosts){
                return;
            }

            setLoadingPosts(true);

            try {
                const response = await axios.get(`https://mastodon.social/api/v1/accounts/${userId}/statuses`);
                const directPosts = response.data.filter(post => post.in_reply_to_id === null);
                setAccountPosts(directPosts);
            } catch (e){
                console.log("Error obteniendo las publicaciones de la cuenta", e);
            } finally {
                setLoadingPosts(false);
            }
        }

        fetchAccount();
        fetchAccountPosts();
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
            {loadingPosts && 
                <div className="d-flex justify-content-center align-items-center">
                    <ReactLoading type="spin" color="#3498db" height={50} width={50} />
                </div>
            }

            {accountPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    </div>);

}

export default UserProfile;