const dummyFun = (blog_arr) => {
  console.log("Blog array", blog_arr);
  return 1;
};

const totalLikes = (blogPostsList) => {
  let totalSum = 0;
  for (i = 0; i <= blogPostsList.length; i++) {
    totalSum += blogPostsList[i].likes;
  }
  return totalSum;
};

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  return blogs.reduce(
    (best, current) => (current.likes > best.likes ? current : best),
    blogs[0],
  );
};
const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  const counts = {};
  for (const b of blogs) {
    const author = b.author;
    counts[author] = (counts[author] || 0) + 1;
  }

  let maxAuthor = null;
  let maxBlogs = 0;
  for (const [author, count] of Object.entries(counts)) {
    if (count > maxBlogs) {
      maxAuthor = author;
      maxBlogs = count;
    }
  }

  return { author: maxAuthor, blogs: maxBlogs };
};
const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  const totals = {};
  for (const b of blogs) {
    const author = b.author;
    const likeCount = typeof b.likes === "number" ? b.likes : 0;
    totals[author] = (totals[author] || 0) + likeCount;
  }

  let maxAuthor = null;
  let maxLikes = 0;
  for (const [author, totalLikes] of Object.entries(totals)) {
    if (totalLikes > maxLikes) {
      maxAuthor = author;
      maxLikes = totalLikes;
    }
  }

  return { author: maxAuthor, likes: maxLikes };
};
module.exports = { dummyFun, totalLikes, favoriteBlog, mostBlogs, mostLikes };
