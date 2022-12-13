import React from "react"

const Avatar = ({ user, size }) => {
  return (
    <>
      {!user.username ? null : (
        <>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className={`rounded-circle ${
                size === "thumbnail" ? "avatarThumbnail" : "avatar"
              }`}
            />
          ) : (
            <div
              className={`rounded-circle ${
                size === "thumbnail" ? "avatarThumbnail" : "avatar"
              }`}
            >
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#333333" />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  fill="white"
                  dy=".3em"
                  className="avatarTxt"
                >
                  {user.username.slice(0, 1).toUpperCase()}
                </text>
              </svg>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Avatar
