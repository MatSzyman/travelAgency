package wat.wcy.TravelAgency.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wat.wcy.TravelAgency.DTO.CreateTravelDTO;
import wat.wcy.TravelAgency.DTO.TravelDTO;
import wat.wcy.TravelAgency.Logic.TravelService;

import java.net.URI;
import java.util.List;

@RequestMapping(value = "/travel")
@RestController
@RequiredArgsConstructor
public class TravelController {

    @Autowired
    TravelService travelService;

    @GetMapping(value = "/all")
    ResponseEntity<List<TravelDTO>> getAllTravels(){
        List<TravelDTO> travels = travelService.getTravels();
        return ResponseEntity.ok(travels);
    }

    @PostMapping
    ResponseEntity<TravelDTO> addTravel(@RequestBody @Valid CreateTravelDTO travelDTO){
        TravelDTO result = travelService.saveTravel(travelDTO);
        return ResponseEntity.created(URI.create("/" + result.getName())).body(result);
    }


}
