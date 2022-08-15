package fr.nepta.extranet.service;

import fr.nepta.extranet.model.Role;

public interface RoleService {

	Role saveRole(Role role);

	Role getRole(String roleName);

}
