package wat.wcy.TravelAgency.Logic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import wat.wcy.TravelAgency.Repositories.FileDataRepository;
import wat.wcy.TravelAgency.Repositories.TravelRepository;
import wat.wcy.TravelAgency.model.FileData;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class StorageService {


    private final FileDataRepository fileDataRepository;
    private final TravelRepository travelRepository;

    private final String FOLDER_PATH;

    private static final Logger logger = LoggerFactory.getLogger(StorageService.class);

    public StorageService(FileDataRepository fileDataRepository, TravelRepository travelRepository) {
        this.fileDataRepository = fileDataRepository;
        this.travelRepository = travelRepository;
        this.FOLDER_PATH = System.getProperty("user.dir") + File.separator + "images" + File.separator;
    }


    public Integer uploadImageToFileSystem(MultipartFile file) throws IOException {
        String filePath = FOLDER_PATH + file.getOriginalFilename();


        FileData fileData = fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath)
                .build());

        file.transferTo(new File(filePath));
        logger.info("Current working directory: " + System.getProperty("user.dir"));

        if (fileData != null) {

            return fileData.getId();
        }
        return null;
    }

    public byte[] downloadImageFromFileSystem(Integer id) throws IOException {
        Optional<FileData> fileData = fileDataRepository.findById(id);

        String filePath;
        if (fileData.isPresent()) {
            filePath = fileData.get().getFilePath();
        } else {
            throw new FileNotFoundException("File not found with name: " + id);
        }


        byte[] images = Files.readAllBytes(new File(filePath).toPath());

        logger.warn("ZDJONO  :" + images);
        return images;
    }
}

