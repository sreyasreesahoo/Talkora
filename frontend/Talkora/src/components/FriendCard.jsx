import React from "react";
import { LANGUAGE_TO_FLAG } from "../Constants";
import { MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";
function FriendCard({ friend }) {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native:{capitalizedLang(friend.nativeLanguage)}
          </span>
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning:{capitalizedLang(friend.learningLanguage)}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full ">
          <MessageCircleMore size={12} className="mr-4" />
          Message
        </Link>
      </div>
    </div>
  );
}

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) {
    return null;
  }

  // Capitalize first letter

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <>
        <img
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt={`${capitalizedLang(language)} flag`}
          className="h-3 mr-1 inline-block"
        />
      </>
    );
  }

  return null;
}
function capitalizedLang(language) {
  if (!language) return "";
  return language.charAt(0).toUpperCase() + language.slice(1).toLowerCase();
}
