import { RichText } from "@graphcms/rich-text-react-renderer";
import dynamic from "next/dynamic";
import Link from "next/link";
import ReactPlayer from "react-player";
const ReactPlayerLazy = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});

const VideoPlayer = ({ url, children }) => {
  return ReactPlayer.canPlay(url) ? (
    <div className="video_player">
      <ReactPlayerLazy url={url} controls width={"100%"} height={"100%"} />
    </div>
  ) : (
    <>{children}</>
  );
};

const PostDetailsBody = ({ raw = {} }) => {
  return (
    <div className="postdetails_body">
      <RichText
        content={raw}
        renderers={{
          video: ({ src, title }) => {
            return (
              <VideoPlayer url={src}>
                <video src={src} title={title} controls></video>
              </VideoPlayer>
            );
          },
          iframe: ({ url, width, height }) => {
            return (
              <VideoPlayer url={url}>
                <iframe src={url} width={width} height={height} />
              </VideoPlayer>
            );
          },
          table: ({ children }) => (
            <div className="table_layout">
              <table>{children}</table>
            </div>
          ),
          a: ({ children, href, className, openInNewTab }) => (
            <Link href={href}>
              <a
                className={className}
                target={openInNewTab ? "_blank" : undefined}
              >
                {children}
              </a>
            </Link>
          ),
        }}
      />
    </div>
  );
};

export default PostDetailsBody;
