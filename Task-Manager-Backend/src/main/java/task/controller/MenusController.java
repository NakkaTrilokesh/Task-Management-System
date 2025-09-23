package task.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import task.model.MenusManager;

@RestController
@RequestMapping("/menus")
@CrossOrigin(origins="*")
public class MenusController {
 
	
	@Autowired
	MenusManager M;
	
	@PostMapping("/getmenus")
	public String getMenus()
	{
		return M.getMenus();
	}
	
}
