package wat.wcy.TravelAgency.Controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wat.wcy.TravelAgency.DTO.CreateTravelOptionDTO;
import wat.wcy.TravelAgency.DTO.TravelOptionDTO;
import wat.wcy.TravelAgency.Logic.TravelOptionService;

import java.util.List;

@RestController
@RequestMapping(value = "/travelOption")
public class TravelOptionController {

    private final TravelOptionService travelOptionService;

    public TravelOptionController(TravelOptionService travelOptionService) {
        this.travelOptionService = travelOptionService;
    }

    @GetMapping(value = "/all")
    ResponseEntity<List<TravelOptionDTO>> getAlTravelOptions(){
        List<TravelOptionDTO> travelOptionDTOList = travelOptionService.getTravelOptions();
        return ResponseEntity.ok(travelOptionDTOList);
    }


    @GetMapping(value = "/{id}")
    ResponseEntity<TravelOptionDTO> getAlTravelOptions(@PathVariable Integer id){
        TravelOptionDTO travelOptionDTO = travelOptionService.getTravelOptionById(id);
        return ResponseEntity.ok(travelOptionDTO);
    }

    @PostMapping
    ResponseEntity<TravelOptionDTO> addTravelOption(@RequestBody @Valid CreateTravelOptionDTO option){
        TravelOptionDTO result = travelOptionService.saveTravelOption(option);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}

