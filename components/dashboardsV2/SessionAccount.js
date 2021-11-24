import { getDashboardLink } from "../../utils/sidebar-links";
import { useSelector } from "react-redux";
import Link from "next/link";
import AuthService from "../../services/auth/auth.service";

export default function Account() {
  const user = useSelector((state) => state.authUser);

  const logOut = () => {
    // e.preventDefault();
    AuthService.logout();
  };
  return (
    <div className="dropdown cursor-pointer">
      <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img
          width={30}
          height={30}
          className={"rounded-circle"}
          src={user.imageUrl}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://ui-avatars.com/api/?name=" + user.username;
          }}
          alt={user.username}
        />
        <svg
          className="inline my-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 14l-4-4h8z" fill="rgba(255,255,255,1)" />
        </svg>
      </div>

      <div className="dropdown-menu dropdown-menu-right shadow">
        <div className="dropdown-header">{user.fullNames}</div>
        <div className="dropdown-divider" />
        <Link href={getDashboardLink(user)} passHref>
          <a className="dropdown-item" href="#">
            Dashboard
          </a>
        </Link>
        <Link href={getDashboardLink(user) + "/account/settings"} passHref>
          <a className="dropdown-item" href="#">
            Account settings
          </a>
        </Link>
        <div className="dropdown-divider" />
        <a className="dropdown-item" href="#" onClick={()=>logOut()}>
          Log out
        </a>
      </div>
    </div>
  );
}
