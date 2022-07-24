package fr.nepta.extranet.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.nepta.extranet.model.Size;
import fr.nepta.extranet.repository.SizeRepo;
import fr.nepta.extranet.service.SizeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor @Slf4j
@Transactional
public class SizeServiceImpl implements SizeService {

	private final SizeRepo sizeRepo;

	@Override
	public Size saveSize(Size size) {
		log.info("Saving new size in the database");
		return sizeRepo.save(size);
	}

	@Override
	public Size getSize(String sizeLabel) {
		log.info("Fetching size '{}'", sizeLabel);
		return sizeRepo.findByLabel(sizeLabel);
	}

}
