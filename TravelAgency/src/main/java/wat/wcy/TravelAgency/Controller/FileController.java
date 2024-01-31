package wat.wcy.TravelAgency.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import wat.wcy.TravelAgency.Logic.FileService;
import wat.wcy.TravelAgency.Repositories.TravelRepository;
import wat.wcy.TravelAgency.model.FileData;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/image")
public class FileController {

    private final FileService fileService;
    private final TravelRepository travelRepository;
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    public FileController(FileService fileService, TravelRepository travelRepository) {
        this.fileService = fileService;
        this.travelRepository = travelRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImageToDataBase(@RequestParam("image") MultipartFile file) throws IOException {
        Integer uploadImage = fileService.uploadImageToFileSystem(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadImageFromDataBase(@PathVariable Integer id) throws IOException {
        try {
            FileData fileData = fileService.downloadImageFromFileSystem(id); // Your service method to get the FileData
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(fileData.getType()))
                    .body(fileData.getData());
        } catch (FileNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/batchDownload")
    public ResponseEntity<List<String>> batchDownloadImages(@RequestParam ArrayList<Integer> ids) {
        try {
            List<FileData> files = fileService.downloadImagesFromFileSystem(ids);
            List<String> base64Images = files.stream()
                    .map(file -> Base64.getEncoder().encodeToString(file.getData()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(base64Images);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
