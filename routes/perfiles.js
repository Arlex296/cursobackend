import express from 'express';

const router = express.Router();

router.post("/",(req,res)=>{
     return res.json(req.body);
});

router.get("/",(req,res)=>{
    return res.json([]);
});

router.put("/",(req,res)=>{
    return res.json([]);
});

router.delete("/",(req,res)=>{
    return res.json({"mensaje":"delete perfiles"});
});

export default router;
