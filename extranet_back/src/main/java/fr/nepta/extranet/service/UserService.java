package fr.nepta.extranet.service;

import java.util.List;

import fr.nepta.extranet.model.Role;
import fr.nepta.extranet.model.User;

public interface UserService {

	User saveUser(User user);

//	Role saveRole(Role role);

	void addRoleToUser(User user, Role role);

	void addRoleToUser(String username, String roleName);

	User getUser(String username);

	List<User> getUsers();

//	List<Conge> getConges();

}
