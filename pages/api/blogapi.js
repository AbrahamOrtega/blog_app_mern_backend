import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/blog";

export default async function handle(req, res) {
  //IF authenticated, connect to the database
  await mongooseConnect();

  const { method } = req;

  //POST a new blog
  if (method === "POST") {
    const { title, slug, description, blogcategory, tags, status } = req.body;

    const blogDoc = await Blog.create({
      title,
      slug,
      description,
      blogcategory,
      tags,
      status,
    });

    res.status(201).json(blogDoc);
  }

  //GET all blogs
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Blog.findById(req.query.id));
    } else {
      res.json(await Blog.find().sort({ createdAt: -1 }));
    }
  }

  //PUT to update a blog
  if (method === "PUT") {
    const { id, title, slug, description, blogcategory, tags, status } =
      req.body;

    await Blog.findByIdAndUpdate(id, {
      title,
      slug,
      description,
      blogcategory,
      tags,
      status,
    });

    res.json(true);
  }

  //DELETE a blog
  if (method === "DELETE") {
    if (req.query?.id) {
      await Blog.findByIdAndDelete(req.query.id);
      res.json(true);
    }
  }
}
