const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

const multer = require("multer");
// const { router } = require(".");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.get("/blogs/search", async function (req, res, next) {
  // Your code here

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  let search = req.query.search
  console.log(search);
  try {

    let [rows, _] = await conn.query(
      "SELECT * FROM blogs WHERE blogs.title like '%web%' "
    );

    res.json({
      message: rows
    });
    conn.commit();

  } catch (error) {
    console.error(error);
    next(error);
  }


});



router.post(
  "/blogs",
  upload.single("myImage"),
  async function (req, res, next) {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;
    const pinned = req.body.pinned;

    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();

    try {
      let results = await conn.query(
        "INSERT INTO blogs(title, content, status, pinned, `like`,create_date) VALUES(?, ?, ?, ?, 0,CURRENT_TIMESTAMP);",
        [title, content, status, pinned]
      );
      const blogId = results[0].insertId;

      await conn.query("INSERT INTO images(blog_id, file_path) VALUES(?, ?);", [
        blogId,
        file.path.substr(6),
      ]);

      await conn.commit();
      res.send("success!");
    } catch (err) {
      await conn.rollback();
      next(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  }
);

router.get("/blogs/:id", function (req, res, next) {
  const promise1 = pool.query("SELECT * FROM blogs WHERE id=?", [
    req.params.id,
  ]);
  const promise2 = pool.query("SELECT * FROM comments WHERE blog_id=?", [
    req.params.id,
  ]);

  Promise.all([promise1, promise2])
    .then((results) => {
      const blogs = results[0];
      const comments = results[1];
      res.render("blogs/detail", {
        blog: blogs[0][0],
        comments: comments[0],
        error: null,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.put("/blogs/:id", upload.single("myImage"), async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const file = req.file;

    if (file) {
      await conn.query("UPDATE images SET file_path=? WHERE id=?", [
        file.path,
        req.params.id,
      ]);
    }

    await conn.query(
      "UPDATE blogs SET title=?,content=?, pinned=?, blogs.like=?, create_by_id=? WHERE id=?",
      [
        req.body.title,
        req.body.content,
        req.body.pinned,
        req.body.like,
        null,
        req.params.id,
      ]
    );
    conn.commit();
    res.json({ message: "Update Blog id " + req.params.id + " Complete" });
  } catch (error) {
    await conn.rollback();
    return next(error);
  } finally {
    console.log("finally");
    conn.release();
  }
});

router.delete("/blogs/:id", async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    // check blog has comment?
    let comments = await conn.query("SELECT * FROM comments WHERE blog_id=?", [
      req.params.id,
    ]);

    if (comments[0].length > 0) {
      res
        .status(409)
        .json({ message: "Can't Delete because this blog has comment!!!" });
    } else {
      await conn.query("DELETE FROM blogs WHERE id=?;", [req.params.id]); // delete blog
      await conn.query("DELETE FROM images WHERE blog_id=?;", [req.params.id]); // delete image
      await conn.commit();
      res.json({ message: "Delete Blog id " + req.params.id + " complete" });
    }
  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    console.log("finally");
    conn.release();
  }
});

router.put("/blogs/addlike/:blogId", async (req, res, next) => {
  // console.log("hello");
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let [rows, _] = await conn.query(
      "SELECT blogs.like FROM blogs WHERE id=?",
      [req.params.blogId]
    );
    // console.log(result);
    let newlike = rows[0].like + 1;
    await conn.query("UPDATE blogs SET blogs.like=? WHERE id=?", [
      newlike,
      req.params.blogId,
    ]);

    res.json({
      message: newlike,
    });
    conn.commit();
  } catch (error) {
    // console.error(error);
    next(error);
  }

  conn.release();
});

router.post("/:blogId/comments", async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  const blog_id = req.params.blogId;
  const comment = req.body.comment;
  const like = req.body.like;

  console.log(comment);
  try {
    let [rows, _] = await conn.query(
      "INSERT INTO comments(blog_id, comment, `like`, comment_by_id, comment_date) VALUES(?,?,?,?,CURRENT_TIMESTAMP);",
      [blog_id, comment, like, null]
    );

    res.json({
      message: "Add Comment at Blog id " + blog_id,
    });
    conn.commit();

  } catch (error) {
    // console.error(error);
    next(error);
  }
  conn.release();
})

router.put("/comments/:commentId",  async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  const comment_id = req.params.commentId
  const blog_id = req.body.blogId;
  const comment = req.body.comment;
  const like = req.body.like;
  try {
    let [rows, _] = await conn.query(
      "UPDATE comments SET comment=?, `like`=?, blog_id = ?, comment_by_id = ?, comment_date=CURRENT_TIMESTAMP() WHERE id=?;",
      [comment, like, blog_id, null, comment_id]
    );

    res.json({
      message: "Add Comment at Blog id " + comment_id,
    });
    conn.commit();
    
  } catch (error) {
    next(error)
  }
  conn.release();

})

router.delete("/comments/:commentId",  async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  const comment_id = req.params.commentId
  try {
    let [rows, _] = await conn.query(
      "DELETE FROM comments WHERE id=?;",
      [comment_id]
    );

    res.json({
      message: "Delete Comment id "+ comment_id+" Comlete" ,
    });
    conn.commit();
    
  } catch (error) {
    next(error)
  }
  conn.release();
})

router.put("/comments/addlike/:commentId", async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  const comment_id = req.params.commentId
  try {
    let [rows, _] = await conn.query(
      "SELECT `like` FROM comments WHERE id=?",
      [comment_id]
    );
    let newlike = rows[0].like + 1;

    await conn.query("UPDATE comments SET `like`=? WHERE id=?", [
      newlike,
      comment_id,
    ]);

    res.json({
      message: "Add like in Blog "+comment_id+", Current Like is " + newlike,
    });
    conn.commit();

  } catch (error) {
    next(error)
  }
  conn.release();

})

exports.router = router;
