import { useState } from "react";
import { useRouter } from "next/router";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import "react-markdown-editor-lite/lib/index.css";

export default function Blog({
  _id,
  title: existingTitle,
  slug: existingSlug,
  blogcategory: existingBlogcategory,
  description: existingDescription,
  tags: existingTags,
  status: existingStatus,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [blogcategory, setBlogcategory] = useState(existingBlogcategory || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [tags, setTags] = useState(existingTags || "");
  const [status, setStatus] = useState(existingStatus || "");

  async function createProduct(ev) {
    ev.preventDefault();

    const data = { title, slug, blogcategory, description, tags, status };

    if (_id) {
      await axios.put("/api/blogapi", { id: _id, ...data });
    } else {
      await axios.post("/api/blogapi", data);
    }

    setRedirect(true);
  }

  if (redirect) {
    router.push("/");
    return null;
  }

  // this function for every space in the speling will be -
  const handleSlug = (e) => {
    const inputValue = e.target.value;

    const newSlug = inputValue.replace(/\s+/g, "-");

    setSlug(newSlug);
  };

  return (
    <>
      <form
        onSubmit={createProduct}
        className="addWebsiteform"
        data-aos="fade-up"
      >
        {/* blog title */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter small title"
          />
        </div>

        {/* blog slug */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={handleSlug}
            id="slug"
            placeholder="Enter Slug url"
            required
          />
        </div>

        {/* blog category */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={blogcategory}
            onChange={(e) =>
              setBlogcategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            multiple
          >
            <option value="htmlcssjs">Html, Css & JavaScript</option>
            <option value="nextjs">Next Js, React Js</option>
            <option value="database">Database</option>
            <option value="deployment">Deployment</option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1">
            selected:{" "}
            {Array.isArray(existingBlogcategory) &&
              existingBlogcategory.map((category) => <span>{category}</span>)}
          </p>
        </div>

        {/* Markdown description content*/}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description">Blog Content</label>
          <MarkdownEditor
            value={description}
            onChange={(e) => setDescription(e.text)}
            style={{ width: "100%", height: "500px" }} // custom height
            renderHTML={(text) => (
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    if (inline) {
                      return <code>{children}</code>;
                    } else if (match) {
                      return (
                        <div style={{ position: "relative" }}>
                          <pre
                            style={{
                              padding: "0",
                              borderRadius: "5px",
                              overflowX: "auto",
                              whiteSpace: "pre-wrap",
                            }}
                            {...props}
                          >
                            <code>{children}</code>
                          </pre>
                          <button
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              zIndex: "1",
                            }}
                            onClick={() =>
                              navigator.clipboard.writeText(children)
                            }
                          >
                            copy code
                          </button>
                        </div>
                      );
                    } else {
                      return <code {...props}>{children}</code>;
                    }
                  },
                }}
              >
                {text}
              </ReactMarkdown>
            )}
          />
        </div>

        {/* blog tags */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">Tags</label>
          <select
            name="tags"
            value={tags}
            onChange={(e) =>
              setTags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            id="tags"
            multiple
          >
            <option value="html">Html</option>
            <option value="css">Css</option>
            <option value="javascript">Javascript</option>
            <option value="nextjs">Next Js</option>
            <option value="reactjs">React Js</option>
            <option value="database">Database</option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1">
            selected:{" "}
            {Array.isArray(existingTags) &&
              existingTags.map((tag) => <span>{tag}</span>)}
          </p>
        </div>

        {/* blog status */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            id="status"
          >
            <option value="">No select</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1">
            selected: <span>{existingStatus}</span>
          </p>
        </div>

        {/* submit button */}
        <div className="w-100 mb-2">
          <button type="submit" className="w-100 addwebbtn flex-center">
            Save Blog
          </button>
        </div>
      </form>
    </>
  );
}
