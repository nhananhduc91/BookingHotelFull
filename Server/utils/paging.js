const pagination = (page, data) => {
  //Số kết quả mỗi trang
  const resultsPerPage = 8;

  //Tính tổng số trang
  const totalPage = Math.ceil(data.length / resultsPerPage);

  //Biến lưu trữ dữ liệu khi phân trang
  let results;

  //Logic cắt data khi phân trang
  if (page === 1 && data.length > resultsPerPage) {
    results = data.slice(page - 1, page * resultsPerPage);
  } else if (page === 1 && data.length <= resultsPerPage) {
    results = data;
  }
  else if (page > 1 && page < totalPage) {
    results = data.slice((page - 1) * resultsPerPage, page * resultsPerPage);
  } else {
    results = data.slice((totalPage - 1) * resultsPerPage, data.length);
  }
  return { results, page, totalPage }
}

module.exports = pagination;