
module.exports = {
    Mutation: {
        uploadImage: async(_,args,{file ,storeUpload, prisma})=>{
           const {stream, filename} = await file;
           await storeUpload ({stream, filename});
           return true;
        }
        
    }
};

// module.exports = {
//     Mutation: {
//         uploadImage: async (parent, { file, generateRandomString, prisma}) => {
//           const { createReadStream, filename, mimetype, encoding } = await file;
//           const { ext } = path.parse(filename);
//           const randomName = generateRandomString(12) + ext;
    
//           const stream = createReadStream();
//           const pathName = path.join(__dirname, `../public/images/${randomName}`);
//           await stream.pipe(fs.createWriteStream(pathName));
    
//           return {
//             url: `http://localhost:4000/images/${randomName}`,
//           };
//         },
//       },
// }