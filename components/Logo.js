import Link from "next/link"
import {app_config} from "../utils/constants";

export default function Logo() {
    return (
        <Link href="/" passHref>
            <div className="cursor-pointer" >
                                            <img src={app_config.APP_LOGO}
                                height={30}
                                width={30}
                                alt="Logo ..."
                                className="mr-2"
                            />
                <span style={{color: '#707070',fontWeight:"bolder"}}>{app_config.APP_NAME}</span>
            </div>
        </Link>
    )
}