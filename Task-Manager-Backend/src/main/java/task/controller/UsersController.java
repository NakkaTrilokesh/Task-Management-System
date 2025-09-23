package task.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import task.model.Users;
import task.model.UsersManager;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="http://localhost:5173/")
public class UsersController {

	@Autowired
	UsersManager UM;
	
	@PostMapping("/signup")
    public String signUp(@RequestBody Users U) 
	{
		return UM.addUser(U);
	}
	
	
	
	@GetMapping("/forgotpassword/{email}")
	public String forgotpassword(@PathVariable("email") String emailid)
	{
		return UM.recoverPassword(emailid);
	}
	
	@PostMapping("/signin")
	public String signIn(@RequestBody Users U)
	{
		return UM.validateCredentials(U.getEmail(), U.getPassword());
	}
	 
	
   @PostMapping("getfullname")
   public String getFullname(@RequestBody java.util.Map<String, String> data)
   {
	   
	   return UM.getFullname(data.get("crsid"));
   }

	



	
	
}
