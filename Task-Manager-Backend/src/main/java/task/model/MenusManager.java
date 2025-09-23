package task.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.GsonBuilder;

import task.repository.MenusRepository;

@Service
public class MenusManager {
	
	
 @Autowired
 MenusRepository MR;
 
 
 
   public String getMenus()
   {
	   List<String> menulist =new ArrayList<String>();
	   
	   
	   for(Menus M : MR.findAll())
	   {
		   menulist.add(new GsonBuilder().create().toJson(M));
		    
		   return menulist.toString();
		   
	   }
	return null;
	
   }
 
	

}
