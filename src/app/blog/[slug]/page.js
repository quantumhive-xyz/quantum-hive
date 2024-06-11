"use client";
import MainLayout from "@/components/layout/MainLayout";
import useWow from "@/hooks/useWow";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client } from "../../../../sanity/lib/client";
import { urlForImage } from "../../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { slugify } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import Comments from "@/components/blog/Comments";
import RecentPost from "@/components/blog/RecentPost";

async function getPost(slug) {
  const query = `
    *[_type=="blog" && slug.current=="${slug}"]{
  
    title,
    slug,
    description,
    mainImage{
      asset->{
        _id,
        url
      }
    },
    category,
    content,
    author,
    date,
    tags,
  } 
  `;

  const response = await client.fetch(query);
  return response[0];
}
4;
const getLatestPost = async () => {
  const query = `
    *[_type=="blog"] | order(date desc) [0...3]{
  
    title,
    slug,
    mainImage{
      asset->{
        _id,
        url
      }
    },
    date,
  }
  
    `;

  const response = await client.fetch(query);
  return response;
};

const BlogPage = () => {
  useWow();
  const [post, setPost] = React.useState(null);
  const pathName = usePathname();
  const slug = pathName.split("/")[2];

  useEffect(() => {
    getPost(slug).then((data) => {
      setPost(data);
    });
  }, []);

  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPost = async () => {
      const response = await getLatestPost();
      setLatestPosts(response);
    };
    fetchLatestPost();
  }, []);

  return (
    <>
      <MainLayout>
        <div
          className="breadcrumb-section"
          style={{
            backgroundImage:
              "url(/assets/img/innerpage/breadcrumb-bg1.png), linear-gradient(180deg, #121212 0%, #121212 100%)",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="banner-wrapper">
                  <div className="banner-content">
                    <ul className="breadcrumb-list">
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      <li>{"Blog Details"}</li>
                    </ul>
                    <h1>{post?.title}</h1>
                  </div>
                  <div className="scroll-down-btn">
                    <a href={"#blog-details"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={19}
                        height={29}
                        viewBox="0 0 19 29"
                      >
                        <path d="M9.5 0V28M9.5 28C10 24.3333 12.4 17.1 18 17.5M9.5 28C8.5 24.1667 5.4 16.7 1 17.5" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="blog-details scroll-margin pt-120 mb-120 style-6"
          id="blog-details"
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="blog-details-thumb">
                  <div className="batch">
                    <span>{post?.category}</span>
                  </div>
                  <img
                    src={
                      post
                        ? urlForImage(post?.mainImage).url()
                        : "/assets/img/innerpage/blog-details-thumb-img.jpg"
                    }
                    alt={post?.mainImageAlt}
                  />
                </div>
                <div className="blog-details-author-meta">
                  <div className="author-area">
                    <div className="author-content">
                      <h6>
                        By,{" "}
                        <Link className="text-capitalize" href="/#">
                          {post?.author}
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 0C3.60594 0 0 3.60594 0 8C0 12.3941 3.60594 16 8 16C12.3941 16 16 12.3941 16 8C16 3.60594 12.3941 0 8 0ZM11.646 3.69106C11.8291 3.508 12.1259 3.508 12.3089 3.69106C12.492 3.87413 12.492 4.17091 12.3089 4.35397C12.1259 4.53703 11.8291 4.53703 11.646 4.35397C11.463 4.17091 11.463 3.87413 11.646 3.69106ZM7.53125 2.375C7.53125 2.11591 7.74091 1.90625 8 1.90625C8.25909 1.90625 8.46875 2.11591 8.46875 2.375V3.3125C8.46875 3.57159 8.25909 3.78125 8 3.78125C7.74091 3.78125 7.53125 3.57159 7.53125 3.3125V2.375ZM2.375 8.46875C2.11591 8.46875 1.90625 8.25909 1.90625 8C1.90625 7.74091 2.11591 7.53125 2.375 7.53125H3.3125C3.57159 7.53125 3.78125 7.74091 3.78125 8C3.78125 8.25909 3.57159 8.46875 3.3125 8.46875H2.375ZM4.35397 12.3089C4.17091 12.492 3.87413 12.492 3.69106 12.3089C3.508 12.1259 3.508 11.8291 3.69106 11.646C3.87413 11.4629 4.17091 11.4629 4.35397 11.646C4.53703 11.8291 4.53703 12.1259 4.35397 12.3089ZM4.35397 4.35397C4.17091 4.53703 3.87413 4.53703 3.69106 4.35397C3.508 4.17091 3.508 3.87413 3.69106 3.69106C3.87413 3.508 4.17091 3.508 4.35397 3.69106C4.53703 3.87413 4.53703 4.17091 4.35397 4.35397ZM8.46875 13.625C8.46875 13.8841 8.25909 14.0938 8 14.0938C7.74091 14.0938 7.53125 13.8841 7.53125 13.625V12.6875C7.53125 12.4284 7.74091 12.2188 8 12.2188C8.25909 12.2188 8.46875 12.4284 8.46875 12.6875V13.625ZM11.1439 11.1439C10.9608 11.327 10.6642 11.327 10.4811 11.1439L7.66856 8.33141C7.58069 8.24353 7.53125 8.1245 7.53125 8V5.1875C7.53125 4.92841 7.74091 4.71875 8 4.71875C8.25909 4.71875 8.46875 4.92841 8.46875 5.1875V7.80591L11.1439 10.4811C11.327 10.6642 11.327 10.9608 11.1439 11.1439ZM12.3089 12.3089C12.1259 12.492 11.8291 12.492 11.646 12.3089C11.463 12.1259 11.463 11.8291 11.646 11.646C11.8291 11.4629 12.1259 11.4629 12.3089 11.646C12.492 11.8291 12.492 12.1259 12.3089 12.3089ZM14.0938 8C14.0938 8.25909 13.8841 8.46875 13.625 8.46875H12.6875C12.4284 8.46875 12.2188 8.25909 12.2188 8C12.2188 7.74091 12.4284 7.53125 12.6875 7.53125H13.625C13.8841 7.53125 14.0938 7.74091 14.0938 8Z" />
                      </svg>
                      {new Date(post?.date).toDateString()}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row g-lg-4 gy-5 mb-100">
              <div className="col-lg-8">
                <div className="blog-details-content mb-0">
                  <p className="first-para mb-20">{post?.description}</p>
                  <div className={richTextStyles}>
                    <PortableText
                      value={post?.content}
                      components={myPortableTextComponents}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="sidebar-area">
                  <div className="single-widget mb-30">
                    <h5 className="widget-title">Recent Post </h5>
                    {latestPosts.map((post, index) => {
                      return <RecentPost key={post.title} post={post} />;
                    })}
                  </div>
                  <div className="single-widget mb-30">
                    <h5 className="widget-title">Releted Tags</h5>
                    <ul className="tag-list">
                      {post?.tags?.map((tag) => (
                        <li>
                          <Link href={""} onClick={(e) => e.preventDefault()}>
                            {tag}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="single-widget">
                    <h5 className="widget-title">Social Share</h5>
                    <ul className="social-list">
                      <li>
                        <a
                          target="_blank"
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_APP_URL}/blog/${slug}`}
                        >
                          <i className="bi bi-linkedin" />
                          <span>LinkedIn</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_APP_URL}/blog/${slug}`}
                          target="_blank"
                        >
                          <i className="bi bi-facebook" />
                          <span>Facebook</span>
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href={`https://twitter.com/intent/tweet?text=Here is a great blog by @MetaGeeks_tech . \n ${post?.title}&url=/case-study/${slug}`}
                        >
                          <i className="bi bi-twitter-x" />
                          <span>Twitter</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="blog-tag-and-social-area">
              <div className="blog-tag">
                <h6>Tag:</h6>
                <ul>
                  {post?.tags?.map((tag) => (
                    <li>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <Comments
                  url={`${process.env.NEXT_PUBLIC_APP_URL}/blog/${slug}`}
                  identifier={slug}
                  title={post?.title || ""}
                />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default BlogPage;

export const myPortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        src={urlForImage(value).url()}
        alt="Post"
        width={700}
        height={700}
      />
    ),
  },
  block: {
    h2: ({ value }) => (
      <h2
        id={slugify(value.children[0].text)}
        className="text-3xl font-bold mb-3"
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }) => (
      <h3
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }) => (
      <h4
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }) => (
      <h5
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }) => (
      <h6
        id={slugify(value.children[0].text)}
        className="text-xl font-bold mb-3"
      >
        {value.children[0].text}
      </h6>
    ),
  },
};

export const richTextStyles = `
mt-14
text-justify
max-w-2xl
m-auto
prose-headings:my-5
prose-heading:text-2xl
prose-p:mb-5
prose-p:leading-7
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`;
