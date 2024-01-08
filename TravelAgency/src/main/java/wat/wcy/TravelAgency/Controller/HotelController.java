package wat.wcy.TravelAgency.Controller;


import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wat.wcy.TravelAgency.DTO.HotelDTO;
import wat.wcy.TravelAgency.Logic.HotelService;

import java.util.List;

@RequestMapping(value = "/hotel")
@RestController
@SecurityRequirement(name = "Keycloak")
public class HotelController {

    private HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping(value = "/all")
    ResponseEntity<List<HotelDTO>> getHotels(){
        return ResponseEntity.ok(hotelService.getHotels());
    }
}
