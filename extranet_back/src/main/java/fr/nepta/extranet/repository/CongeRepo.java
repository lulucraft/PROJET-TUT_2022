package fr.nepta.extranet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.nepta.extranet.model.Conge;
import fr.nepta.extranet.model.Role;

@Repository
public interface CongeRepo extends JpaRepository<Conge, Long> {

	Role findById(String id);

}
