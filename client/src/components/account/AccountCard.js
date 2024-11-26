import React, { useState } from "react";
import FollowButton from "../FollowButton";
import { Link } from "react-router-dom";

function AccountCard({ account, isMyAccount }){

    const [followersCount, setFollowersCount] = useState(account.followers_count);

    const updateFollowersCount = (newFollowersCount) => {
        setFollowersCount(newFollowersCount);
    }

    return(
    <div className="card mb-3">

        <div className="position-relative">

            <div className="border-bottom border-1">
                <img 
                    src={account.header} 
                    className="card-img-top" 
                    alt="Encabezado de perfil de usuario"
                    style={{ height: '200px', objectFit: 'cover' }} 
                />
            </div>

            <img 
                src={account.avatar} 
                alt="Foto de perfil de usuario"
                className="position-absolute rounded-circle border border-3 border-white" 
                style={{ top: '150px', left: '20px', width: '100px', height: '100px' }} 
            />
        </div> 

        <div className="d-flex flex-row-reverse mt-3 mb-1 mx-3">
            {isMyAccount?
            (<button type="button" className="btn btn-primary">Editar perfil</button>)
            :
            (<FollowButton accountId={account.id} followersCountCallback={updateFollowersCount} followersCount={followersCount}></FollowButton>)}
            
        </div>

        <div className="mx-4 mb-3">
            <h4>{account.username}</h4>
        </div>

        <div className="d-flex mx-4 mb-3">
            <Link className="no-link-styles me-2" to={`/main/profile/${account.id}`}>
                {account.statuses_count} {account.statuses_count === 1? "debate" : "debates"}
            </Link>
            <i className="bi bi-dot"></i>
            <Link className="no-link-styles mx-2" to={`/main/profile/${account.id}/following`}>
                {account.following_count} {"siguiendo"}
            </Link>
            <i className="bi bi-dot"></i>
            <Link className="no-link-styles mx-2" to={`/main/profile/${account.id}/followers`}>
                {followersCount} {followersCount === 1? "seguidor" : "seguidores"}
            </Link>
        </div>
        
    </div>);
}

export default AccountCard;