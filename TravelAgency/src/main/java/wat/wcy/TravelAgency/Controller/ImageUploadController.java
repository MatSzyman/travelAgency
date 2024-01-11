package wat.wcy.TravelAgency.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import wat.wcy.TravelAgency.Logic.StorageService;
import wat.wcy.TravelAgency.Repositories.TravelRepository;
import wat.wcy.TravelAgency.model.FileData;
import wat.wcy.TravelAgency.model.Travel;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/image")
public class ImageUploadController {

    private final StorageService storageService;
    private final TravelRepository travelRepository;
    private static final Logger logger = LoggerFactory.getLogger(ImageUploadController.class);

    public ImageUploadController(StorageService storageService, TravelRepository travelRepository) {
        this.storageService = storageService;
        this.travelRepository = travelRepository;
    }

    @PostMapping("/fileSystem")
    public ResponseEntity<?> uploadImageToFIleSystem(@RequestParam("image") MultipartFile file) throws IOException {
        Integer uploadImage = storageService.uploadImageToFileSystem(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @PostMapping("/fileSystem/{id}")
    public ResponseEntity<?> updateTravelImage(@PathVariable Integer id, @RequestBody Integer imageId) {
        Optional<Travel> travelOptional = travelRepository.findById(id);
        if (travelOptional.isPresent()) {
            Travel travel = travelOptional.get();
            travel.setFileDataId(imageId); // Set the image ID
            travelRepository.save(travel); // Save the updated travel
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/fileSystem/{id}")
    public ResponseEntity<byte[]> downloadImageFromFileSystem(@PathVariable Integer id) throws IOException {
        try {
            FileData fileData = storageService.downloadImageFromFileSystem(id); // Your service method to get the FileData
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(fileData.getType()))
                    .body(fileData.getData());
        } catch (FileNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }



}
