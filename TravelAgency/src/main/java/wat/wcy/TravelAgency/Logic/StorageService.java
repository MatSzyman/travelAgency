package wat.wcy.TravelAgency.Logic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import wat.wcy.TravelAgency.Repositories.FileDataRepository;
import wat.wcy.TravelAgency.Repositories.TravelRepository;
import wat.wcy.TravelAgency.model.FileData;

import java.io.FileNotFoundException;
import java.io.IOException;

@Service
public class StorageService {


    private final FileDataRepository fileDataRepository;
    private final TravelRepository travelRepository;



    private static final Logger logger = LoggerFactory.getLogger(StorageService.class);

    public StorageService(FileDataRepository fileDataRepository, TravelRepository travelRepository) {
        this.fileDataRepository = fileDataRepository;
        this.travelRepository = travelRepository;
    }


    public Integer uploadImageToFileSystem(MultipartFile file) throws IOException {
        FileData fileData = new FileData();
        fileData.setName(file.getOriginalFilename());

        fileData.setType(file.getContentType());
        fileData.setData(file.getBytes());

        fileData = fileDataRepository.save(fileData);

        return fileData.getId();

    }

    public FileData downloadImageFromFileSystem(Integer id) throws FileNotFoundException {
        return fileDataRepository.findById(id)
                .orElseThrow(()->new FileNotFoundException("Image not found with id: " + id));



    }
}



