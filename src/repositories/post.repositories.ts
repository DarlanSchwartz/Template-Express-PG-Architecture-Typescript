import db from "@/database/database.connection";
import { Post } from "@/protocols/post.types";

async function create(post: Post): Promise<void> {
    const { writerId, name, likeCount, content, createdAt } = post;
    const query = `INSERT INTO posts ( name, writerid, likecount, content, createdat) VALUES( $1, $2, $3, $4, $5);`;
    await db.query(query, [name, writerId, likeCount, content, createdAt]);
}

async function getAll(limit: number, name: string): Promise<Array<Post>> {
    let query = `SELECT * FROM posts`;
    let params: any[] = [];

    if (name && name !== "") {
        query += ` WHERE name ILIKE $${params.length + 1}`;
        params.push(`%${name}%`);
    }

    if (limit && limit !== 0) {
        query += ` LIMIT $${params.length + 1}`;
        params.push(limit);
    }

    const dbPosts = await db.query(query, params);
    const posts: Array<Post> = dbPosts.rows;
    return posts;
}


async function like(postId: number): Promise<void> {
    const query = `UPDATE posts SET likecount = likecount + 1 WHERE id = $1;`;
    await db.query(query, [postId]);
}

async function edit(newPost: Post, postId: number): Promise<void> {
    const { writerId, name, likeCount, content, createdAt } = newPost;
    const query = `
            UPDATE posts
                SET
                name = $1,
                writerid = $2,
                likecount = $3,
                content = $4,
                createdat = $5
            WHERE id = $6;
        `;
    await db.query(query, [name, writerId, likeCount, content, createdAt, postId]);
}

async function remove(postId: number): Promise<void> {
    const query = `DELETE FROM posts WHERE id = $1`;
    await db.query(query, [postId]);
}

async function postIdExists(postId: number): Promise<boolean> {
    const query = `SELECT * FROM posts WHERE id = $1`;
    const posts = await db.query(query, [postId]);
    return posts.rowCount > 0;
}

const PostRepository = { create, getAll, like, edit, remove, postIdExists };

export default PostRepository;
