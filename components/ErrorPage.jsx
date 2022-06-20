import Image from "next/image";
import Link from "next/link";
import { MdHome } from "react-icons/md";

const ErrorPage = ({ errorCode = 404, errorText = "" }) => {
  return (
    <div className="blog_error">
      <Image
        src={`https://avatars.dicebear.com/api/bottts/${
          errorCode || "404"
        }.svg`}
        alt="error image"
        width={"150px"}
        height={"150px"}
        className="blog_error_image"
      ></Image>

      {errorCode ? <h2 className="blog_error_code">{errorCode}</h2> : ""}

      <p className="blog_error_text">
        {!errorText ? "are you lost baby girl?" : errorText} come back
        <Link href={"/"}>
          <a>
            <MdHome />
          </a>
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
