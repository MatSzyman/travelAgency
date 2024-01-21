package wat.wcy.TravelAgency.Controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wat.wcy.TravelAgency.DTO.CityDTO;
import wat.wcy.TravelAgency.Logic.CityService;

import java.util.List;

@RequestMapping(value = "/city")
@RestController
@SecurityRequirement(name = "Keycloak")
public class CityController {

    private CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping(value = "/all")
    ResponseEntity<List<CityDTO>> getCities(){
        return ResponseEntity.ok(cityService.getCities());
    }


}
