/**
 * Created by soujanyaj on 8/28/2018.
 */
const data = {
    "users": [
        {
            "id": 1535443371302,
            "username": "Soujanya",
            "password": "J"
        },
        {
            "id": 1535443382446,
            "username": "Sam",
            "password": "John"
        }
    ]
};
function getRecord(id){
    for(var item of data.users){
        if(item.id == id) return item;
    }
    return false;
}
const findID = function(users, id){
    return users.indexOf(getRecord(id));
}
exports.data = data;
exports.getRecord = getRecord;
exports.findID = findID;