package task.model;

import org.springframework.beans.factory.annotation.Autowired;



import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import task.repository.UsersRepository;

@Transactional
@Service
public class UsersManager {

	@Autowired
	UsersRepository UR;


	
	public String addUser(Users u) {
		if(UR.validateEmail(u.getEmail()) >0)
			return "401::Email is already Exist";
		UR.save(u);
		return "200::User Registered successfully";
	}
	
	
	
	
	@Autowired
	EmailManager EM;
	
	public String recoverPassword(String email)
	{
		
		Users U = UR.findById(email).get();
		
		String message = String.format("Dear %s, \n\nYour Password is:%s",U.getFullname(),U.getPassword());
		
		
		return ((EmailManager) EM).sendEmail(U.getEmail(),"Library-Management-System :password Recovery",message);
		
	}
	
	
	@Autowired
	JWTManager JWT;
	
	
	
	public String validateCredentials(String email, String password)
	{
		if(UR.validateCredentials(email, password)>0)
		{
			String token = JWT.generateToken(email);
			return "200::"+ token;
		}
		return "401:: Invalid Credentials";
	}

	   
	public String getFullname(String token) 
 {
	String email = JWT.validateToken1(token);
	if(email.compareTo("401") == 0)
		return "401::Token Expired!";
	Users U = UR.findById(email).get();
	return U.getFullname();
  }



	
	
	
	
	
}

	


	
	

