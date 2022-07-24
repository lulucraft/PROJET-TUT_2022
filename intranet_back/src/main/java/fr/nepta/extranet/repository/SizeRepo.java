package fr.nepta.extranet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.nepta.extranet.model.Size;

@Repository
public interface SizeRepo extends JpaRepository<Size, Long> {

	Size findByLabel(String label);

}
