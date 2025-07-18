const fs = require('fs')

// create directory

if(!fs.existsSync('./asset'))
{
fs.mkdir('./asset',(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log('file is created');
    }
});
}
else{
    fs.rmdir('./asset',(err)=>{
        if(err)
        {
            console.log(err);
            
        }
        else
        {
            console.log('folder is deleted');
            
        }
    })
}
if(!fs.existsSync('./home'))
{
    fs.mkdir("./home",(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('file created');
    }
})
}
else{
    fs.rmdir('./home',(err)=>{
        if(err){
            console.log(err);
        }
        else
        {
            console.log('file is deleted');
            
        }
    })
}
