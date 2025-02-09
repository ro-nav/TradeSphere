import React, { useState, useEffect } from "react";

export default function ManageAnalystPosts() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all analyst posts from the database
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8040/transaction/Post/GetAllPost"
      );
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        setMessage("Failed to fetch analyst posts.");
      }
    } catch (error) {
      console.error("Error fetching analyst posts:", error);
      setMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className="manage-posts-container">
      <h2 className="text-center mb-4">Analyst Posts</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {posts.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Post ID</th>
              <th>Analyst Name</th>
              <th>Title</th>
              <th>Content</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.postId}>
                <td>{post.postId}</td>
                <td>{post.analystName}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{new Date(post.datetime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-4">No posts available.</p>
      )}
    </div>
  );
}
