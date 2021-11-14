//单文件上传处理 Form-Data

app.post('/upload_single', async (req, res) => {
  try {
    let fileTestContent = await multiparty_upload(req, true);
    console.log('fileTestContent', fileTestContent);
    let file = (files.file && files.file[0]) || {};
    res.send({
      code: 0,
      codeText: 'upload success',
      originalFilename: file.originalFilename,
      servicePath: file.path.replace(__dirname, HOSTNAME),
    });
  } catch (err) {
    res.send({
      code: 1,
      codeText: err,
    });
  }
});
