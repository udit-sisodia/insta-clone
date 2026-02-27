import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import "../style/people.scss"

const TABS = ["Followers", "Following", "Discover"]

const People = ({ followers = [], following = [], allUsers = [], onFollow, onUnfollow }) => {
    const [activeTab, setActiveTab] = useState("Followers")
    const navigate = useNavigate()

    const getList = () => {
        if (activeTab === "Followers") return followers
        if (activeTab === "Following") return following
        return allUsers
    }

    const isFollowing = (user) => following.some(f => f.id === user.id)
    const isMe = (user) => user.isCurrentUser

    const handleFollowToggle = (user) => {
        if (isFollowing(user)) {
            onUnfollow && onUnfollow(user)
        } else {
            onFollow && onFollow(user)
        }
    }

    const list = getList()

    return (
        <div className="people-page">
            <div className="people-container">

                {/* Header */}
                <div className="people-header">
                    <h2>People</h2>
                    <p className="subtitle">Manage your connections</p>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                            {tab === "Followers" && followers.length > 0 &&
                                <span className="tab-count">{followers.length}</span>}
                            {tab === "Following" && following.length > 0 &&
                                <span className="tab-count">{following.length}</span>}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="user-list">
                    {list.length === 0 ? (
                        <div className="empty-state">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028Z" />
                            </svg>
                            <p>No users here yet</p>
                        </div>
                    ) : (
                        list.map(user => (
                            <div className="user-card" key={user.id}>

                                {/* Avatar + name → profile */}
                                <div
                                    className="user-info"
                                    onClick={() => navigate(`/profile/${user.id}`)}
                                >
                                    <div className="avatar-wrapper">
                                        <img src={user.profileImage} alt={user.username} />
                                    </div>
                                    <div className="user-meta">
                                        <p className="username">{user.username}</p>
                                        {user.email && <p className="email">{user.email}</p>}
                                    </div>
                                </div>

                                {/* Action button — hide for own account */}
                                {!isMe(user) && (
                                    isFollowing(user) ? (
                                        <button
                                            className="unfollow-btn"
                                            onClick={() => handleFollowToggle(user)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z" />
                                            </svg>
                                            <span>Unfollow</span>
                                        </button>
                                    ) : (
                                        <button
                                            className="follow-btn"
                                            onClick={() => handleFollowToggle(user)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z" />
                                            </svg>
                                            <span>Follow</span>
                                        </button>
                                    )
                                )}

                                {/* Followers tab — show badge if mutual */}
                                {activeTab === "Followers" && isFollowing(user) && (
                                    <span className="mutual-badge">Mutual</span>
                                )}

                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    )
}

export default People