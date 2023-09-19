module.exports = {

  ran_no: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  uid: (len) => {
    let str = '';
    const src = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const src_len = src.length;

    for (let i = len; i--; ) {
      str += src.charAt(module.exports.ran_no(0, src_len - 1));
    }

    return str;
  },

  forbidden: (res) => {
    const body = 'Forbidden';
    res.statusCode = 403;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
  }
};
