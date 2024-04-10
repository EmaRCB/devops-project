async function getVehiculos(req:any, res:any, next:any){
    res.status(200).json({ message: 'authorized'});
}

module.exports = {getVehiculos};