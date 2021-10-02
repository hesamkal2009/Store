import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
	getPosts,
	selectPostsCount,
	selectPosts,
	selectPostsForUserId,
} from "../../app/posts";

export default function Posts(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	const posts = useSelector(selectPosts);
	const postCount = useSelector(selectPostsCount);

	const [userPosts, setUserPosts] = useState(posts); // THIS IS A REAL State Object which can be changed by declared function
	const [userId, setUserId] = useState(0); // THIS IS A REAL State Object which can be changed by declared function
	useEffect(() => {
		setUserPosts(posts);
	}, [posts]);

	const handleInputChange = (userId) => {
		let filteredPosts = userId > 0 ? posts.filter((post) => post.userId === Number(userId)) : posts;
		setUserPosts(filteredPosts);
		setUserId(userId);
	};

	useEffect(() => {
		setUserPosts(posts);
	}, [posts]);

	return (
		<div>
			<h1>
				{postCount} - Posts In Total
				<input
					type="text"
					id="userId"
					name="userId"
					className="form-control"
					onChange={(e) => handleInputChange(e.target.value)}
				/>
			</h1>
			<h2>{userPosts.length} - Posts Are Written By User Id - {userId}</h2>
			<ul>
				{userPosts.map((post) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	);
}
