import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
	getPosts,
	selectPostsCount,
	selectPosts,
	selectPostsForUserId,
} from "../../app/posts";

export default function Posts(props) {
	const dispatch = useDispatch();

	let id = 4;
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	const posts = useSelector(selectPosts);
	const postCount = useSelector(selectPostsCount);
	const selectPostsForUserId1 = useSelector(selectPostsForUserId(id));

	return (
		<div>
			<h1>{postCount} - Posts In Total</h1>
			<h2>
				{selectPostsForUserId1.length} - Posts Are Written By User Id One -{" "}
				{posts.filter((post) => post.userId === id).length}
			</h2>
			<ul>
				{selectPostsForUserId1.map((post) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	);
}
