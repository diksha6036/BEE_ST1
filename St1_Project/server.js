const express=require('express');

const app=express();
const mongoose=require('mongoose');

const Post=require('./Models/Post')
const comments=require('./Models/Comment');
app.use(express.json());

const uri = "mongodb+srv://diksha:diksha@cluster0.ozdz3di.mongodb.net/BlogApp?retryWrites=true&w=majority";
mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>console.log(`Database Connected`))
.catch(()=>console.log(`Not Connected`))

    //   Post api's
app.post('/api/posts',(req,res)=>{
    const inp=req.body;
   Post.create(inp);
    res.send('Post Created');
  })

app.get('/api/posts',async (req,res)=>{
    const allPosts=await Post.find({}); 
    res.send(allPosts);
})

app.get('/api/posts/:postId',async(req,res)=>{
    const Postid=await Post.find({id:req.params.postId});
    res.send(Postid);
  }) 

  app.put('/api/posts/:postId',async(req,res)=>{
    const hi=req.params.postId;
    const updatedData=req.body;
    const updatedPost=await Post.findOneAndUpdate(
        {id:hi},
        {$set:updatedData},
        {new:true}
    )
    if(!updatedPost){
        return res.status(404).json({message:"Give the correct Id"});
    }
    res.status(202).json(updatedPost);
  })
  
  app.delete('/api/posts/:postId',async(req,res)=>{
    const hi=req.params.postId;
    const deletedId=await Post.findOneAndDelete({id:hi})
    if(!deletedId){
        return res.status(404).json({message:"Give the correct Id"});
    }
    res.status(202).json(deletedId);
  })

  /////      Comment Api's

  app.post('/api/posts/:postId/comments', async (req, res) => {
    try {
      const Post = await Post.findById(req.params.postId);
      if (!Post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      Post.comments.push(req.body);
      const savedPost = await Post.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  app.get('/api/posts/:postId/comments', async (req, res) => {
    try {
      const Post = await Post.findById(req.params.postId);
      if (!Post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(Post.comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.put('/api/posts/:postId/comments/:commentId', async (req, res) => {
    try {
      const Post = await Post.findById(req.params.postId);
      if (!Post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const comment = Post.comments.id(req.params.commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      comment.set(req.body);
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  app.delete('/api/posts/:postId/comments/:commentId', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.comments.id(req.params.commentId).remove();
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  app.post(' /api/posts/:postId/comments',(req,res)=>{
    const inp=req.body;
   Comment.create(inp);
    res.send('Comment Posted');
  })






app.listen(3000,()=>{
    console.log("Serve started");
})