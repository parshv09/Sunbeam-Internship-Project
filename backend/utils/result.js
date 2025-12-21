function createResult(error,data){
    const res={}
    if(data){
        res.status="success"
        res.data=data
    }else{
        res.status="error"
        res.data=error
    }
    return res;
}

module.exports={createResult}