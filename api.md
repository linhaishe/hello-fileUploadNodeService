1. 单文件上传处理 FORM-DATA :由服务器自动生成文件的名字

   ```
   url:/upload_ single
   method: POST
   params :multipart/form-data
   file:文件对象
   filename:文件名字
   
   return: application/json
   code:0成功1失败,
   codeText :状态描述,
   originalFilename:文件原始名称，
   servicePath:文件服务器地址
   ```

   响应失败的情况：

   拿到json数据，不一定都是成功。

   - code 为1时，失败。
   - 服务器返回了200，数据也给我了，但是在数据当中告诉我，code为1，这样也是失败。

2. 单文件上传处理「FORM-DATAJ : 由客户端生成文件的名字,传递给服务器处理
   url:/upload_ _single_ name
   method : POST
   params : multipart/form-data
   file:文件对象
   filename:文件名字「自己需要处理成为HASH名字」
   return: application/j son
   code: 0成功1失败，
   codeText :状态描述,
   originalFilename:文件原始名称，
   servicePath:文件服务器地址

   3.单文件上传处理「BASE64」
   url:/upload_ _S ingle_ base64
   method: POST
   params :applicat ion/ x-www-form-urlencoded
   file:文件对象
   filename:文件名字
   return: application/j son
   code :0成功1失败,
   codeText :状态描述,
   originalFilename:文件原始名称，
   servicePath:文件服务器地址

   4.上传切片
   url:/upload_ chunk
   method: POST
   params :multipart/form-data
   file:切片数据
   filename:切片名字「文件生成的HASH_切片编号.后缀J .
   count:切片数量
   return: application/j son
   code: 0成功1失败，.
   codeText :状态描述,
   originalFilename:文件原始名称，
   servicePath:文件服务器地址

   5.合并切片
   url:/upload_ merge
   method: POST
   params: applicat ion/x- -WwW- -form- -urlencoded
   HASH:文件的HASH名字
   count:切片数量
   return: application/j son
   code:0成功1失败，
   codeText :状恋描述,
   originalF ilename: XíMá8R,
   servicePath:文件服努器地址
   
   6.获取已经上传的切片
   url:/upload_ already
   method :GET
   params :
   HASH:文件的HASH名字
   return: application/j son
   code:0成功1失败，
   codeText :状恋描述，
   fileList:[...]