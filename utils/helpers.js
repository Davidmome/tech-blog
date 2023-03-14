module.exports = {
  format_data: (datos) => {
    var dat = JSON.parse(datos);
    return JSON.stringify(datos);
  },
  filter_commentPost: (data, postId) => {
    const filter = data.filter((row) => row.post_id == postId);
    return filter;
  },
  is_equal: (val1, val2) => {
    return val1 === val2;
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
};
