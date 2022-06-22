import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CgSpinner } from "react-icons/cg";
import { MdCheck, MdWarning } from "react-icons/md";
import { useThemeContext } from "../../contexts/ThemeContext";
import { submitComment } from "../../services";

const CommentForm = ({ slug = null }) => {
  // initial state for form components
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  // handle form errors
  const [commentStatus, setCommentStatus] = useState({
    message: "",
    status: undefined,
  });
  // captcha verfication state
  const [captchaVerified, setCaptchaVerified] = useState(false);
  // state for saveing form data in localstorage
  const [localCommentData, setLocalCommentData] = useState(null);
  // captcha reference for furthrr reset
  const captchaRef = useRef(null);
  // captcha site key
  const recaptchaSiteKey = process.env.GOOGLE_RECAPTCHA_SITE_KEY;
  // theme for captcha
  const { theme } = useThemeContext();

  // handle mount opertaions
  useEffect(() => {
    // get saved comment data from localstorage
    let localCommentInfo = localStorage.getItem("zen-blog-comment-data");
    if (localCommentInfo !== null) {
      const localCommentValue = JSON.parse(localCommentInfo);

      setCommentName(localCommentValue.name || "");
      setCommentEmail(localCommentValue.email || "");
    }
  }, []);

  // save comment data in localstorage
  useEffect(() => {
    if (localCommentData && Object.keys(localCommentData).length) {
      localStorage.setItem(
        "zen-blog-comment-data",
        JSON.stringify(localCommentData)
      );
    }
  }, [localCommentData]);

  // reset captcha
  useEffect(() => {
    if (captchaVerified === "reset" && captchaRef.current) {
      captchaRef.current.reset();
      setCaptchaVerified(false);
    }
  }, [captchaVerified]);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check captcha already verified or not
    if (!captchaVerified) {
      return setCommentStatus({
        status: "error",
        message: "verify captcha first",
      });
    }

    // check the post slug is available or not
    if (!slug)
      return setCommentStatus({
        status: "error",
        message: "can not connect to the post",
      });

    // check comment text
    if (commentText.trim().length <= 5) {
      return setCommentStatus({
        status: "error",
        message: "comment must be contain more than 5 character",
      });
    }

    const commentObj = {
      name: commentName,
      email: commentEmail,
      text: commentText,
    };

    try {
      // show user that comment is submiting
      setCommentStatus({
        message: "submitting your comment",
        status: "loading",
      });
      // submit comment
      const result = await submitComment(commentObj, slug);

      // check comment created or not
      if (!result.id) throw { message: "comment not created" };
      // save comment data in local storage on success
      setLocalCommentData({ name: commentName, email: commentEmail });
      // show the success message
      setCommentStatus({
        message: "comment submitted wait for admin confirmation",
        status: "success",
      });

      // reset state
      setCaptchaVerified("reset");
      setCommentText("");
    } catch (error) {
      // console.log(error);
      setCommentStatus({
        message: "something went to wrong",
        status: "error",
      });
    }
  };

  return (
    <form className="commentform" onSubmit={handleSubmit}>
      <div className="commentform_layout">
        <input
          type="text"
          className="commentform_input"
          name="name"
          value={commentName}
          placeholder="Name"
          onChange={(e) => setCommentName(e.target.value)}
        />
        <input
          type="email"
          className="commentform_input"
          name="email"
          value={commentEmail}
          placeholder="Email"
          onChange={(e) => setCommentEmail(e.target.value)}
        />
        <textarea
          name="text"
          id="commentText"
          cols="30"
          rows="10"
          className="commentform_input commentform_textarea"
          value={commentText}
          placeholder={"Comment"}
          onChange={(e) => setCommentText(e.target.value)}
          required
        ></textarea>

        {recaptchaSiteKey ? (
          <div className="commentform_recaptcha col-span-2 md:col-span-1">
            <ReCAPTCHA
              sitekey={recaptchaSiteKey}
              onChange={() => setCaptchaVerified(true)}
              onExpired={() => setCaptchaVerified(false)}
              onErrored={() => setCaptchaVerified(false)}
              size="normal"
              ref={captchaRef}
              theme={theme}
            />
          </div>
        ) : null}

        <button
          className="commentform_btn col-span-2 md:col-span-1"
          type="submit"
          disabled={commentStatus.status === "loading"}
        >
          Submit
        </button>

        {commentStatus.message?.length ? (
          <p className={`commentform_status ${commentStatus.status}`}>
            {commentStatus.status === "error" ? <MdWarning /> : null}
            {commentStatus.status === "success" ? <MdCheck /> : null}
            {commentStatus.status === "loading" ? (
              <CgSpinner className="animate-spin" />
            ) : null}
            {commentStatus.message}
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default CommentForm;
