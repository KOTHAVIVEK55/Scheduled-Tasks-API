const {validateLogs}=require('../services/archieve');

async function afterValidation(req,res){
    try{
        const something=await validateLogs();
        res.status(201).json(something);
    }catch(error){
        console.error("error:",error);
        res.status(404).json({message:"error in validating"});
    }
}


async function downloadArchivedSessions(req, res) {
  try {
    const data = await validateLogs(); 

    res.setHeader("Content-Disposition", "attachment; filename=archived_sessions.json");
    res.setHeader("Content-Type", "application/json");

    res.status(200).send(JSON.stringify(data, null, 2));
  } catch (err) {
    res.status(500).json({ message: "Download failed" });
  }
}


module.exports={
    afterValidation,
    downloadArchivedSessions
}

