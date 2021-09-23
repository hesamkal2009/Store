import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsCount, getAllPosts } from "../../app/posts";

export default function Posts() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	const posts = useSelector(getAllPosts);
	const postCount = useSelector(getPostsCount);
	return (
		<div>
			<h1>{postCount} - Posts In Total</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	);
}
