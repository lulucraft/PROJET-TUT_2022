package fr.nepta.extranet.service;

import fr.nepta.extranet.model.Size;

public interface SizeService {

	Size saveSize(Size size);

	Size getSize(String sizeLabel);

}
