import expresss from 'express';
import { adduser ,deleteuser,getalluser, updateuser,changepassword} from './user.controller.js';


const userrouts =expresss.Router();



userrouts.route("/")
.post(adduser)
.get(getalluser) 


userrouts.route("/:id")
.put(updateuser)
.delete(deleteuser)
.patch(changepassword);

export default userrouts;