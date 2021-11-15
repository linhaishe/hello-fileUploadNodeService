const express = require('express'),
  fs = require('fs'),
  bodyParser = require('body-parser'),
  multiparty = require('multiparty'),
  SparkMD5 = require('spark-md5');

/*-CREATE SERVER-*/
const app = express(),
  PORT = 8888,
  HOST = 'http://127.0.0.1',
  HOSTNAME = `${HOST}:${PORT}`;

/*-中间件-*/
//允许任何的客户端向我发请求
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  req.method === 'OPTIONS'
    ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!')
    : next();
});

//延迟函数
const delay = function delay(internal) {
  typeof interval !== 'number' ? (interval = 1000) : null;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};

//基于multiparty插件实现文件上传处理& form-data解析
const uploadDir = `${__dirname}/upload`;
//auto 的意思为 是否通过插件对上传的文件进行处理，true就是处理，false就是不处理
const multiparty_upload = function multiparty_upload(req, auto) {
  typeof auto !== 'boolean' ? (auto = false) : null;
  let config = {
    maxFieldsSize: 200 * 1024 * 1024, //200M
  };
  //传到我指定的目录下，通过插件处理文件名，自动编译成新的名字
  if (auto) {
    config.uploadDir = uploadDir;
  }
  return new Promise(async (resolve, reject) => {
    //让我们看一个服务器处理的效果
    await delay();
    //fields, files,fields传的是文件名，files传的是文件对象，因为前端传的时文件和文件名
    //Form的方法可以根据我们传入的config配置项进行解析，通过客户端传入的formdata格式的数据进行解析
    new multiparty.Form(config).parse(req, (err, fields, files) => {
      //如果失败，则抛出错误
      if (err) {
        reject(err);
        return;
      }
      //如果成功则抛出文件
      resolve({ fields, files });
    });
  });
};
//post请求传过来的内容的大小限制
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '1024mb',
  })
);

//单文件上传处理 Form-Data

app.post('/upload_single', async (req, res) => {
  try {
    //await 只有拥有但会数据的时候才会继续往下走，否则return,所有错误，catch都会接收
    let { fields, files } = await multiparty_upload(req, true);
    console.log('files.file[0]', files.file[0]);
    console.log('files', files);
    console.log('fields', fields);
    let file = (files.file && files.file[0]) || {};
    res.send({
      code: 0,
      codeText: 'upload success',
      originalFilename: file.originalFilename,
      servicePath: file.path.replace(__dirname, HOSTNAME),
    });
  } catch (err) {
    console.log('err', err);
    res.send({
      code: 1,
      codeText: err,
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT: ${PORT}, YOU CAN VISIT: ${HOSTNAME}`
  );
});

/**
 * files.file[0] {
  fieldName: 'file',
  originalFilename: 'Draft-29.jpg',
  path: '/Users/chenruo/Documents/GitHub/hello-fileUploadNodeService/upload/GSHFzhXgvE6HETmy_k2zNnn5.jpg',
  headers: {
    'content-disposition': 'form-data; name="file"; filename="Draft-29.jpg"',
    'content-type': 'image/jpeg'
  },
  size: 497743
}
files {
  file: [
    {
      fieldName: 'file',
      originalFilename: 'Draft-29.jpg',
      path: '/Users/chenruo/Documents/GitHub/hello-fileUploadNodeService/upload/GSHFzhXgvE6HETmy_k2zNnn5.jpg',
      headers: [Object],
      size: 497743
    }
  ]
}
fields { filename: [ 'Draft-29.jpg' ] }
*/
